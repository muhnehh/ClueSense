import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Monitor, Users, ArrowRight } from 'lucide-react';

export default function ModeToggle() {
  const [selectedMode, setSelectedMode] = useState<'demo' | 'launch' | null>(null);

  if (selectedMode === 'demo') {
    window.location.href = '/';
    return null;
  }

  if (selectedMode === 'launch') {
    window.location.href = '/launching-soon';
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo and branding */}
        <div className="flex items-center justify-center space-x-3 mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-lilo-blue rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <span className="text-4xl font-bold text-white">LILO</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          Choose Your Experience
        </h1>
        <p className="text-xl text-gray-300 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Explore our AI-powered internship simulator in two modes
        </p>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {/* Demo Mode Card */}
          <Card 
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            onClick={() => setSelectedMode('demo')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-lilo-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Demo</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Explore the full LILO platform with working prototypes, AI mentor chat, 
                code editor, and all features in action.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Live AI mentor chat</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Interactive code editor</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Company simulations</span>
                </div>
              </div>
              <Button 
                className="w-full bg-lilo-blue hover:bg-blue-700 text-white group-hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMode('demo');
                }}
              >
                Try Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Launching Soon Card */}
          <Card 
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            onClick={() => setSelectedMode('launch')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Launching Soon</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join our waitlist to be among the first to experience LILO when we officially launch. 
                Get early access and exclusive updates.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span>Early access signup</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span>Live countdown timer</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span>Waitlist notifications</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMode('launch');
                }}
              >
                Join Waitlist
                <Users className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-400 text-sm">
            Built with AI-powered mentorship • Real FAANG company simulations • Live coding environments
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}