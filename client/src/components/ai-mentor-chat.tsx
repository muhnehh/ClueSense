import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bot, Send, User } from 'lucide-react';
import { useWebSocket } from '@/hooks/use-websocket';
import type { MentorMessage } from '@/lib/types';

interface AIMentorChatProps {
  className?: string;
}

export default function AIMentorChat({ className }: AIMentorChatProps) {
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      role: 'ai',
      content: "Great start! Your basic structure looks good. For the LRU Cache, consider the time complexity of your current approach.",
      timestamp: new Date(Date.now() - 300000).toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(Math.random().toString(36).substr(2, 9));

  const { isConnected, sendMessage } = useWebSocket({
    onMessage: (message) => {
      if (message.type === 'mentor_response') {
        setMessages(prev => [...prev, message.data]);
        setIsTyping(false);
      }
    },
    onConnect: () => {
      sendMessage({
        type: 'join_mentor_session',
        data: { sessionId: sessionId.current }
      });
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isConnected) return;

    const userMessage: MentorMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    sendMessage({
      type: 'mentor_message',
      data: { content: inputMessage, sessionId: sessionId.current }
    });

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">AI Mentor</h4>
            <p className="text-xs text-gray-500">Google SWE Specialist</p>
          </div>
          {isConnected && (
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Online</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'ai' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {message.role === 'ai' ? (
                  <Bot className="w-3 h-3 text-blue-600" />
                ) : (
                  <User className="w-3 h-3 text-gray-600" />
                )}
              </div>
              <div className={`p-3 rounded-lg max-w-[80%] ${
                message.role === 'ai'
                  ? 'bg-white shadow-sm border'
                  : 'bg-blue-500 text-white'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="w-3 h-3 text-blue-600" />
              </div>
              <div className="bg-white shadow-sm border p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your mentor..."
            className="flex-1 text-sm"
            disabled={!isConnected}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || !isConnected}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
