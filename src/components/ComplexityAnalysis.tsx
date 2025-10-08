import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Database, Zap } from "lucide-react";

interface ComplexityAnalysisProps {
  approaches?: Array<{
    name: string;
    timeComplexity: string;
    spaceComplexity: string;
    description: string;
  }>;
}

export const ComplexityAnalysis = ({ approaches }: ComplexityAnalysisProps) => {
  if (!approaches || approaches.length === 0) {
    return null;
  }

  const getComplexityColor = (complexity: string) => {
    const normalizedComplexity = complexity.toLowerCase();
    if (normalizedComplexity.includes('o(1)')) return 'bg-green-500/10 text-green-700 border-green-200';
    if (normalizedComplexity.includes('o(log') || normalizedComplexity.includes('o(n log')) return 'bg-blue-500/10 text-blue-700 border-blue-200';
    if (normalizedComplexity.includes('o(n)') && !normalizedComplexity.includes('o(n²)')) return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
    if (normalizedComplexity.includes('o(n²)') || normalizedComplexity.includes('o(n^2)')) return 'bg-orange-500/10 text-orange-700 border-orange-200';
    if (normalizedComplexity.includes('o(2^n)') || normalizedComplexity.includes('o(n!)')) return 'bg-red-500/10 text-red-700 border-red-200';
    return 'bg-gray-500/10 text-gray-700 border-gray-200';
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Zap className="h-5 w-5 text-primary" />
          Complexity Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {approaches.map((approach, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-foreground">{approach.name}</h4>
              <div className="flex gap-2">
                <Badge 
                  variant="outline" 
                  className={`flex items-center gap-1 ${getComplexityColor(approach.timeComplexity)}`}
                >
                  <Clock className="h-3 w-3" />
                  {approach.timeComplexity}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`flex items-center gap-1 ${getComplexityColor(approach.spaceComplexity)}`}
                >
                  <Database className="h-3 w-3" />
                  {approach.spaceComplexity}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {approach.description}
            </p>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <h5 className="text-sm font-medium text-foreground mb-2">Complexity Guide:</h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500/20 border border-green-200"></div>
              <span className="text-muted-foreground">Excellent: O(1), O(log n)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-200"></div>
              <span className="text-muted-foreground">Good: O(n)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500/20 border border-orange-200"></div>
              <span className="text-muted-foreground">Acceptable: O(n²)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500/20 border border-red-200"></div>
              <span className="text-muted-foreground">Poor: O(2^n), O(n!)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};