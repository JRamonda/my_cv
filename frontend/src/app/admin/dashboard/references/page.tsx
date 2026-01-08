'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { referenceService } from '@/lib/api/services';
import type { Reference } from '@/types';
import { toast } from 'sonner';

export default function ReferencesManager() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Reference>>({
    name: '',
    position: '',
    company: '',
    relationship: '',
    testimonial: '',
    email: '',
    phone: '',
    linkedin: '',
    avatar: '',
    order: 0,
  });

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const data = await referenceService.getAll();
      setReferences(data);
    } catch (error) {
      toast.error('Failed to fetch references');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (reference?: Reference) => {
    if (reference) {
      setEditingId(reference.id);
      setFormData(reference);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        position: '',
        company: '',
        relationship: '',
        testimonial: '',
        email: '',
        phone: '',
        linkedin: '',
        avatar: '',
        order: references.length,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await referenceService.update(editingId, formData);
        toast.success('Reference updated successfully');
      } else {
        await referenceService.create(formData as any);
        toast.success('Reference created successfully');
      }
      handleCloseDialog();
      fetchReferences();
    } catch (error) {
      toast.error('Failed to save reference');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reference?')) return;

    try {
      await referenceService.delete(id);
      toast.success('Reference deleted successfully');
      fetchReferences();
    } catch (error) {
      toast.error('Failed to delete reference');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading references...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            References
          </h1>
          <p className="text-slate-400">Manage professional references</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Reference
        </Button>
      </div>

      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {references.map((ref, index) => (
          <motion.div
            key={ref.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-500/20" />
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-200">{ref.name}</h3>
                <p className="text-slate-400">{ref.position}</p>
                <p className="text-slate-500 text-sm">{ref.company}</p>
                <p className="text-blue-400 text-sm">{ref.relationship}</p>
              </div>

              <p className="text-slate-400 text-sm italic mb-4 line-clamp-3">
                "{ref.testimonial}"
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenDialog(ref)}
                  className="flex-1 border-slate-700 hover:bg-slate-800"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(ref.id)}
                  className="border-red-900 text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}

        {references.length === 0 && (
          <Card className="p-12 bg-slate-900/50 border-slate-800 text-center col-span-full">
            <p className="text-slate-400 mb-4">No references yet</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="border-slate-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Reference
            </Button>
          </Card>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingId ? 'Edit Reference' : 'Add Reference'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship *</Label>
                <Input
                  id="relationship"
                  name="relationship"
                  value={formData.relationship || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Direct Manager"
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial">Testimonial *</Label>
              <Textarea
                id="testimonial"
                name="testimonial"
                value={formData.testimonial || ''}
                onChange={handleChange}
                required
                rows={4}
                placeholder="What did they say about working with you?"
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  type="url"
                  value={formData.avatar || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500">
                <Save className="w-4 h-4 mr-2" />
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
