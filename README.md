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

## Usage

### For Users

1. **Sign Up/Login**: Create an account or login to access the full features
2. **Submit Problems**: 
   - Paste a LeetCode problem URL for automatic parsing
   - Or directly input problem text for manual analysis
3. **Get AI Analysis**: Receive detailed breakdowns including:
   - Problem understanding and constraints
   - Multiple solution approaches
   - Time and space complexity analysis
   - Implementation tips and best practices
4. **Interactive Chat**: Ask follow-up questions about the problem or solution approaches

### For Developers

The application follows React best practices with:
- Functional components and hooks
- TypeScript for type safety
- Context API for state management
- Protected routing for authentication
- Modular component architecture

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Setup

### Required API Keys

- **Supabase**: For user authentication and data storage
- **Google Gemini AI**: For problem analysis and chat functionality

### Development Environment

- Recommended IDE: VS Code with TypeScript and React extensions
- Node.js version: 16+ (with Bun package manager)
- Git for version control

## License

This project is private and not licensed for public use.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Google Gemini AI for intelligent problem analysis
- Supabase for backend infrastructure
- Radix UI for accessible component primitives
- Tailwind CSS for rapid UI development
- The open-source community for the amazing tools and libraries
