'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Linkedin, Mail, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Reference } from '@/types';

interface ReferencesProps {
  references: Reference[];
}

export default function References({ references }: ReferencesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sortedReferences = [...references].sort((a, b) => a.order - b.order);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedReferences.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + sortedReferences.length) % sortedReferences.length);
  };

  if (sortedReferences.length === 0) return null;

  const currentRef = sortedReferences[currentIndex];

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
            References
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 bg-slate-900/50 border-slate-800 backdrop-blur-sm relative">
                {/* Quote icon */}
                <div className="absolute top-8 left-8 text-blue-500/20">
                  <Quote className="w-16 h-16" />
                </div>

                {/* Testimonial */}
                <div className="relative z-10 mb-8">
                  <p className="text-slate-300 text-lg md:text-xl leading-relaxed italic">
                    "{currentRef.testimonial}"
                  </p>
                </div>

                {/* Reference info */}
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-16 h-16 border-2 border-blue-500">
                    <AvatarImage src={currentRef.avatar} alt={currentRef.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                      {currentRef.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="text-xl font-bold text-slate-200">{currentRef.name}</h4>
                    <p className="text-slate-400">{currentRef.position}</p>
                    <p className="text-slate-500 text-sm">{currentRef.company}</p>
                    <p className="text-blue-400 text-sm">{currentRef.relationship}</p>
                  </div>
                </div>

                {/* Contact info */}
                <div className="flex flex-wrap gap-3">
                  {currentRef.linkedin && (
                    <a
                      href={currentRef.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {currentRef.email && (
                    <a
                      href={`mailto:${currentRef.email}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  )}
                  {currentRef.phone && (
                    <a
                      href={`tel:${currentRef.phone}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Phone
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {sortedReferences.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-slate-700 hover:bg-slate-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {sortedReferences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-blue-500'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-slate-700 hover:bg-slate-800"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}