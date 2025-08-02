import { Helmet } from "react-helmet-async";
import { useEffect, useState } from 'react';
import HeroSection from '@/components/hero-section-new';
import FeaturesScrollAnimation from '@/components/features-scroll-animation';
import CompanySimulations from '@/components/company-simulations';
import MentorshipSection from '@/components/mentorship-section';
import SkillsAssessment from '@/components/skills-assessment';
import CVReview from '@/components/cv-review';
import PricingSection from '@/components/pricing-section-new';
import Newsletter from '@/components/newsletter';
import { DodoLogo } from '@/components/ui/dodo-logo';
import { DodoButton } from '@/components/ui/dodo-button';
import { AnimatedElement } from '@/components/ui/animated-elements';
import { motion } from 'framer-motion';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // Ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll behavior with improved sensitivity
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      
      // Check if scrolled past initial position
      setIsScrolled(currentScrollY > 50);
      
      // Only react to scroll if the difference is significant enough (reduces sensitivity)
      if (scrollDifference < 5) return;
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Show/hide navbar based on scroll direction with improved logic
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down - hide navbar (increased threshold from 100 to 150)
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar immediately
        setShowNavbar(true);
        
        // Set timeout to keep navbar visible for a while after scrolling up stops
        const timeout = setTimeout(() => {
          // Keep navbar visible - don't hide it automatically
        }, 2000);
        setScrollTimeout(timeout);
      }
      
      // Always show navbar when near the top
      if (currentScrollY < 100) {
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <Helmet>
        <title>DODO - AI-Powered Internship Simulator | Launch Your Data Science Career</title>
        <meta name="description" content="Experience simulated internships at top tech companies with DODO's AI-driven platform. Get mentorship, practice with real projects, and prepare for your dream career." />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="DODO - AI-Powered Internship Simulator" />
        <meta property="og:description" content="Experience simulated internships at top tech companies with AI mentors and real projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dodo.ai" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DODO - AI-Powered Internship Simulator" />
        <meta name="twitter:description" content="Experience simulated internships at top tech companies with AI mentors and real projects." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Floating Navbar - Subtle Cluely Style */}
        <motion.header 
          className="fixed top-0 left-0 right-0 z-50 flex justify-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: showNavbar ? (isScrolled ? 16 : 0) : -100,
            opacity: showNavbar ? 1 : 0
          }}
          transition={{ 
            duration: isScrolled ? 0.3 : 0.5,
            ease: isScrolled ? [0.25, 0.46, 0.45, 0.94] : [0.34, 1.56, 0.64, 1],
            type: isScrolled ? "tween" : "spring",
            damping: isScrolled ? undefined : 20,
            stiffness: isScrolled ? undefined : 300
          }}
        >
          <div className={`transition-all duration-500 ease-out w-full max-w-4xl ${
            isScrolled 
              ? 'bg-white backdrop-blur-lg rounded-full shadow-lg border border-gray-200 px-6 py-3 mx-4' 
              : 'bg-white px-6 py-3'
          }`}>
            <div className="flex items-center justify-between h-10">
              <motion.div 
                className="flex items-center"
                layout
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <DodoLogo size="md" />
              </motion.div>
              
              <motion.nav 
                className="hidden md:flex items-center space-x-6"
                layout
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {[
                  { href: "#features", label: "Features" },
                  { href: "#simulations", label: "Simulations" },
                  { href: "#mentorship", label: "Mentorship" },
                  { href: "#pricing", label: "Pricing" }
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-dodo-dark font-medium transition-colors duration-200 text-sm"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>
              
              <motion.div 
                className="flex items-center space-x-3"
                layout
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.button 
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full font-medium text-sm transition-all duration-200"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
                <motion.button 
                  className="px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-full font-medium text-sm transition-all duration-200"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Up
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main>
          <AnimatedElement animation="fade">
            <HeroSection />
          </AnimatedElement>
          
          <div id="features">
            <FeaturesScrollAnimation />
          </div>
          
          <AnimatedElement animation="slide-up" delay={0.3}>
            <div id="simulations">
              <CompanySimulations />
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={0.4}>
            <div id="mentorship">
              <MentorshipSection />
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={0.5}>
            <SkillsAssessment />
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={0.6}>
            <CVReview />
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={0.7}>
            <div id="pricing">
              <PricingSection />
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-up" delay={0.8}>
            <Newsletter />
          </AnimatedElement>
        </main>

        {/* Footer */}
        <motion.footer 
          className="bg-white py-16 border-t border-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <AnimatedElement animation="fade">
                  <div className="mb-4">
                    <DodoLogo size="lg" />
                  </div>
                  <p className="text-gray-600 mb-6 max-w-md">
                    AI-powered internship simulations that prepare you for your dream tech career.
                  </p>
                  <div className="flex space-x-4">
                    {['twitter', 'linkedin', 'github', 'discord'].map((social, index) => (
                      <motion.a 
                        key={social} 
                        href="#" 
                        className="text-gray-400 hover:text-dodo-dark transition-colors"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="sr-only">{social}</span>
                        <div className="w-6 h-6 bg-gray-400 rounded hover:bg-dodo-dark transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </AnimatedElement>
              </div>
              
              <AnimatedElement animation="slide-up" delay={0.1}>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
                  <ul className="space-y-2 text-gray-600">
                    {['Features', 'Simulations', 'Mentorship', 'Pricing'].map((item) => (
                      <li key={item}>
                        <motion.a 
                          href="#" 
                          className="hover:text-dodo-dark transition-colors"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animation="slide-up" delay={0.2}>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-600">
                    {['About', 'Careers', 'Privacy', 'Terms'].map((item) => (
                      <li key={item}>
                        <motion.a 
                          href="#" 
                          className="hover:text-dodo-dark transition-colors"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            </div>
            
            <motion.div 
              className="border-t border-gray-100 pt-8 mt-8 text-center text-gray-500"
              initial={{ opacity: 99, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p>&copy; 2024 DODO. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </>
  );
}
