import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  color: text("color").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  projectCount: integer("project_count").notNull(),
  skills: json("skills").$type<string[]>().notNull(),
});

export const simulations = pgTable("simulations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyId: integer("company_id").references(() => companies.id),
  status: text("status").notNull().default("active"), // active, completed, paused
  progress: integer("progress").default(0), // percentage
  currentProject: text("current_project"),
  skillsAssessed: json("skills_assessed").$type<Record<string, number>>().default({}),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const mentorSessions = pgTable("mentor_sessions", {
  id: serial("id").primaryKey(),
  simulationId: integer("simulation_id").references(() => simulations.id),
  mentorType: text("mentor_type").notNull(), // ai, human
  messages: json("messages").$type<Array<{role: string, content: string, timestamp: string}>>().default([]),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cvReviews = pgTable("cv_reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  filename: text("filename").notNull(),
  score: integer("score"),
  feedback: json("feedback").$type<Array<{type: string, message: string, severity: string}>>().default([]),
  suggestions: text("suggestions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
});

export const insertSimulationSchema = createInsertSchema(simulations).omit({
  id: true,
  startedAt: true,
});

export const insertMentorSessionSchema = createInsertSchema(mentorSessions).omit({
  id: true,
  createdAt: true,
});

export const insertCvReviewSchema = createInsertSchema(cvReviews).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  subscribedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type Simulation = typeof simulations.$inferSelect;
export type InsertSimulation = z.infer<typeof insertSimulationSchema>;

export type MentorSession = typeof mentorSessions.$inferSelect;
export type InsertMentorSession = z.infer<typeof insertMentorSessionSchema>;

export type CvReview = typeof cvReviews.$inferSelect;
export type InsertCvReview = z.infer<typeof insertCvReviewSchema>;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
