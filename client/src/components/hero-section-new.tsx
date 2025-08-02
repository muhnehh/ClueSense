import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { AnimatedElement } from '@/components/ui/animated-elements';
import CodeEditor from './code-editor';
import AIMentorChat from './ai-mentor-chat';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    "AI internships before you even apply.",
    "You know what's worse? An unpaid draining internship.",
    "Skip the coffee runs. Get real experience.",
    "Practice at FAANG companies without the rejection.",
    "Master data science before your first interview.",
    "Turn simulation experience into your dream job."
  ];
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedText === currentPhrase) {
      // Pause before starting to delete
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      // Move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      // Type or delete characters
      const speed = isDeleting ? 30 : 80;
      timeout = setTimeout(() => {
        setTypedText(current => {
          if (isDeleting) {
            return current.slice(0, -1);
          } else {
            return currentPhrase.slice(0, current.length + 1);
          }
        });
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <section className="relative min-h-screen pt-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Main Headline */}
          <AnimatedElement animation="fade">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dodo-dark mb-6 max-w-4xl mx-auto min-h-[120px] flex items-center justify-center leading-tight tracking-tight">
              <span>{typedText}</span>
              <motion.span
                className="inline-block w-1 h-16 bg-dodo-dark ml-2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </h1>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={0.2}>
            <p className="text-lg md:text-xl font-normal text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-dodo-dark">DODO</span> simulates real internships at FAANG companies with AI mentors, mock data, and everything you need to launch your career.
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="scale" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <motion.button 
                className="dodo-button-primary flex items-center space-x-2"
                onClick={() => window.location.href = '/launching-soon'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button 
                className="dodo-button-secondary flex items-center space-x-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </motion.button>
            </div>
          </AnimatedElement>
        </div>

        {/* Demo Panel - Clean and Minimal */}
        <AnimatedElement animation="scale" delay={0.6}>
          <motion.div 
            className="max-w-5xl mx-auto"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="dodo-card border border-gray-200 overflow-hidden">
              {/* Window Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">DODO Internship Simulator</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-500">AI Active</span>
                </div>
              </div>

              {/* Demo Content */}
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 min-h-[400px]">
                <div className="lg:col-span-2">
                  <CodeEditor className="border-none shadow-none" />
                </div>
                <div>
                  <AIMentorChat className="border-none shadow-none bg-gray-50" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedElement>

        {/* Simple scroll indicator */}
        <AnimatedElement animation="fade" delay={0.8}>
          <motion.div 
            className="flex flex-col items-center mt-16 text-gray-400"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-px h-8 bg-gray-300" />
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  );
}
