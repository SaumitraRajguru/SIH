# Overview

CareerGuide is a full-stack web application designed to provide career guidance for Class 10 and 12 students in India. The platform features an AI-powered chatbot, personalized career roadmaps, interest assessment quizzes, and comprehensive career exploration tools. Built as a 2-day MVP for the Smart India Hackathon, it aims to democratize career counseling by making quality guidance accessible to all students.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with custom auth management and TanStack Query for server state
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible, consistent design
- **Styling**: Tailwind CSS with custom dark theme, featuring glassmorphism effects and neon gradients
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Session-based auth with bcrypt password hashing
- **Storage**: In-memory storage for development (designed to be easily swapped for PostgreSQL)
- **API Design**: RESTful endpoints with Zod schema validation

## Data Storage Solutions
- **Development**: In-memory storage using Map data structures
- **Production Ready**: PostgreSQL database with Drizzle migrations
- **Session Management**: Server-side session storage with configurable expiration
- **Schema**: User profiles (email, name, age, standard), sessions, and verification codes

## Authentication and Authorization
- **Registration Flow**: Two-step email verification process with mock email service
- **Password Security**: bcrypt hashing with salt rounds for secure password storage
- **Session Management**: Token-based sessions with automatic cleanup
- **Client-side Auth**: LocalStorage persistence with automatic token refresh
- **Route Protection**: Higher-order components for authenticated route access

## External Dependencies
- **UI Components**: Comprehensive Radix UI ecosystem for accessible components
- **Database**: Neon serverless PostgreSQL for production deployment
- **Validation**: Zod for runtime type checking and API validation
- **Development**: Replit-specific plugins for development environment integration
- **Fonts**: Google Fonts integration for typography consistency

The architecture prioritizes rapid development while maintaining production-ready patterns, allowing for easy scaling and deployment to various platforms.