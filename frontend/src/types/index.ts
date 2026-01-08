// ============================================
// TYPES - Frontend TypeScript Definitions
// ============================================

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  profileImage?: string;
  resumeFile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  challenges: string[];
  learnings: string[];
  technologies: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc?: string;
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  technologies: string[];
  highlights: string[];
  category: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TechStack {
  id: string;
  category: string;
  name: string;
  icon?: string;
  preferred: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  relationship: string;
  testimonial: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  avatar?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}