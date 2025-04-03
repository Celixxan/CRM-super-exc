# Enterprise CRM System

A comprehensive Customer Relationship Management system built with modern technologies and best practices.

## Technology Stack

### Frontend
- React with Next.js
- Redux Toolkit for state management
- Material-UI components
- Tailwind CSS for styling
- D3.js and Recharts for data visualization

### Backend
- Node.js/Express.js
- GraphQL with Apollo
- WebSocket support
- Bull for job queues

### Databases
- PostgreSQL for relational data
- MongoDB for unstructured data
- Redis for caching

### Infrastructure
- Docker and Kubernetes
- CI/CD with GitHub Actions
- Multi-cloud support

## Deployment

### Vercel Deployment

This project is configured for seamless deployment on Vercel:

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and sign in with your GitHub account
3. Click "New Project" and select your repository
4. Vercel will automatically detect the Next.js configuration
5. Click "Deploy" and your CRM will be live in minutes

Vercel will automatically handle the build process using the settings in `vercel.json` and `next.config.ts`.

## Getting Started

### Prerequisites
- Node.js >= 18
- Docker and Docker Compose
- PostgreSQL >= 14
- MongoDB >= 6
- Redis >= 7

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crm-system.git
cd crm-system
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Copy example env files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

4. Start development servers:
```bash
# Start all services using Docker Compose
docker-compose up -d

# Or start services individually:
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## Project Structure

```
├── frontend/                # Next.js frontend application
├── backend/                 # Node.js backend services
├── services/               # Microservices
├── database/              # Database migrations and schemas
├── kubernetes/            # Kubernetes configuration files
└── docker/                # Docker configuration files
```

## Features

- Customer Management
- Sales Pipeline
- Marketing Automation
- Service Desk
- Analytics & Reporting
- AI-powered insights
- Workflow Automation
- Mobile Support

## License

MIT License - see LICENSE file for details
