import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Play, Bot, Check, Clock } from 'lucide-react';
import { useWebSocket } from '@/hooks/use-websocket';
import type { CodeAnalysis } from '@/lib/types';

interface CodeEditorProps {
  className?: string;
}

export default function CodeEditor({ className }: CodeEditorProps) {
  const [code, setCode] = useState(`class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []
    
    def get(self, key):
        if key in self.cache:
            self.order.remove(key)
            self.order.append(key)
            return self.cache[key]
        return -1
    
    def put(self, key, value):
        # TODO: Implement put method`);
  
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [testResults, setTestResults] = useState({ passed: 3, total: 5 });
  const [isRunning, setIsRunning] = useState(false);

  const { sendMessage } = useWebSocket({
    onMessage: (message) => {
      if (message.type === 'code_analysis_result') {
        setAnalysis(message.data);
        setIsRunning(false);
      }
    }
  });

  const handleRunTests = () => {
    setIsRunning(true);
    // Simulate test run
    setTimeout(() => {
      setTestResults({ passed: Math.floor(Math.random() * 2) + 4, total: 5 });
      setIsRunning(false);
    }, 2000);
  };

  const handleAnalyzeCode = () => {
    sendMessage({
      type: 'code_analysis',
      data: { code }
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <h3 className="font-semibold text-gray-800">Google SWE Internship - Data Structures</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4" />
            <span>45 min remaining</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>AI Mentor Active</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm code-editor">
          <div className="text-gray-400 mb-2"># Problem: Implement a LRU Cache</div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-transparent text-gray-300 resize-none border-none outline-none"
            rows={12}
            style={{ fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace' }}
          />
          
          {analysis && (
            <div className="mt-3 p-2 bg-gray-800 rounded border-l-4 border-blue-500">
              <div className="text-blue-400 text-xs font-semibold mb-1">AI Analysis</div>
              <div className="text-gray-300 text-xs">
                Score: {analysis.score}/100 | Complexity: {analysis.complexity} | Coverage: {analysis.testCoverage}%
              </div>
              {analysis.suggestions.length > 0 && (
                <div className="text-yellow-400 text-xs mt-1">
                  💡 {analysis.suggestions[0]}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button 
              onClick={handleRunTests}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="w-4 h-4 mr-1" />
              {isRunning ? 'Running...' : 'Run Tests'}
            </Button>
            <Button 
              onClick={handleAnalyzeCode}
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              <Bot className="w-4 h-4 mr-1" />
              Ask AI Mentor
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <span className={`${testResults.passed === testResults.total ? 'text-green-600' : 'text-orange-600'} font-semibold`}>
              {testResults.passed}/{testResults.total} tests passing
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
