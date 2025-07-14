import { 
  users, companies, simulations, mentorSessions, cvReviews, newsletters,
  type User, type InsertUser, type Company, type InsertCompany, 
  type Simulation, type InsertSimulation, type MentorSession, type InsertMentorSession,
  type CvReview, type InsertCvReview, type Newsletter, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Companies
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  getCompanyBySlug(slug: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Simulations
  getSimulation(id: number): Promise<Simulation | undefined>;
  getSimulationsByUser(userId: number): Promise<Simulation[]>;
  createSimulation(simulation: InsertSimulation): Promise<Simulation>;
  updateSimulation(id: number, updates: Partial<Simulation>): Promise<Simulation | undefined>;

  // Mentor Sessions
  getMentorSession(id: number): Promise<MentorSession | undefined>;
  getMentorSessionsBySimulation(simulationId: number): Promise<MentorSession[]>;
  createMentorSession(session: InsertMentorSession): Promise<MentorSession>;
  updateMentorSession(id: number, updates: Partial<MentorSession>): Promise<MentorSession | undefined>;

  // CV Reviews
  getCvReview(id: number): Promise<CvReview | undefined>;
  getCvReviewsByUser(userId: number): Promise<CvReview[]>;
  createCvReview(review: InsertCvReview): Promise<CvReview>;

  // Newsletter
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscription(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private companies: Map<number, Company> = new Map();
  private simulations: Map<number, Simulation> = new Map();
  private mentorSessions: Map<number, MentorSession> = new Map();
  private cvReviews: Map<number, CvReview> = new Map();
  private newsletters: Map<number, Newsletter> = new Map();
  
  private currentUserId = 1;
  private currentCompanyId = 1;
  private currentSimulationId = 1;
  private currentMentorSessionId = 1;
  private currentCvReviewId = 1;
  private currentNewsletterId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed companies
    const companiesData = [
      {
        name: "Google",
        slug: "google",
        logo: "G",
        color: "bg-blue-500",
        description: "Software Engineering",
        duration: "12 weeks",
        projectCount: 4,
        skills: ["React", "TypeScript", "Node.js", "System Design", "Algorithms"]
      },
      {
        name: "Meta",
        slug: "meta", 
        logo: "M",
        color: "bg-blue-600",
        description: "Product Engineering",
        duration: "10 weeks",
        projectCount: 3,
        skills: ["React", "GraphQL", "Python", "Machine Learning", "APIs"]
      },
      {
        name: "Netflix",
        slug: "netflix",
        logo: "N", 
        color: "bg-red-600",
        description: "Data Science",
        duration: "16 weeks",
        projectCount: 5,
        skills: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization"]
      },
      {
        name: "Amazon",
        slug: "amazon",
        logo: "A",
        color: "bg-orange-500", 
        description: "Cloud Computing",
        duration: "14 weeks",
        projectCount: 6,
        skills: ["AWS", "Docker", "Kubernetes", "Microservices", "DevOps"]
      }
    ];

    companiesData.forEach(company => {
      const id = this.currentCompanyId++;
      this.companies.set(id, { ...company, id });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Companies
  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompanyBySlug(slug: string): Promise<Company | undefined> {
    return Array.from(this.companies.values()).find(company => company.slug === slug);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { ...insertCompany, id };
    this.companies.set(id, company);
    return company;
  }

  // Simulations
  async getSimulation(id: number): Promise<Simulation | undefined> {
    return this.simulations.get(id);
  }

  async getSimulationsByUser(userId: number): Promise<Simulation[]> {
    return Array.from(this.simulations.values()).filter(sim => sim.userId === userId);
  }

  async createSimulation(insertSimulation: InsertSimulation): Promise<Simulation> {
    const id = this.currentSimulationId++;
    const simulation: Simulation = { 
      ...insertSimulation, 
      id,
      startedAt: new Date(),
      completedAt: null
    };
    this.simulations.set(id, simulation);
    return simulation;
  }

  async updateSimulation(id: number, updates: Partial<Simulation>): Promise<Simulation | undefined> {
    const simulation = this.simulations.get(id);
    if (!simulation) return undefined;
    
    const updated = { ...simulation, ...updates };
    this.simulations.set(id, updated);
    return updated;
  }

  // Mentor Sessions
  async getMentorSession(id: number): Promise<MentorSession | undefined> {
    return this.mentorSessions.get(id);
  }

  async getMentorSessionsBySimulation(simulationId: number): Promise<MentorSession[]> {
    return Array.from(this.mentorSessions.values()).filter(session => session.simulationId === simulationId);
  }

  async createMentorSession(insertSession: InsertMentorSession): Promise<MentorSession> {
    const id = this.currentMentorSessionId++;
    const session: MentorSession = { 
      ...insertSession, 
      id,
      createdAt: new Date()
    };
    this.mentorSessions.set(id, session);
    return session;
  }

  async updateMentorSession(id: number, updates: Partial<MentorSession>): Promise<MentorSession | undefined> {
    const session = this.mentorSessions.get(id);
    if (!session) return undefined;
    
    const updated = { ...session, ...updates };
    this.mentorSessions.set(id, updated);
    return updated;
  }

  // CV Reviews
  async getCvReview(id: number): Promise<CvReview | undefined> {
    return this.cvReviews.get(id);
  }

  async getCvReviewsByUser(userId: number): Promise<CvReview[]> {
    return Array.from(this.cvReviews.values()).filter(review => review.userId === userId);
  }

  async createCvReview(insertReview: InsertCvReview): Promise<CvReview> {
    const id = this.currentCvReviewId++;
    const review: CvReview = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.cvReviews.set(id, review);
    return review;
  }

  // Newsletter
  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id,
      subscribedAt: new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscription(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(sub => sub.email === email);
  }
}

export const storage = new MemStorage();
