'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.order - a.order;
  });

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? 'default' : 'outline'}
              className={`capitalize ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'border-slate-700 hover:bg-slate-800'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <span className="text-6xl font-bold text-slate-700">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge 
                          variant="secondary" 
                          className="bg-slate-800 text-slate-400 text-xs"
                        >
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20"
                        onClick={() => window.open(project.demoUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-slate-700 hover:bg-slate-800"
                        onClick={() => window.open(project.repoUrl, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}