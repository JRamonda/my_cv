'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FolderKanban, 
  Award, 
  Code, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/lib/api/services';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: User, label: 'Profile', href: '/admin/dashboard/profile' },
  { icon: Briefcase, label: 'Experience', href: '/admin/dashboard/experience' },
  { icon: FolderKanban, label: 'Projects', href: '/admin/dashboard/projects' },
  { icon: Award, label: 'Skills', href: '/admin/dashboard/skills' },
  { icon: Code, label: 'Tech Stack', href: '/admin/dashboard/tech-stack' },
  { icon: Users, label: 'References', href: '/admin/dashboard/references' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-slate-900 border-slate-800"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-800 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-sm text-slate-400 mt-1">CV Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-slate-800">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-slate-700 hover:bg-slate-800"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
