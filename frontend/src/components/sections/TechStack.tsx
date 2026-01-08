'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { TechStack as TechStackType } from '@/types';

interface TechStackProps {
  techStack: TechStackType[];
}

export default function TechStack({ techStack }: TechStackProps) {
  const groupedTech = techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechStackType[]>);

  const categoryColors: Record<string, string> = {
    frontend: 'from-blue-500 to-cyan-500',
    backend: 'from-green-500 to-emerald-500',
    database: 'from-purple-500 to-pink-500',
    devops: 'from-orange-500 to-red-500',
    tools: 'from-yellow-500 to-amber-500',
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My preferred technologies and frameworks
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(groupedTech).map(([category, techs], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className="mb-6">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${categoryColors[category] || 'from-slate-400 to-slate-600'} bg-clip-text text-transparent capitalize inline-block`}>
                  {category}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {techs
                  .sort((a, b) => a.order - b.order)
                  .map((tech, index) => (
                    <motion.div
                      key={tech.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Card className={`relative p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm transition-all duration-300 h-full flex flex-col items-center justify-center text-center group ${
                        tech.preferred ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' : 'hover:border-blue-500/50'
                      }`}>
                        {tech.preferred && (
                          <div className="absolute -top-2 -right-2">
                            <div className="relative">
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                            </div>
                          </div>
                        )}

                        {tech.icon && (
                          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                            {tech.icon}
                          </div>
                        )}

                        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                          {tech.name}
                        </h4>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preferred stack highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="text-sm font-medium">
                Technologies marked with a star are my preferred stack
              </span>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}