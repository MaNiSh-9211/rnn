# replit.md

## Overview

This is a full-stack web application built with React on the frontend and Express.js on the backend for the BAJAJ FINSERV assignment. The application implements a BFHL (Backend for Frontend - Hackathon Live) API that processes data arrays and categorizes them into numbers, alphabets, and special characters. Developed by Abhinav Rana (Student ID: 2211981008). The project uses TypeScript throughout, follows a monorepo structure with shared schemas, and is completely stateless (no database required).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Storage**: Stateless API (no database required)
- **API Design**: RESTful API with structured error handling
- **Purpose**: BAJAJ FINSERV Assignment - BFHL data processing API

### Development Setup
- **Package Manager**: npm with lockfile version 3
- **TypeScript**: Strict mode enabled with path mapping
- **Development Server**: tsx for TypeScript execution
- **Build Process**: Vite for frontend, esbuild for backend bundling

## Key Components

### Data Processing Layer
- **Schema**: Centralized in `shared/schema.ts` with Zod validation for API requests/responses
- **Processing**: Stateless data categorization and transformation
- **Assignment Details**: BAJAJ FINSERV BFHL API by Abhinav Rana (2211981008)

### API Endpoints
- **BFHL Endpoint**: `POST /api/bfhl` - Main data processing endpoint that:
  - Accepts an array of mixed data (numbers, letters, special characters)
  - Categorizes data into odd numbers, even numbers, alphabets, and special characters
  - Returns processed results with metadata

### Frontend Components
- **UI Components**: Full shadcn/ui component library implementation
- **Pages**: Home page with API testing interface, 404 error page
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Responsive**: Mobile-first design with responsive breakpoints

### Shared Resources
- **Schema Validation**: Zod schemas shared between frontend and backend
- **Type Safety**: TypeScript interfaces generated from Zod schemas
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)

## Data Flow

1. **User Input**: User enters JSON data in the frontend textarea
2. **Validation**: Client-side validation using shared Zod schemas
3. **API Request**: TanStack Query sends POST request to `/api/bfhl`
4. **Backend Processing**: Express.js processes data, categorizes elements
5. **Response**: Structured response with categorized data and metadata
6. **UI Update**: React components update with results and response time metrics

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Data Fetching**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Hookform resolvers
- **Utilities**: clsx, date-fns, embla-carousel-react

### Backend Dependencies
- **Validation**: Zod for runtime type checking and validation
- **Development**: tsx for TypeScript execution, nodemon-like functionality
- **Note**: No database dependencies - stateless API design for BAJAJ FINSERV assignment

### Development Tools
- **Build Tools**: Vite, esbuild for optimized bundling
- **TypeScript**: Full TypeScript support with strict configuration
- **Replit Integration**: Special Replit plugins for development environment

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express.js server to `dist/index.js`
- **Static Assets**: Frontend assets served by Express in production

### Environment Configuration
- **Development**: Uses tsx for hot reloading, Vite dev server
- **Production**: Single Express server serves both API and static files
- **Stateless**: No environment variables required - pure data processing API

### Scripts
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run check`: TypeScript type checking


The application is designed to run on Replit with special development features and can be deployed to any Node.js hosting platform. No database required - pure stateless API for BAJAJ FINSERV assignment.