'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Skill } from '@/types';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-blue-500';
      case 'beginner':
        return 'bg-yellow-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert':
        return 'w-full';
      case 'intermediate':
        return 'w-2/3';
      case 'beginner':
        return 'w-1/3';
      default:
        return 'w-1/2';
    }
  };

  const categoryIcons: Record<string, string> = {
    frontend: '🎨',
    backend: '⚙️',
    database: '🗄️',
    tools: '🔧',
    'soft-skills': '💡',
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
            Skills & Expertise
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{categoryIcons[category] || '📦'}</span>
                  <h3 className="text-2xl font-bold text-slate-200 capitalize">
                    {category.replace('-', ' ')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {categorySkills
                    .sort((a, b) => a.order - b.order)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + index * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {skill.icon && <span className="text-xl">{skill.icon}</span>}
                            <span className="text-slate-300 font-medium">{skill.name}</span>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`capitalize text-xs ${
                              skill.level === 'expert' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : skill.level === 'intermediate'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }`}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: categoryIndex * 0.1 + index * 0.05 }}
                            className={`h-full ${getLevelColor(skill.level)} rounded-full ${getLevelWidth(skill.level)}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}