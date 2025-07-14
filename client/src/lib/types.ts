export interface CodeAnalysis {
  score: number;
  issues: string[];
  suggestions: string[];
  complexity: string;
  testCoverage: number;
}

export interface MentorMessage {
  role: 'user' | 'ai' | 'human';
  content: string;
  timestamp: string;
}

export interface SkillsAssessment {
  skills: Record<string, number>;
  overallScore: number;
  readinessLevel: string;
  recommendations: string[];
}

export interface CompanySimulation {
  id: number;
  name: string;
  slug: string;
  logo: string;
  color: string;
  description: string;
  duration: string;
  projectCount: number;
  skills: string[];
}

export interface SimulationProgress {
  id: number;
  companyId: number;
  status: string;
  progress: number;
  currentProject: string;
  skillsAssessed: Record<string, number>;
}
