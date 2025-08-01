import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bot, User, Send, Lightbulb, Code, Zap, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { askGemini } from "@/utils/geminiAPIcall";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";


interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'hint' | 'explanation' | 'code' | 'general';
}

interface AIChatSidebarProps {
  problem?: any;
  onSendMessage?: (message: string) => void;
}

export const AIChatSidebar = ({ problem, onSendMessage }: AIChatSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI LeetCode mentor. Upload a problem and I'll help you with hints, explanations, and step-by-step guidance! 🚀",
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "Get Hint", icon: Lightbulb, category: 'hint' as const },
    { label: "Explain Approach", icon: MessageSquare, category: 'explanation' as const },
    { label: "Show Code", icon: Code, category: 'code' as const },
  ];

  const [language, setLanguage] = useState("en");
  const [error, setError] = useState<string | null>(null);
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    // Add more as needed
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string, category?: Message['category']) => {
    if (!content.trim()) return;
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      category
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    onSendMessage?.(content);

    // Compose prompt for Gemini
    let prompt = content;
    if (problem) {
      prompt = `Problem: ${problem.title}\n${problem.description}\n\nUser: ${content}`;
      if (category === "hint") prompt = `Give me a very simple and beginner-friendly hint for this problem. Use plain language and avoid technical jargon. Keep it short and easy to follow.\n\n${prompt}`;
      if (category === "explanation") prompt = `Explain the approach to solve this problem in a simple way for a beginner. Use step-by-step instructions and plain language. Avoid advanced terms and keep it easy to understand.\n\n${prompt}`;
      if (category === "code")  prompt = `Show a simple code solution for this problem that a beginner can understand. Explain each step in plain language and also give optimal code with simple explaination \n\n${prompt}`;
    }

    try {
      const aiResponse = await askGemini(prompt, language);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        category
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setError("Failed to get response from Gemini.");
    } finally {
      setIsTyping(false);
    }
  };

  
  // const generateAIResponse = (userInput: string, category?: Message['category'], currentProblem?: any): string => {
  //   if (!currentProblem) {
  //     return "Please upload a LeetCode problem first so I can provide specific help! You can paste a URL or problem description above.";
  //   }

  //   switch (category) {
  //     case 'hint':
  //       return `💡 **Hint for ${currentProblem.title}:**\n\nStart by thinking about the brute force approach first. For the Two Sum problem:\n\n1. What if you check every pair of numbers?\n2. Can you think of a way to avoid checking all pairs?\n3. What data structure could help you remember numbers you've seen?\n\nTry to implement the brute force solution first, then we can optimize it! 🎯`;
      
  //     case 'explanation':
  //       return `📚 **Approach Explanation for ${currentProblem.title}:**\n\n**Method 1: Brute Force (O(n²))**\n- Check every pair of indices\n- Simple but slow for large inputs\n\n**Method 2: Hash Map (O(n))**\n- Use a hash map to store numbers and their indices\n- For each number, check if (target - number) exists\n- Much faster and more efficient!\n\nWhich approach would you like to explore first? 🤔`;
      
  //     case 'code':
  //       return `💻 **Code Template for ${currentProblem.title}:**\n\n\`\`\`python\ndef twoSum(nums, target):\n    # Hash map approach\n    num_map = {}\n    \n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    \n    return []\n\`\`\`\n\nTry to understand each line! Can you trace through an example? 🔍`;
      
  //     default:
  //       const responses = [
  //         `Great question about ${currentProblem.title}! Let me help you understand this better. What specific part would you like me to explain?`,
  //         `I see you're working on ${currentProblem.title}. This is a classic problem that teaches important concepts. What's your current approach?`,
  //         `For ${currentProblem.title}, there are multiple ways to solve it. Would you like to start with the simpler approach or jump to the optimal solution?`
  //       ];
  //       return responses[Math.floor(Math.random() * responses.length)];
  //   }
  // };

  const getCategoryIcon = (category?: Message['category']) => {
    switch (category) {
      case 'hint': return <Lightbulb className="h-3 w-3" />;
      case 'explanation': return <MessageSquare className="h-3 w-3" />;
      case 'code': return <Code className="h-3 w-3" />;
      default: return <Zap className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category?: Message['category']) => {
    switch (category) {
      case 'hint': return 'bg-ai-warning/20 text-ai-warning';
      case 'explanation': return 'bg-ai-info/20 text-ai-info';
      case 'code': return 'bg-ai-success/20 text-ai-success';
      default: return 'bg-primary/20 text-primary';
    }
  };

  return (
   <Card className="h-full flex flex-col border-border bg-card shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="h-5 w-5 text-primary animate-pulse-ai" />
          AI Mentor
        </CardTitle>
        
          {/* {problem && (
            <Badge variant="secondary" className="w-fit text-xs">
              Helping with: {problem.title}
            </Badge>
          )} */}
       
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Quick Actions */}
        {problem && (
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  size="sm"
                  variant="outline"
                  onClick={() => sendMessage(action.label, action.category)}
                  className="text-xs border-border hover:bg-muted"
                  disabled={isTyping}
                >
                  <action.icon className="h-3 w-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Separator className="bg-border" />

        {/* Messages */}
       <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 px-4 py-3 max-h-[60vh] overflow-y-auto"
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn(
                "flex gap-3",
                message.type === 'user' ? "justify-end" : "justify-start"
              )}>
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                
                <div className={cn(
                  "max-w-[80%] rounded-lg p-3 break-words",
                  message.type === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-foreground"
                )}>
                  {message.category && message.type === 'ai' && (
                    <div className="flex items-center gap-1 mb-2">
                      <Badge className={cn("text-xs", getCategoryColor(message.category))}>
                        {getCategoryIcon(message.category)}
                        <span className="ml-1 capitalize">{message.category}</span>
                      </Badge>
                    </div>
                  )}
                  
                 <div className="whitespace-pre-wrap text-sm leading-relaxed">
  <ReactMarkdown
    components={{
      code({node, className, children, ...props}: any) {
        const inline = props.inline;
        const match = /language-(\w+)/.exec(className || "");
        return !inline ? (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match ? match[1] : ""}
            PreTag="div"
            customStyle={{
              borderRadius: "0.5rem",
              fontSize: "0.95em",
              margin: "0.5em 0",
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
    }}
  >
    {message.content}
  </ReactMarkdown>
</div>
                  
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted text-foreground rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-xs">{error}</div>
            )}

          </div>
        </ScrollArea>

        <Separator className="bg-border" />

        {/* Message Input */}
       {/* Message Input */}
        <div className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder={`Ask me anything about this problem...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(inputMessage)}
              className="bg-input border-border"
              disabled={isTyping}
            />
            <Button 
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
              className="bg-primary hover:bg-primary-glow text-primary-foreground"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};