'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = profile.title;
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-slate-300 text-sm">Available for opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {profile.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-slate-300 mb-6 h-12 flex items-center justify-center lg:justify-start"
            >
              <span className="font-mono">{typedText}</span>
              {!isTypingComplete && (
                <span className="inline-block w-0.5 h-8 bg-blue-400 ml-1 animate-pulse"></span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-slate-400 mb-8"
            >
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>

              {profile.resumeFile && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 hover:bg-slate-800"
                  onClick={() => window.open(profile.resumeFile, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Github className="w-5 h-5 text-slate-300" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-slate-300" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Mail className="w-5 h-5 text-slate-300" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right side - Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-8xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}