# App Screenshots

<img width="240" height="240" alt="Image" src="https://github.com/user-attachments/assets/ff2e78a5-bc53-4491-9f37-d801c73a4b43" />
<img width="240" height="240" alt="Image" src="https://github.com/user-attachments/assets/b89fa8b6-0e70-4c04-95ec-b32f9573b650" />



# CodeFlux-AI

An intelligent LeetCode problem-solving assistant powered by AI to help developers practice algorithmic problem-solving with personalized guidance and complexity analysis.

## Overview

CodeFlux-AI is a React-based web application that serves as your personal coding interview preparation companion. It leverages Google's Gemini AI to provide intelligent analysis of coding problems, solution approaches, and complexity breakdowns to accelerate your learning process.

## Features

- **Problem Input Flexibility**: Submit problems via URL or direct text input
- **AI-Powered Analysis**: Get detailed problem breakdowns and solution strategies using Google Gemini AI
- **Complexity Analysis**: Understand time and space complexity for different approaches
- **Interactive Chat Interface**: Engage in conversations about problem-solving techniques
- **Secure Authentication**: User authentication system powered by Supabase
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Protected Routes**: Secure user sessions and personalized experiences

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

### Backend Services
- **Supabase** - Authentication and database
- **Google Gemini AI** - AI-powered problem analysis
- **Axios** - HTTP client for API requests

### Development Tools
- **ESLint** - Code linting and quality checks
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Bun package manager
- Supabase account
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shivanand0530/CodeFlux-AI
cd CodeFlux-AI
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

4. Start the development server:
```bash
bun run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
bun run build
```

### Deployment

The project is configured for GitHub Pages deployment:

```bash
bun run deploy
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # UI component library (Radix UI based)
│   ├── AIChatSidebar.tsx
│   ├── AuthModal.tsx
│   ├── ComplexityAnalysis.tsx
│   ├── ProblemDisplay.tsx
│   ├── ProblemInput.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React context providers
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
├── lib/               # Library configurations
│   ├── supabase.ts    # Supabase client setup
│   └── utils.ts       # Utility functions
├── pages/             # Application pages
│   ├── Index.tsx      # Main application page
│   ├── Landing.tsx    # Landing page
│   └── NotFound.tsx   # 404 error page
└── utils/             # Utility modules
    └── geminiAPIcall.tsx # Google Gemini AI integration
```

