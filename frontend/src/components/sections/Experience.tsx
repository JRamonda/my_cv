'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, TrendingUp, Lightbulb, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Experience } from '@/types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const sortedExperiences = [...experiences].sort((a, b) => b.order - a.order);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
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
            Work Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My professional journey and achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-12">
            {sortedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-200 mb-1 group-hover:text-blue-400 transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-lg text-slate-400">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 mb-4">{exp.description}</p>

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-green-400" />
                          <h4 className="text-sm font-semibold text-slate-300">Key Achievements</h4>
                        </div>
                        <ul className="space-y-1 ml-6">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-slate-400 list-disc">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Challenges */}
                    {exp.challenges && exp.challenges.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-orange-400" />
                          <h4 className="text-sm font-semibold text-slate-300">Challenges Overcome</h4>
                        </div>
                        <ul className="space-y-1 ml-6">
                          {exp.challenges.map((challenge, i) => (
                            <li key={i} className="text-sm text-slate-400 list-disc">
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Learnings */}
                    {exp.learnings && exp.learnings.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-yellow-400" />
                          <h4 className="text-sm font-semibold text-slate-300">Key Learnings</h4>
                        </div>
                        <ul className="space-y-1 ml-6">
                          {exp.learnings.map((learning, i) => (
                            <li key={i} className="text-sm text-slate-400 list-disc">
                              {learning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <Briefcase className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}