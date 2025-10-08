import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link, Upload, Zap } from "lucide-react";
import axios from "axios";
import { askGemini } from "@/utils/geminiAPIcall";
import { log } from "console";


interface ProblemInputProps {
  onProblemDetected: (problem: any) => void;
}

export const ProblemInput = ({ onProblemDetected }: ProblemInputProps) => {
  const [problemUrl, setProblemUrl] = useState("");
  const [problemText, setProblemText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeProblem = async (input: string, type: 'url' | 'text') => {
    setIsAnalyzing(true);
    
    // Simulate problem analysis
    // setTimeout(() => {
    //   const mockProblem = {
    //     title: "Two Sum",
    //     difficulty: "Easy",
    //     description: input || "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    //     examples: [
    //       {
    //         input: "nums = [2,7,11,15], target = 9",
    //         output: "[0,1]",
    //         explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    //       }
    //     ],
    //     constraints: [
    //       "2 ≤ nums.length ≤ 10⁴",
    //       "-10⁹ ≤ nums[i] ≤ 10⁹",
    //       "-10⁹ ≤ target ≤ 10⁹",
    //       "Only one valid answer exists."
    //     ],
    //     tags: ["Array", "Hash Table"]
    //   };
      
    //   onProblemDetected(mockProblem);
    //   setIsAnalyzing(false);
    // }, 1500);

   
    try {
    const prompt =
      type === "url"
        ? `Given the following LeetCode problem link: ${input}, extract and return the problem as a JSON object with the following fields: title, difficulty, description, examples (array of {input, output, explanation}), constraints (array), tags (array), and suggestedApproaches (array of {name, timeComplexity, spaceComplexity, description}). For each example, keep the explanation short and simple, using plain language. For suggestedApproaches, include 2-3 common algorithmic approaches with their Big O complexity analysis. Respond ONLY with the JSON object.`
    : `Given the following LeetCode problem text: ${input}, extract and return the problem as a JSON object with the following fields: title, difficulty, description, examples (array of {input, output, explanation}), constraints (array), tags (array), and suggestedApproaches (array of {name, timeComplexity, spaceComplexity, description}). For each example, keep the explanation short and simple, using plain language. For suggestedApproaches, include 2-3 common algorithmic approaches with their Big O complexity analysis. Respond ONLY with the JSON object.`;
    const geminiResponse = await askGemini(prompt, "en");
    console.log("Gemini Response:", geminiResponse);

    // Try to parse the JSON from Gemini's response
    let problemData = null;
try {
  // Remove code block markers if present
  let cleaned = geminiResponse.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/```[a-z]*\n?/gi, "").replace(/```$/, "").trim();
  }
  problemData = JSON.parse(cleaned);
} catch (e) {
  throw new Error("Gemini did not return valid JSON.");
}

    onProblemDetected(problemData);
  } catch (error) {
    alert("Could not analyze problem. Please try again.");
    console.error("Error analyzing problem:", error);
  } finally {
    setIsAnalyzing(false);
  }
  };

  return (
    <Card className="border-border bg-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Zap className="h-5 w-5 text-primary" />
          Problem Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              URL
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Text
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                LeetCode Problem URL
              </label>
              <Input
                placeholder="https://leetcode.com/problems/two-sum/"
                value={problemUrl}
                onChange={(e) => setProblemUrl(e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <Button 
              onClick={() => analyzeProblem(problemUrl, 'url')}
              disabled={!problemUrl || isAnalyzing}
              className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
            >
              {isAnalyzing ? "Analyzing..." : "Detect Problem"}
            </Button>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Paste Problem Description
              </label>
              <Textarea
                placeholder="Paste the complete problem description here..."
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                className="min-h-32 bg-input border-border resize-none"
              />
            </div>
            <Button 
              onClick={() => analyzeProblem(problemText, 'text')}
              disabled={!problemText || isAnalyzing}
              className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Problem"}
            </Button>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> Paste a LeetCode URL or problem text to get AI-powered hints and solutions!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};