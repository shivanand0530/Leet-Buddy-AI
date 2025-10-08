import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { Brain, Code, Star, ArrowRight, Sparkles, Target, Zap, LogOut } from "lucide-react";

export default function Landing() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/app"); // This will redirect to auth modal via ProtectedRoute
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
             <div className="w-10 h-10 rounded-full bg-gradient-ai flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">CodeFlux AI</span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-white text-sm">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                  <Button 
                    onClick={() => navigate("/app")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    Go to App
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleGetStarted}
                  disabled={loading}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="relative bg-emerald-500 rounded-full p-6">
                <Target className="h-12 w-12 text-slate-900" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Welcome to CodeFlux AI 
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Your intelligent companion for mastering LeetCode problems.
            <br />
            Get hints, explanations, and step-by-step guidance powered by AI.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={handleGetStarted}
            //   disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 rounded-lg shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {user ? "Go to Dashboard" : "Start Learning Now"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
        >
          {/* Feature 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-500/10 rounded-full p-4">
                <Brain className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Hints</h3>
            <p className="text-slate-400">
              Progressive difficulty hints that guide you without giving away the solution
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500/10 rounded-full p-4">
                <Code className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Code Analysis</h3>
            <p className="text-slate-400">
              Understand solutions deeply with detailed explanations and complexity analysis
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-purple-500/10 rounded-full p-4">
                <Star className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Personalized</h3>
            <p className="text-slate-400">
              Adapted to your level with customized learning paths and recommendations
            </p>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-12">Why Choose CodeFlux AI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-xl p-6">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Instant Feedback</h4>
              <p className="text-slate-400 text-sm">Get immediate insights on your approach</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-xl p-6">
              <Target className="h-6 w-6 text-emerald-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Focused Learning</h4>
              <p className="text-slate-400 text-sm">Target your weak areas effectively</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-xl p-6">
              <Brain className="h-6 w-6 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">AI-Powered</h4>
              <p className="text-slate-400 text-sm">Advanced algorithms understand your needs</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-xl p-6">
              <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Track Progress</h4>
              <p className="text-slate-400 text-sm">Monitor your improvement over time</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-400 text-sm">
            <p>© 2025 CodeFlux AI. All rights reserved.
              
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}