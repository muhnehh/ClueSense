import { Button } from '@/components/ui/button';
import { Play, Video } from 'lucide-react';
import CodeEditor from './code-editor';
import AIMentorChat from './ai-mentor-chat';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 lilo-gradient-bg" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-lilo-black mb-6 leading-tight">
            AI internships before<br />
            <span className="text-lilo-blue">you even apply.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
            LILO simulates real internships at FAANG companies with AI mentors,<br />
            mock data, and everything you need to launch your career.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-lilo-black hover:bg-gray-800 text-white px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2" />
              Start Simulation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-lilo-blue text-lilo-blue hover:bg-lilo-blue hover:text-white px-8 py-4 text-lg"
            >
              <Video className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Interactive Demo Panel */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-sm font-medium text-gray-600">LILO Internship Simulator</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>AI Mentor Active</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              <CodeEditor className="lg:col-span-2 border-none shadow-none" />
              <AIMentorChat className="border-none shadow-none bg-gray-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
