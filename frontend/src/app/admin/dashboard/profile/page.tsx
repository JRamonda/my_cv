'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { profileService } from '@/lib/api/services';
import type { Profile } from '@/types';
import { toast } from 'sonner';

export default function ProfileEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<Profile>>({
    name: '',
    title: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    profileImage: '',
    resumeFile: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await profileService.updateProfile(profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Edit Profile
        </h1>
        <p className="text-slate-400">Update your personal information</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name || ''}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Full Stack Developer"
                    value={profile.title || ''}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={profile.bio || ''}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., San Francisco, CA"
                    value={profile.location || ''}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email || ''}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={profile.phone || ''}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={profile.linkedin || ''}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    name="github"
                    type="url"
                    placeholder="https://github.com/username"
                    value={profile.github || ''}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={profile.website || ''}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    name="profileImage"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={profile.profileImage || ''}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-700"
                  />
                  <p className="text-xs text-slate-500">Recommended: 400x400px</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resumeFile">Resume File URL</Label>
                  <Input
                    id="resumeFile"
                    name="resumeFile"
                    type="url"
                    placeholder="https://example.com/resume.pdf"
                    value={profile.resumeFile || ''}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-700"
                  />
                  <p className="text-xs text-slate-500">Link to your PDF resume</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
