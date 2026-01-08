'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, GripVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { experienceService } from '@/lib/api/services';
import type { Experience } from '@/types';
import { toast } from 'sonner';

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [],
    challenges: [],
    learnings: [],
    technologies: [],
    order: 0,
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await experienceService.getAll();
      setExperiences(data);
    } catch (error) {
      toast.error('Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (experience?: Experience) => {
    if (experience) {
      setEditingId(experience.id);
      setFormData({
        ...experience,
        startDate: experience.startDate.split('T')[0],
        endDate: experience.endDate ? experience.endDate.split('T')[0] : '',
      });
    } else {
      setEditingId(null);
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
        challenges: [],
        learnings: [],
        technologies: [],
        order: experiences.length,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleArrayChange = (field: keyof Experience, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData({
      ...formData,
      [field]: items,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await experienceService.update(editingId, formData);
        toast.success('Experience updated successfully');
      } else {
        await experienceService.create(formData as any);
        toast.success('Experience created successfully');
      }
      handleCloseDialog();
      fetchExperiences();
    } catch (error) {
      toast.error('Failed to save experience');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      await experienceService.delete(id);
      toast.success('Experience deleted successfully');
      fetchExperiences();
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Experience
          </h1>
          <p className="text-slate-400">Manage your work experience</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="cursor-move text-slate-600 hover:text-slate-400">
                  <GripVertical className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-200">{exp.position}</h3>
                      <p className="text-slate-400">{exp.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDialog(exp)}
                        className="border-slate-700 hover:bg-slate-800"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(exp.id)}
                        className="border-red-900 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mb-3">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                    {exp.current ? ' Present' : ` ${new Date(exp.endDate!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                  </p>

                  <p className="text-slate-400 text-sm mb-3">{exp.description}</p>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-blue-500/10 text-blue-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {experiences.length === 0 && (
          <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
            <p className="text-slate-400 mb-4">No experiences yet</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="border-slate-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </Card>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingId ? 'Edit Experience' : 'Add Experience'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate || ''}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  disabled={formData.current}
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current || false}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <Label htmlFor="current" className="cursor-pointer">Currently working here</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                required
                rows={3}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input
                id="technologies"
                name="technologies"
                value={(formData.technologies || []).join(', ')}
                onChange={(e) => handleArrayChange('technologies', e.target.value)}
                placeholder="React, Node.js, TypeScript"
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Achievements (comma separated)</Label>
              <Textarea
                id="achievements"
                value={(formData.achievements || []).join(', ')}
                onChange={(e) => handleArrayChange('achievements', e.target.value)}
                placeholder="Increased performance by 40%, Led team of 5"
                rows={2}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges (comma separated)</Label>
              <Textarea
                id="challenges"
                value={(formData.challenges || []).join(', ')}
                onChange={(e) => handleArrayChange('challenges', e.target.value)}
                placeholder="Migrated legacy code, Optimized queries"
                rows={2}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learnings">Key Learnings (comma separated)</Label>
              <Textarea
                id="learnings"
                value={(formData.learnings || []).join(', ')}
                onChange={(e) => handleArrayChange('learnings', e.target.value)}
                placeholder="Advanced patterns, Leadership skills"
                rows={2}
                className="bg-slate-800 border-slate-700"
              />
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
