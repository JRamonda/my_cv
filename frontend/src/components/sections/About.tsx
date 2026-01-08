'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Profile } from '@/types';

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Estas son de ejemplo, deberías agregarlas a tu modelo de Profile
  const strengths = [
    "Problem-solving and analytical thinking",
    "Fast learner and adaptable to new technologies",
    "Strong communication and teamwork skills",
    "Attention to detail and code quality"
  ];

  const weaknesses = [
    "Sometimes overthink solutions",
    "Can be perfectionistic with code",
    "Learning to delegate more effectively"
  ];

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
            About Me
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get to know more about my journey and what drives me
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Strengths */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full hover:border-green-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-400">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Growth Areas */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <TrendingDown className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200">Growth Areas</h3>
              </div>
              <ul className="space-y-3">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-400">
                    <span className="text-orange-400 mt-1">→</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Philosophy */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200">Philosophy</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                I believe in writing clean, maintainable code and continuous learning. 
                My approach combines technical excellence with user-centric design, 
                always striving to deliver solutions that make a real impact.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}