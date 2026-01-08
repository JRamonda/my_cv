import apiClient from './client';
import type {
  Profile,
  Experience,
  Project,
  Skill,
  TechStack,
  Reference,
  AuthResponse,
  LoginCredentials,
} from '@/types';

// ============================================
// AUTH SERVICES
// ============================================
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('access_token');
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },
};

// ============================================
// PROFILE SERVICES
// ============================================
export const profileService = {
  getProfile: async (): Promise<Profile> => {
    const { data } = await apiClient.get<Profile>('/profile');
    return data;
  },
  
  updateProfile: async (profile: Partial<Profile>): Promise<Profile> => {
    const { data } = await apiClient.put<Profile>('/profile', profile);
    return data;
  },
};

// ============================================
// EXPERIENCE SERVICES
// ============================================
export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    const { data } = await apiClient.get<Experience[]>('/experience');
    return data;
  },
  
  getById: async (id: string): Promise<Experience> => {
    const { data } = await apiClient.get<Experience>(`/experience/${id}`);
    return data;
  },
  
  create: async (experience: Partial<Experience>): Promise<Experience> => {
    const { data } = await apiClient.post<Experience>('/experience', experience);
    return data;
  },
  
  update: async (id: string, experience: Partial<Experience>): Promise<Experience> => {
    const { data } = await apiClient.put<Experience>(`/experience/${id}`, experience);
    return data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/experience/${id}`);
  },
};

// ============================================
// PROJECTS SERVICES
// ============================================
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await apiClient.get<Project[]>('/projects');
    return data;
  },
  
  getById: async (id: string): Promise<Project> => {
    const { data } = await apiClient.get<Project>(`/projects/${id}`);
    return data;
  },
  
  create: async (project: Partial<Project>): Promise<Project> => {
    const { data } = await apiClient.post<Project>('/projects', project);
    return data;
  },
  
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const { data } = await apiClient.put<Project>(`/projects/${id}`, project);
    return data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },
};

// ============================================
// SKILLS SERVICES
// ============================================
export const skillService = {
  getAll: async (): Promise<Skill[]> => {
    const { data } = await apiClient.get<Skill[]>('/skills');
    return data;
  },
  
  create: async (skill: Partial<Skill>): Promise<Skill> => {
    const { data } = await apiClient.post<Skill>('/skills', skill);
    return data;
  },
  
  update: async (id: string, skill: Partial<Skill>): Promise<Skill> => {
    const { data } = await apiClient.put<Skill>(`/skills/${id}`, skill);
    return data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/skills/${id}`);
  },
};

// ============================================
// TECH STACK SERVICES
// ============================================
export const techStackService = {
  getAll: async (): Promise<TechStack[]> => {
    const { data } = await apiClient.get<TechStack[]>('/tech-stack');
    return data;
  },
  
  create: async (tech: Partial<TechStack>): Promise<TechStack> => {
    const { data } = await apiClient.post<TechStack>('/tech-stack', tech);
    return data;
  },
  
  update: async (id: string, tech: Partial<TechStack>): Promise<TechStack> => {
    const { data } = await apiClient.put<TechStack>(`/tech-stack/${id}`, tech);
    return data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tech-stack/${id}`);
  },
};

// ============================================
// REFERENCES SERVICES
// ============================================
export const referenceService = {
  getAll: async (): Promise<Reference[]> => {
    const { data } = await apiClient.get<Reference[]>('/references');
    return data;
  },
  
  create: async (reference: Partial<Reference>): Promise<Reference> => {
    const { data } = await apiClient.post<Reference>('/references', reference);
    return data;
  },
  
  update: async (id: string, reference: Partial<Reference>): Promise<Reference> => {
    const { data } = await apiClient.put<Reference>(`/references/${id}`, reference);
    return data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/references/${id}`);
  },
};