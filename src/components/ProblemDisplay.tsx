import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Target, Tag, Lightbulb } from "lucide-react";

interface ProblemDisplayProps {
  problem: any;
  onRequestHint: () => void;
}

export const ProblemDisplay = ({ problem, onRequestHint }: ProblemDisplayProps) => {
  if (!problem) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-ai-success text-primary-foreground';
      case 'medium': return 'bg-ai-warning text-accent-foreground';
      case 'hard': return 'bg-ai-error text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="border-border bg-card shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            {problem.title}
          </CardTitle>
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Problem Description */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Problem Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {problem.description}
          </p>
        </div>

        <Separator className="bg-border" />

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Examples
            </h3>
            {problem.examples.map((example: any, index: number) => (
              <div key={index} className="bg-code-bg p-4 rounded-lg border border-code-border">
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-ai-info">Input:</span> 
                    <span className="text-foreground ml-2">{example.input}</span>
                  </div>
                  <div>
                    <span className="text-ai-success">Output:</span> 
                    <span className="text-foreground ml-2">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="text-muted-foreground text-xs pt-1">
                      <span className="text-ai-warning">Explanation:</span> {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Separator className="bg-border" />

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Constraints</h3>
            <ul className="space-y-1">
              {problem.constraints.map((constraint: string, index: number) => (
                <li key={index} className="text-muted-foreground text-sm font-mono">
                  • {constraint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="bg-border" />

        {/* AI Hint Button */}
        <Button
          onClick={onRequestHint}
          className="w-full bg-gradient-ai hover:shadow-ai text-primary-foreground transition-all duration-300"
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          Get AI Hint
        </Button>
      </CardContent>
    </Card>
  );
};