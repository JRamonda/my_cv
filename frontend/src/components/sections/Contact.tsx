'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/types';

interface ContactProps {
  profile: Profile;
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Let's discuss your next project or opportunity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-200 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                {profile.email && (
                  <motion.a
                    href={`mailto:${profile.email}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Email</p>
                      <p className="text-slate-200 font-medium">{profile.email}</p>
                    </div>
                  </motion.a>
                )}

                {profile.phone && (
                  <motion.a
                    href={`tel:${profile.phone}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <Phone className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Phone</p>
                      <p className="text-slate-200 font-medium">{profile.phone}</p>
                    </div>
                  </motion.a>
                )}

                {profile.location && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Location</p>
                      <p className="text-slate-200 font-medium">{profile.location}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-sm text-slate-400 mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {profile.github && (
                    <motion.a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                    >
                      <Github className="w-5 h-5 text-slate-300" />
                    </motion.a>
                  )}
                  {profile.linkedin && (
                    <motion.a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-slate-300" />
                    </motion.a>
                  )}
                </div>
              </div>
            </Card>

            {/* Quick message */}
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
              <h4 className="text-lg font-semibold text-slate-200 mb-2">Ready to collaborate?</h4>
              <p className="text-slate-400 text-sm mb-4">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              {profile.email && (
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => window.location.href = `mailto:${profile.email}`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              )}
            </Card>
          </motion.div>

          {/* Map or illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut" 
                  }}
                  className="mb-6"
                >
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <Send className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-200 mb-2">Let's Work Together</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  I'm passionate about building amazing products and helping businesses achieve their goals through technology.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-20 pt-8 border-t border-slate-800"
      >
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript & Tailwind CSS.
        </p>
      </motion.div>
    </section>
  );
}