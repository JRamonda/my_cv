import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });
  console.log('✅ Created user:', user.email);

  // Create profile
  const profile = await prisma.profile.upsert({
    where: { id: '1' },
    update: {},
    create: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with 5+ years of experience building web applications. Specialized in React, Node.js, and cloud technologies.',
      location: 'San Francisco, CA',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      website: 'https://johndoe.dev',
    },
  });
  console.log('✅ Created profile:', profile.name);

  // Create experiences
  await prisma.experience.createMany({
    data: [
      {
        company: 'Tech Corp',
        position: 'Senior Full Stack Developer',
        startDate: new Date('2021-01-01'),
        current: true,
        description: 'Leading development of modern web applications using React and Node.js',
        achievements: [
          'Increased application performance by 40%',
          'Led a team of 5 developers',
          'Implemented CI/CD pipeline'
        ],
        challenges: [
          'Migrated legacy codebase to modern stack',
          'Optimized database queries'
        ],
        learnings: [
          'Advanced React patterns',
          'Microservices architecture',
          'Team leadership'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
        order: 2,
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        startDate: new Date('2019-06-01'),
        endDate: new Date('2020-12-31'),
        current: false,
        description: 'Developed and maintained multiple client projects',
        achievements: [
          'Built 10+ production applications',
          'Reduced bug count by 60%'
        ],
        challenges: ['Tight deadlines', 'Multiple project management'],
        learnings: ['Time management', 'Client communication'],
        technologies: ['Vue.js', 'Express', 'MongoDB'],
        order: 1,
      },
    ],
  });
  console.log('✅ Created experiences');

  // Create projects
  await prisma.project.createMany({
    data: [
      {
        title: 'E-commerce Platform',
        description: 'Full-featured online store with payment integration',
        longDesc: 'A comprehensive e-commerce solution with inventory management, payment processing, and admin dashboard.',
        demoUrl: 'https://demo.example.com',
        repoUrl: 'https://github.com/example/ecommerce',
        technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
        highlights: ['Payment integration', 'Real-time inventory', 'Admin dashboard'],
        category: 'web',
        featured: true,
        order: 3,
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task manager with real-time updates',
        technologies: ['React', 'Socket.io', 'MongoDB'],
        highlights: ['Real-time collaboration', 'Drag & drop interface'],
        category: 'web',
        featured: true,
        order: 2,
      },
      {
        title: 'Weather Dashboard',
        description: 'Beautiful weather app with forecasts',
        technologies: ['React Native', 'OpenWeather API'],
        highlights: ['Location-based forecasts', 'Offline support'],
        category: 'mobile',
        featured: false,
        order: 1,
      },
    ],
  });
  console.log('✅ Created projects');

  // Create skills
  await prisma.skill.createMany({
    data: [
      { category: 'frontend', name: 'React', level: 'expert', icon: '⚛️', order: 1 },
      { category: 'frontend', name: 'Next.js', level: 'expert', icon: '▲', order: 2 },
      { category: 'frontend', name: 'TypeScript', level: 'expert', icon: '📘', order: 3 },
      { category: 'frontend', name: 'Tailwind CSS', level: 'expert', icon: '🎨', order: 4 },
      { category: 'backend', name: 'Node.js', level: 'expert', icon: '🟢', order: 1 },
      { category: 'backend', name: 'NestJS', level: 'intermediate', icon: '🐱', order: 2 },
      { category: 'backend', name: 'Express', level: 'expert', icon: '🚂', order: 3 },
      { category: 'database', name: 'PostgreSQL', level: 'intermediate', icon: '🐘', order: 1 },
      { category: 'database', name: 'MongoDB', level: 'intermediate', icon: '🍃', order: 2 },
      { category: 'tools', name: 'Git', level: 'expert', icon: '📦', order: 1 },
      { category: 'tools', name: 'Docker', level: 'intermediate', icon: '🐳', order: 2 },
    ],
  });
  console.log('✅ Created skills');

  // Create tech stack
  await prisma.techStack.createMany({
    data: [
      { category: 'frontend', name: 'React', icon: '⚛️', preferred: true, order: 1 },
      { category: 'frontend', name: 'Next.js', icon: '▲', preferred: true, order: 2 },
      { category: 'frontend', name: 'TypeScript', icon: '📘', preferred: true, order: 3 },
      { category: 'backend', name: 'Node.js', icon: '🟢', preferred: true, order: 1 },
      { category: 'backend', name: 'NestJS', icon: '🐱', preferred: true, order: 2 },
      { category: 'database', name: 'PostgreSQL', icon: '🐘', preferred: true, order: 1 },
      { category: 'database', name: 'MongoDB', icon: '🍃', preferred: false, order: 2 },
      { category: 'devops', name: 'Docker', icon: '🐳', preferred: true, order: 1 },
      { category: 'devops', name: 'AWS', icon: '☁️', preferred: false, order: 2 },
    ],
  });
  console.log('✅ Created tech stack');

  // Create references
  await prisma.reference.createMany({
    data: [
      {
        name: 'Jane Smith',
        position: 'CTO',
        company: 'Tech Corp',
        relationship: 'Direct Manager',
        testimonial: 'John is an exceptional developer with great attention to detail. His ability to solve complex problems and mentor junior developers makes him an invaluable team member.',
        email: 'jane.smith@techcorp.com',
        linkedin: 'https://linkedin.com/in/janesmith',
        order: 1,
      },
      {
        name: 'Mike Johnson',
        position: 'Lead Developer',
        company: 'StartupXYZ',
        relationship: 'Colleague',
        testimonial: 'Working with John was a pleasure. He consistently delivered high-quality code and was always willing to help the team.',
        email: 'mike.j@startupxyz.com',
        order: 2,
      },
    ],
  });
  console.log('✅ Created references');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  