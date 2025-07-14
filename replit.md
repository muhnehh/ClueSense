# LILO - AI-Powered Internship Simulator

## Overview

LILO is a full-stack web application that simulates AI-powered internships at top tech companies (FAANG/MAANG). The platform provides students with realistic internship experiences through AI mentors, code analysis, CV reviews, and progress tracking. Built with a modern React frontend and Express backend, the application features real-time interactions through WebSockets and a PostgreSQL database managed with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state, React hooks for local state
- **Build Tool**: Vite for development and production builds
- **Real-time Communication**: WebSocket integration for mentor chat and live features

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Real-time**: WebSocket server for mentor sessions and live interactions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reloading with Vite middleware integration

### Data Storage
- **Primary Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database schema management
- **Session Storage**: PostgreSQL-backed sessions for user authentication

## Key Components

### Database Schema
The application uses six main tables:
- **users**: User authentication and profile data
- **companies**: Available company simulations (Google, Meta, etc.)
- **simulations**: User progress through company internship programs
- **mentorSessions**: AI and human mentor chat histories
- **cvReviews**: CV analysis and feedback storage
- **newsletters**: Email subscription management

### Frontend Components
- **Hero Section**: Landing page with interactive demo
- **Company Simulations**: Grid of available internship programs
- **Code Editor**: Real-time code analysis and testing environment
- **AI Mentor Chat**: WebSocket-powered mentoring interface
- **Progress Dashboard**: Skills assessment and achievement tracking
- **CV Review**: File upload and AI analysis system

### API Endpoints
- **GET /api/companies**: Retrieve available company simulations
- **POST /api/simulations**: Start new internship simulation
- **POST /api/cv-review**: Upload and analyze CVs
- **POST /api/newsletter**: Email subscription management
- **POST /api/skills-assessment**: Evaluate user programming skills
- **WebSocket /ws**: Real-time mentor chat and notifications

## Data Flow

1. **User Onboarding**: Users select company simulations and begin internship programs
2. **Code Analysis**: Real-time code evaluation with AI feedback through WebSocket connections
3. **Mentor Interactions**: AI-powered chat sessions stored in database with message history
4. **Progress Tracking**: Skills assessment data updated as users complete projects
5. **CV Analysis**: Document upload triggers AI review with structured feedback storage

## External Dependencies

### Frontend Libraries
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for temporal operations

### Backend Dependencies
- **Database Driver**: @neondatabase/serverless for PostgreSQL connectivity
- **Validation**: Zod schemas for runtime type checking
- **WebSockets**: ws library for real-time communication
- **Build Tools**: esbuild for production server bundling

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESLint/Prettier**: Code formatting and quality enforcement
- **Drizzle Kit**: Database schema management and migrations
- **Vite**: Development server with HMR and optimized builds

## Deployment Strategy

### Production Build Process
1. **Frontend**: Vite builds React application to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command
4. **Assets**: Static files served from built frontend directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Session secrets**: Secure session management configuration

### Hosting Requirements
- **Node.js**: Runtime environment for Express server
- **PostgreSQL**: Database instance (configured for Neon Database)
- **WebSocket Support**: Real-time communication capabilities
- **Static File Serving**: Frontend asset delivery

The application is designed for seamless deployment on platforms supporting Node.js with PostgreSQL, featuring automatic database migrations and environment-based configuration management.