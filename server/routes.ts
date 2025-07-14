import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertNewsletterSchema, insertCvReviewSchema } from "@shared/schema";
import { z } from "zod";

interface WebSocketMessage {
  type: string;
  data: any;
  sessionId?: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time features
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  const mentorSessions = new Map<string, WebSocket>();

  wss.on('connection', (ws: WebSocket) => {
    let sessionId: string | null = null;

    ws.on('message', async (data: Buffer) => {
      try {
        const message: WebSocketMessage = JSON.parse(data.toString());
        
        switch (message.type) {
          case 'join_mentor_session':
            sessionId = message.data.sessionId;
            mentorSessions.set(sessionId, ws);
            break;
            
          case 'mentor_message':
            if (sessionId && ws.readyState === WebSocket.OPEN) {
              // Simulate AI mentor response
              setTimeout(() => {
                if (ws.readyState === WebSocket.OPEN) {
                  const aiResponse = generateAIMentorResponse(message.data.content);
                  ws.send(JSON.stringify({
                    type: 'mentor_response',
                    data: {
                      role: 'ai',
                      content: aiResponse,
                      timestamp: new Date().toISOString()
                    }
                  }));
                }
              }, 1000 + Math.random() * 2000); // 1-3 second delay
            }
            break;
            
          case 'code_analysis':
            if (ws.readyState === WebSocket.OPEN) {
              const analysis = analyzeCode(message.data.code);
              ws.send(JSON.stringify({
                type: 'code_analysis_result',
                data: analysis
              }));
            }
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      if (sessionId) {
        mentorSessions.delete(sessionId);
      }
    });
  });

  // API Routes
  
  // Get all companies
  app.get('/api/companies', async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch companies' });
    }
  });

  // Get company by slug
  app.get('/api/companies/:slug', async (req, res) => {
    try {
      const company = await storage.getCompanyBySlug(req.params.slug);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch company' });
    }
  });

  // Create simulation
  app.post('/api/simulations', async (req, res) => {
    try {
      const { companyId, userId } = req.body;
      
      if (!companyId || !userId) {
        return res.status(400).json({ message: 'Company ID and User ID are required' });
      }

      const simulation = await storage.createSimulation({
        userId,
        companyId,
        status: 'active',
        progress: 0,
        currentProject: 'Getting Started',
        skillsAssessed: {}
      });

      res.json(simulation);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create simulation' });
    }
  });

  // Get user simulations
  app.get('/api/users/:userId/simulations', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const simulations = await storage.getSimulationsByUser(userId);
      res.json(simulations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch simulations' });
    }
  });

  // Update simulation progress
  app.patch('/api/simulations/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const simulation = await storage.updateSimulation(id, updates);
      if (!simulation) {
        return res.status(404).json({ message: 'Simulation not found' });
      }
      
      res.json(simulation);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update simulation' });
    }
  });

  // CV Review upload and analysis
  app.post('/api/cv-review', async (req, res) => {
    try {
      const reviewData = insertCvReviewSchema.parse(req.body);
      
      // Simulate CV analysis
      const analysis = analyzeCv(reviewData.filename);
      
      const review = await storage.createCvReview({
        ...reviewData,
        score: analysis.score,
        feedback: analysis.feedback,
        suggestions: analysis.suggestions
      });

      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid CV review data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to analyze CV' });
    }
  });

  // Newsletter subscription
  app.post('/api/newsletter', async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      
      // Check if already subscribed
      const existing = await storage.getNewsletterSubscription(newsletterData.email);
      if (existing) {
        return res.status(409).json({ message: 'Email already subscribed' });
      }

      const subscription = await storage.createNewsletterSubscription(newsletterData);
      res.json({ message: 'Successfully subscribed!', subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid email address', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to subscribe' });
    }
  });

  // Skills assessment endpoint
  app.post('/api/skills-assessment', async (req, res) => {
    try {
      const { answers, userId } = req.body;
      
      // Simulate skills assessment
      const assessment = assessSkills(answers);
      
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to assess skills' });
    }
  });

  return httpServer;
}

// Helper functions for AI simulation
function generateAIMentorResponse(userMessage: string): string {
  const responses = [
    "That's a great question! Let me break this down for you...",
    "I see what you're trying to achieve. Here's how I'd approach this problem:",
    "Good thinking! You're on the right track. Consider this approach:",
    "Excellent observation! This is a common pattern in software engineering:",
    "Let me help you optimize this. Have you considered using a different data structure?",
    "That's a solid foundation. Now let's think about edge cases and scalability:",
  ];
  
  const specificResponses: Record<string, string> = {
    "optimize": "For optimization, consider the time and space complexity. Can we reduce the number of iterations or use memoization?",
    "algorithm": "When choosing algorithms, think about the problem constraints. Is this a searching, sorting, or graph problem?",
    "system design": "For system design, start with requirements gathering, then think about scalability, reliability, and performance.",
    "interview": "In interviews, always clarify requirements first, then think out loud as you work through the solution.",
    "complexity": "Time complexity measures how runtime scales with input size. Space complexity measures memory usage.",
  };

  const lowerMessage = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(specificResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return responses[Math.floor(Math.random() * responses.length)];
}

function analyzeCode(code: string) {
  // Simulate code analysis
  const issues = [];
  const suggestions = [];
  
  if (code.includes('for') && code.includes('for')) {
    issues.push('Nested loops detected - consider optimizing time complexity');
  }
  
  if (!code.includes('function') && !code.includes('def') && !code.includes('class')) {
    suggestions.push('Consider organizing code into functions for better readability');
  }
  
  if (code.length > 500) {
    suggestions.push('Code is getting long - consider breaking into smaller functions');
  }

  const score = Math.max(60, 100 - issues.length * 10 - (code.length > 500 ? 5 : 0));

  return {
    score,
    issues,
    suggestions,
    complexity: code.includes('sort') ? 'O(n log n)' : code.includes('for') ? 'O(n)' : 'O(1)',
    testCoverage: Math.floor(Math.random() * 40) + 60
  };
}

function analyzeCv(filename: string) {
  // Simulate CV analysis
  const score = Math.floor(Math.random() * 30) + 70; // 70-100 range
  
  const feedback = [
    { type: 'positive', message: 'Strong technical skills section with relevant technologies', severity: 'info' },
    { type: 'improvement', message: 'Add quantified achievements (e.g., "improved performance by 40%")', severity: 'warning' },
    { type: 'missing', message: 'Include relevant keywords for ATS optimization', severity: 'error' }
  ];

  const suggestions = "Consider adding more specific project details and quantifying your impact. Include relevant industry keywords to improve ATS matching.";

  return { score, feedback, suggestions };
}

function assessSkills(answers: any[]) {
  // Simulate skills assessment
  const skills = {
    'algorithms': Math.floor(Math.random() * 30) + 70,
    'systemDesign': Math.floor(Math.random() * 30) + 60,
    'dataStructures': Math.floor(Math.random() * 30) + 75,
    'behavioralInterview': Math.floor(Math.random() * 30) + 80,
    'coding': Math.floor(Math.random() * 30) + 85
  };

  const overallScore = Object.values(skills).reduce((acc, score) => acc + score, 0) / Object.values(skills).length;
  
  return {
    skills,
    overallScore: Math.round(overallScore),
    readinessLevel: overallScore >= 85 ? 'Interview Ready' : overallScore >= 70 ? 'Nearly Ready' : 'Needs Practice',
    recommendations: [
      'Complete Netflix Data Pipeline project to strengthen system design',
      'Practice more algorithm problems focusing on dynamic programming',
      'Schedule mock interviews to improve behavioral responses'
    ]
  };
}
