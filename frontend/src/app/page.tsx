'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import TechStack from '@/components/sections/TechStack';
import References from '@/components/sections/References';
import Contact from '@/components/sections/Contact';
import { profileService, experienceService, projectService, skillService, techStackService, referenceService } from '@/lib/api/services';
import type { Profile, Experience as ExperienceType, Project as ProjectType, Skill, TechStack as TechStackType, Reference } from '@/types';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [techStack, setTechStack] = useState<TechStackType[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, experiencesData, projectsData, skillsData, techStackData, referencesData] = await Promise.all([
          profileService.getProfile(),
          experienceService.getAll(),
          projectService.getAll(),
          skillService.getAll(),
          techStackService.getAll(),
          referenceService.getAll(),
        ]);

        setProfile(profileData);
        setExperiences(experiencesData);
        setProjects(projectsData);
        setSkills(skillsData);
        setTechStack(techStackData);
        setReferences(referencesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {profile && <Hero profile={profile} />}
      {profile && <About profile={profile} />}
      {experiences.length > 0 && <Experience experiences={experiences} />}
      {projects.length > 0 && <Projects projects={projects} />}
      {skills.length > 0 && <Skills skills={skills} />}
      {techStack.length > 0 && <TechStack techStack={techStack} />}
      {references.length > 0 && <References references={references} />}
      {profile && <Contact profile={profile} />}
    </main>
  );
}