'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { projectService } from '@/lib/api/services';
import type { Project } from '@/types';
import { toast } from 'sonner';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    longDesc: '',
    images: [],
    demoUrl: '',
    repoUrl: '',
    technologies: [],
    highlights: [],
    category: 'web',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData(project);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        longDesc: '',
        images: [],
        demoUrl: '',
        repoUrl: '',
        technologies: [],
        highlights: [],
        category: 'web',
        featured: false,
        order: projects.length,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleArrayChange = (field: keyof Project, value: string) => {
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
        await projectService.update(editingId, formData);
        toast.success('Project updated successfully');
      } else {
        await projectService.create(formData as any);
        toast.success('Project created successfully');
      }
      handleCloseDialog();
      fetchProjects();
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectService.delete(id);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Projects
          </h1>
          <p className="text-slate-400">Manage your project portfolio</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all h-full flex flex-col">
              {project.featured && (
                <Badge className="mb-3 w-fit bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                  Featured
                </Badge>
              )}

              <h3 className="text-xl font-bold text-slate-200 mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-3 flex-1">{project.description}</p>

              <div className="space-y-3">
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-500/10 text-blue-400 text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenDialog(project)}
                    className="flex-1 border-slate-700 hover:bg-slate-800"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(project.id)}
                    className="border-red-900 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {projects.length === 0 && (
          <Card className="p-12 bg-slate-900/50 border-slate-800 text-center col-span-full">
            <p className="text-slate-400 mb-4">No projects yet</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="border-slate-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </Card>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingId ? 'Edit Project' : 'Add Project'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                required
                rows={2}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longDesc">Long Description</Label>
              <Textarea
                id="longDesc"
                name="longDesc"
                value={formData.longDesc || ''}
                onChange={handleChange}
                rows={3}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category || 'web'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  name="demoUrl"
                  type="url"
                  value={formData.demoUrl || ''}
                  onChange={handleChange}
                  placeholder="https://demo.com"
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoUrl">Repository URL</Label>
                <Input
                  id="repoUrl"
                  name="repoUrl"
                  type="url"
                  value={formData.repoUrl || ''}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Image URLs (comma separated)</Label>
              <Input
                id="images"
                value={(formData.images || []).join(', ')}
                onChange={(e) => handleArrayChange('images', e.target.value)}
                placeholder="https://example.com/image1.jpg, https://..."
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma separated) *</Label>
              <Input
                id="technologies"
                value={(formData.technologies || []).join(', ')}
                onChange={(e) => handleArrayChange('technologies', e.target.value)}
                placeholder="React, Node.js, TypeScript"
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlights">Highlights (comma separated)</Label>
              <Textarea
                id="highlights"
                value={(formData.highlights || []).join(', ')}
                onChange={(e) => handleArrayChange('highlights', e.target.value)}
                placeholder="Real-time updates, Drag & drop interface"
                rows={2}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured || false}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <Label htmlFor="featured" className="cursor-pointer">Featured project</Label>
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
