'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { techStackService } from '@/lib/api/services';
import type { TechStack } from '@/types';
import { toast } from 'sonner';

export default function TechStackManager() {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TechStack>>({
    category: 'frontend',
    name: '',
    icon: '',
    preferred: false,
    order: 0,
  });

  useEffect(() => {
    fetchTechStack();
  }, []);

  const fetchTechStack = async () => {
    try {
      const data = await techStackService.getAll();
      setTechStack(data);
    } catch (error) {
      toast.error('Failed to fetch tech stack')
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (tech?: TechStack) => {
    if (tech) {
      setEditingId(tech.id);
      setFormData(tech);
    } else {
      setEditingId(null);
      setFormData({
        category: 'frontend',
        name: '',
        icon: '',
        preferred: false,
        order: techStack.length,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await techStackService.update(editingId, formData);
        toast.success('Tech updated successfully');
      } else {
        await techStackService.create(formData as any);
        toast.success('Tech created successfully');
      }
      handleCloseDialog();
      fetchTechStack();
    } catch (error) {
      toast.error('Failed to save tech');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tech?')) return;

    try {
      await techStackService.delete(id);
      toast.success('Tech deleted successfully');
      fetchTechStack();
    } catch (error) {
      toast.error('Failed to delete tech');
    }
  };

  const groupedTech = techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechStack[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading tech stack...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Tech Stack
          </h1>
          <p className="text-slate-400">Manage your technology stack</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Technology
        </Button>
      </div>

      {/* Tech Stack by Category */}
      <div className="space-y-6">
        {Object.entries(groupedTech).map(([category, techs], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-200 mb-4 capitalize">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {techs.map((tech) => (
                  <div
                    key={tech.id}
                    className="relative group"
                  >
                    <div className="p-4 bg-slate-800/50 rounded-lg text-center hover:bg-slate-800 transition-colors">
                      {tech.preferred && (
                        <Star className="absolute top-2 right-2 w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                      {tech.icon && (
                        <div className="text-3xl mb-2">{tech.icon}</div>
                      )}
                      <p className="text-slate-200 text-sm font-medium">{tech.name}</p>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenDialog(tech)}
                        className="h-8 w-8 p-0 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(tech.id)}
                        className="h-8 w-8 p-0 hover:bg-red-900/20 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        {Object.keys(groupedTech).length === 0 && (
          <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
            <p className="text-slate-400 mb-4">No technologies yet</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="border-slate-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Technology
            </Button>
          </Card>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingId ? 'Edit Technology' : 'Add Technology'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Technology Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                placeholder="e.g., React"
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category || 'frontend'}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="tools">Tools</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon (emoji) *</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon || ''}
                onChange={handleChange}
                required
                placeholder="⚛️"
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="preferred"
                name="preferred"
                checked={formData.preferred || false}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <Label htmlFor="preferred" className="cursor-pointer">
                Part of preferred stack
              </Label>
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
