import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Mail, Clock, Users, CheckCircle, Sparkles, Zap, Target, Brain, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function LaunchingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(2847);
  const [recentJoins, setRecentJoins] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { toast } = useToast();

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Countdown timer to launch date (30 days from now)
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate waitlist count increasing with recent joins notifications
  useEffect(() => {
    const names = ['Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'James', 'Sofia', 'Ryan', 'Maya'];
    const locations = ['SF', 'NYC', 'LA', 'Seattle', 'Boston', 'Austin', 'Chicago', 'Miami', 'Denver', 'Portland'];
    
    const countTimer = setInterval(() => {
      const increase = Math.floor(Math.random() * 3) + 1;
      setWaitlistCount(prev => prev + increase);
      
      // Add recent join notification
      if (Math.random() > 0.3) {
        const name = names[Math.floor(Math.random() * names.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const newJoin = `${name} from ${location} just joined!`;
        
        setRecentJoins(prev => {
          const updated = [newJoin, ...prev.slice(0, 2)];
          return updated;
        });
        
        // Remove notification after 4 seconds
        setTimeout(() => {
          setRecentJoins(prev => prev.filter(join => join !== newJoin));
        }, 4000);
      }
    }, 8000);

    return () => clearInterval(countTimer);
  }, []);

  const handleWaitlistJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/newsletter', { email });
      setIsJoined(true);
      setWaitlistCount(prev => prev + 1);
      toast({
        title: 'Welcome to the waitlist!',
        description: 'You\'ll be the first to know when LILO launches.',
      });
      setEmail('');
    } catch (error) {
      toast({
        title: 'Failed to join waitlist',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-lilo-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold text-white">LILO</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-300 hover:text-lilo-blue transition-colors duration-300 font-medium">
                  View Demo
                </a>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">Launching Soon</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-lilo-blue opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
          </div>

          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
              <div className="w-8 h-8 bg-lilo-blue/20 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-lilo-blue" />
              </div>
            </div>
            <div className="absolute top-40 right-16 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="absolute bottom-32 left-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Logo and branding */}
            <div className="flex items-center justify-center space-x-3 mb-8 animate-fade-in-up">
              <div className="w-12 h-12 bg-lilo-blue rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-3xl font-bold text-white">LILO</span>
            </div>

            {/* Main heading */}
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Launching
                <span className="block text-lilo-blue animate-pulse">Soon</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                AI-powered internship simulations that prepare you for FAANG careers.
                <br />Be the first to experience the future of tech education.
              </p>
            </div>

            {/* Countdown timer */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((unit, index) => (
                <Card key={unit.label} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider">
                      {unit.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Waitlist signup */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-8">
                {!isJoined ? (
                  <>
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <Mail className="w-6 h-6 text-lilo-blue" />
                      <h3 className="text-2xl font-bold text-white">Join the Waitlist</h3>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Get early access, exclusive updates, and be among the first 1,000 users to shape the future of AI education.
                    </p>
                    <form onSubmit={handleWaitlistJoin} className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-white/20 border-white/30 text-white placeholder-gray-400 focus:ring-lilo-blue focus:border-lilo-blue"
                        required
                      />
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-lilo-blue hover:bg-blue-700 text-white px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Joining...</span>
                          </div>
                        ) : (
                          'Join Waitlist'
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center animate-fade-in">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-gray-300">
                      Welcome to the LILO family. We'll notify you the moment we launch.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-lilo-blue mb-2 animate-pulse">
                    {waitlistCount.toLocaleString()}+
                  </div>
                  <div className="text-gray-300">People Waiting</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">4</div>
                  <div className="text-gray-300">FAANG Companies</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
                  <div className="text-gray-300">Powered Mentors</div>
                </CardContent>
              </Card>
            </div>

            {/* Features preview */}
            <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <h3 className="text-2xl font-bold text-white mb-8">What's Coming</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Rocket, title: 'Real Simulations', desc: 'Authentic FAANG internship experiences' },
                  { icon: Users, title: 'AI Mentors', desc: 'Personal guidance from AI specialists' },
                  { icon: Clock, title: 'Live Coding', desc: 'Real-time code analysis and feedback' },
                  { icon: Sparkles, title: 'Career Prep', desc: 'Complete interview preparation' }
                ].map((feature, index) => (
                  <Card key={feature.title} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <feature.icon className="w-12 h-12 text-lilo-blue mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent joins notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {recentJoins.map((join, index) => (
          <div
            key={`${join}-${index}`}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{join}</span>
          </div>
        ))}
      </div>
    </div>
    
    <style>{`
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
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}