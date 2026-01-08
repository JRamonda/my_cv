'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FolderKanban, Award, Users, Eye, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { experienceService, projectService, skillService, referenceService } from '@/lib/api/services';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    experiences: 0,
    projects: 0,
    skills: 0,
    references: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [experiences, projects, skills, references] = await Promise.all([
          experienceService.getAll(),
          projectService.getAll(),
          skillService.getAll(),
          referenceService.getAll(),
        ]);

        setStats({
          experiences: experiences.length,
          projects: projects.length,
          skills: skills.length,
          references: references.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { icon: Briefcase, label: 'Experiences', value: stats.experiences, color: 'from-blue-500 to-cyan-500', href: '/admin/dashboard/experience' },
    { icon: FolderKanban, label: 'Projects', value: stats.projects, color: 'from-purple-500 to-pink-500', href: '/admin/dashboard/projects' },
    { icon: Award, label: 'Skills', value: stats.skills, color: 'from-green-500 to-emerald-500', href: '/admin/dashboard/skills' },
    { icon: Users, label: 'References', value: stats.references, color: 'from-orange-500 to-red-500', href: '/admin/dashboard/references' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-slate-400">Manage your CV content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Edit className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-200 mb-1">{stat.value}</h3>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-slate-200 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" className="w-full justify-start gap-3 border-slate-700 hover:bg-slate-800 h-auto py-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-200">View Public CV</p>
                  <p className="text-sm text-slate-500">See how your CV looks</p>
                </div>
              </Button>
            </Link>

            <Link href="/admin/dashboard/profile">
              <Button variant="outline" className="w-full justify-start gap-3 border-slate-700 hover:bg-slate-800 h-auto py-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Edit className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-200">Edit Profile</p>
                  <p className="text-sm text-slate-500">Update your information</p>
                </div>
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-8"
      >
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Welcome to your Admin Panel! 👋</h3>
          <p className="text-slate-400 text-sm">
            Use the sidebar to navigate through different sections and manage your CV content. All changes are saved automatically and reflected on your public CV page.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
