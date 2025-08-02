import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Brain, Code, Briefcase } from 'lucide-react';
import { DodoButton } from './ui/dodo-button';

export default function HeroSection() {
  const features = [
    { icon: Brain, label: 'AI-Powered Learning' },
    { icon: Code, label: 'Code Practice' },
    { icon: Target, label: 'Skill Assessment' },
    { icon: Briefcase, label: 'Career Prep' }
  ];

  // Smooth desktop-like animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <motion.div 
        className="container mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
        >
          Turn simulation experience
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          DODO simulates real internships at FAANG companies with AI mentors, mock data, and everything you need to launch your career.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <DodoButton 
            variant="primary" 
            size="lg" 
            icon="arrow"
            className="text-white"
          >
            Join Waitlist
          </DodoButton>
          <DodoButton 
            variant="secondary" 
            size="lg"
          >
            Watch Demo
          </DodoButton>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                transition: { 
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: '#dbeafe',
                  transition: { duration: 0.3 }
                }}
              >
                <feature.icon className="w-6 h-6 text-blue-600" />
              </motion.div>
              <span className="text-sm font-medium text-gray-700">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: '10K+', label: 'Active Learners' },
            { number: '95%', label: 'Success Rate' },
            { number: '500+', label: 'Skills Covered' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 1.2 + index * 0.15,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 1.4 + index * 0.15,
                  duration: 0.6
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 1.8,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.1,
            borderColor: '#3b82f6',
            transition: { duration: 0.3 }
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ 
              height: [12, 8, 12],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
