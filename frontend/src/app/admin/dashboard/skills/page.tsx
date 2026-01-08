'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { skillService } from '@/lib/api/services';
import type { Skill } from '@/types';
import { toast } from 'sonner';

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    category: 'frontend',
    name: '',
    level: 'intermediate',
    icon: '',
    order: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await skillService.getAll();
      setSkills(data);
    } catch (error) {
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (skill?: Skill) => {
    if (skill) {
      setEditingId(skill.id);
      setFormData(skill);
    } else {
      setEditingId(null);
      setFormData({
        category: 'frontend',
        name: '',
        level: 'intermediate',
        icon: '',
        order: skills.length,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await skillService.update(editingId, formData);
        toast.success('Skill updated successfully');
      } else {
        await skillService.create(formData as any);
        toast.success('Skill created successfully');
      }
      handleCloseDialog();
      fetchSkills();
    } catch (error) {
      toast.error('Failed to save skill');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await skillService.delete(id);
      toast.success('Skill deleted successfully');
      fetchSkills();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Skills
          </h1>
          <p className="text-slate-400">Manage your technical skills</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-200 mb-4 capitalize">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {skill.icon && <span className="text-2xl">{skill.icon}</span>}
                      <div>
                        <p className="text-slate-200 font-medium">{skill.name}</p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            skill.level === 'expert'
                              ? 'bg-green-500/10 text-green-400'
                              : skill.level === 'intermediate'
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-yellow-500/10 text-yellow-400'
                          }`}
                        >
                          {skill.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenDialog(skill)}
                        className="h-8 w-8 p-0 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(skill.id)}
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

        {Object.keys(groupedSkills).length === 0 && (
          <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
            <p className="text-slate-400 mb-4">No skills yet</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="border-slate-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill
            </Button>
          </Card>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingId ? 'Edit Skill' : 'Add Skill'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name *</Label>
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
                <option value="tools">Tools</option>
                <option value="soft-skills">Soft Skills</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level *</Label>
              <select
                id="level"
                name="level"
                value={formData.level || 'intermediate'}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon (emoji)</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon || ''}
                onChange={handleChange}
                placeholder="⚛️"
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
