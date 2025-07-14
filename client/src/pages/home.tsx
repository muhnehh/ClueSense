import { Helmet } from "react-helmet-async";
import HeroSection from '@/components/hero-section';
import FeaturesBento from '@/components/features-bento';
import CompanySimulations from '@/components/company-simulations';
import MentorshipSection from '@/components/mentorship-section';
import SkillsAssessment from '@/components/skills-assessment';
import CVReview from '@/components/cv-review';
import PricingSection from '@/components/pricing-section';
import Newsletter from '@/components/newsletter';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>LILO - AI-Powered Internship Simulator | Launch Your Data Science Career</title>
        <meta name="description" content="Experience simulated internships at top tech companies with LILO's AI-driven platform. Get mentorship, practice with real projects, and prepare for your dream career." />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="LILO - AI-Powered Internship Simulator" />
        <meta property="og:description" content="Experience simulated internships at top tech companies with AI mentors and real projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilo.ai" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LILO - AI-Powered Internship Simulator" />
        <meta name="twitter:description" content="Experience simulated internships at top tech companies with AI mentors and real projects." />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-lilo-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold text-lilo-black">LILO</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-lilo-blue transition-colors duration-300">
                  Features
                </a>
                <a href="#simulations" className="text-gray-600 hover:text-lilo-blue transition-colors duration-300">
                  Simulations
                </a>
                <a href="#mentorship" className="text-gray-600 hover:text-lilo-blue transition-colors duration-300">
                  Mentorship
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-lilo-blue transition-colors duration-300">
                  Pricing
                </a>
              </nav>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-lilo-blue transition-colors duration-300">
                  Log in
                </button>
                <button className="bg-lilo-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <HeroSection />
          <div id="features">
            <FeaturesBento />
          </div>
          <div id="simulations">
            <CompanySimulations />
          </div>
          <div id="mentorship">
            <MentorshipSection />
          </div>
          <SkillsAssessment />
          <CVReview />
          <div id="pricing">
            <PricingSection />
          </div>
          <Newsletter />
        </main>

        {/* Footer */}
        <footer className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-lilo-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <span className="text-xl font-bold text-lilo-black">LILO</span>
                </div>
                <p className="text-gray-600 mb-6 max-w-md">
                  AI-powered internship simulations that prepare you for your dream tech career.
                </p>
                <div className="flex space-x-4">
                  {['twitter', 'linkedin', 'github', 'discord'].map((social) => (
                    <a key={social} href="#" className="text-gray-400 hover:text-lilo-blue transition-colors">
                      <span className="sr-only">{social}</span>
                      <div className="w-6 h-6 bg-gray-400 rounded" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">Simulations</a></li>
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">Mentorship</a></li>
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-lilo-blue transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500">
              <p>&copy; 2024 LILO. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
