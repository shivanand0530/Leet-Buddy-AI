import { useState } from "react";
import { ProblemInput } from "@/components/ProblemInput";
import { ProblemDisplay } from "@/components/ProblemDisplay";
import { AIChatSidebar } from "@/components/AIChatSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap, Target, Github, Star } from "lucide-react";

const Index = () => {
  const [currentProblem, setCurrentProblem] = useState(null);

  const handleProblemDetected = (problem: any) => {
    setCurrentProblem(problem);
  };

  const handleRequestHint = () => {
    // This will be handled by the chat sidebar
    console.log("Hint requested for:", currentProblem?.title);
  };

  const handleSendMessage = (message: string) => {
    // Here you would integrate with Gemini API
    console.log("Message to AI:", message);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-ai flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  LeetBuddy AI
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your AI-powered coding mentor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
              <a
                href="https://github.com/shivanand0530/LeetBuddy-AI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="border-border">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Main Content */}
          <div className="col-span-1 space-y-6 overflow-y-auto">
            {!currentProblem ? (
              <div className="space-y-6">
                {/* Welcome Section */}
                <Card className="border-border bg-gradient-glow">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-ai flex items-center justify-center">
                        <Target className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          Welcome to LeetBuddy AI
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Your intelligent companion for mastering LeetCode
                          problems. Get hints, explanations, and step-by-step
                          guidance powered by AI.
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-center gap-4 pt-4">
                        {[
                          {
                            icon: Brain,
                            label: "Smart Hints",
                            desc: "Progressive difficulty hints",
                          },
                          {
                            icon: Code,
                            label: "Code Analysis",
                            desc: "Understand solutions deeply",
                          },
                          {
                            icon: Star,
                            label: "Personalized",
                            desc: "Adapted to your level",
                          },
                        ].map((feature, index) => (
                          <div
                            key={index}
                            className="text-center space-y-2 max-w-32"
                          >
                            <div className="w-12 h-12 mx-auto rounded-lg bg-muted flex items-center justify-center">
                              <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm text-foreground">
                                {feature.label}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {feature.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Problem Input */}
                <ProblemInput onProblemDetected={handleProblemDetected} />

                {/* Instructions */}
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      How to Get Started
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Upload a Problem
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Paste a LeetCode URL or copy the problem description
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Get AI Guidance
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Chat with the AI mentor for hints and explanations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Learn & Improve
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Understand patterns and improve your problem-solving
                            skills
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    ← Back
                  </Button>
                </div>
                <ProblemDisplay
                  problem={currentProblem}
                  onRequestHint={handleRequestHint}
                />
              </>
            )}
          </div>

          {/* AI Chat Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-24 h-[calc(100vh-140px)]">
              <AIChatSidebar
                problem={currentProblem}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full py-4 text-center text-xs text-muted-foreground border-t border-border bg-card/50">
        © Shivanand K 2025
      </footer>
    </div>
  );
};

export default Index;
