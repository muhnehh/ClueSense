import { motion } from 'framer-motion';
import { DodoButton } from '@/components/ui/dodo-button';
import { AnimatedElement, StaggeredContainer } from '@/components/ui/animated-elements';
import { Check, Star, Zap, Crown, Building, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for getting started',
      icon: Zap,
      color: 'dodo-green',
      features: [
        '1 company simulation',
        'Basic AI mentorship',
        'Progress tracking',
        'CV review (basic)',
        'Community access'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'secondary' as const,
      popular: false
    },
    {
      name: 'Professional',
      price: isAnnual ? '$39' : '$49',
      period: 'per month',
      description: 'Most popular choice',
      icon: Crown,
      color: 'dodo-blue',
      features: [
        'All company simulations',
        'Advanced AI mentorship',
        'Human mentor access',
        'Mock interviews',
        'Detailed CV analysis',
        'Priority support',
        'Career roadmap'
      ],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'gradient' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For institutions',
      icon: Building,
      color: 'dodo-purple',
      features: [
        'Unlimited simulations',
        'Custom company programs',
        'Dedicated mentors',
        'Analytics dashboard',
        'API access',
        'White-label solution',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'electric' as const,
      popular: false
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 dodo-gradient-bg opacity-50" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              borderRadius: '50%',
              background: `var(--dodo-${['blue', 'purple', 'electric', 'pink', 'orange'][Math.floor(Math.random() * 5)]})`,
              opacity: 0.1,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggeredContainer staggerDelay={0.2}>
          <AnimatedElement animation="slide-up">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-dodo-dark mb-6"
                style={{
                  background: 'linear-gradient(45deg, var(--dodo-blue), var(--dodo-purple))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Flexible pricing for every journey
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Start free and upgrade as you progress through your internship simulations.
              </p>
              
              {/* Annual/Monthly Toggle */}
              <motion.div 
                className="flex items-center justify-center space-x-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className={`font-medium ${!isAnnual ? 'text-dodo-blue' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <motion.button
                  className="relative w-14 h-8 rounded-full bg-gray-200 p-1 transition-colors duration-300"
                  style={{
                    backgroundColor: isAnnual ? 'var(--dodo-blue)' : '#e5e7eb'
                  }}
                  onClick={() => setIsAnnual(!isAnnual)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-white shadow-md"
                    animate={{
                      x: isAnnual ? 24 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${isAnnual ? 'text-dodo-blue' : 'text-gray-500'}`}>
                    Annual
                  </span>
                  <motion.span 
                    className="bg-dodo-green text-white text-xs px-2 py-1 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    Save 20%
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <AnimatedElement 
                  key={index} 
                  animation="scale" 
                  delay={index * 0.2}
                  className={plan.popular ? 'md:scale-105' : ''}
                >
                  <motion.div
                    className={`relative rounded-3xl p-8 h-full transition-all duration-300 ${
                      plan.popular 
                        ? 'dodo-card bg-gradient-to-br from-dodo-blue to-dodo-purple text-white shadow-2xl' 
                        : 'dodo-card bg-white/90 backdrop-blur-sm text-gray-800'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: plan.popular 
                        ? '0 25px 50px rgba(59, 130, 246, 0.3)' 
                        : '0 25px 50px rgba(0, 0, 0, 0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="bg-dodo-yellow text-dodo-dark px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                          <Sparkles className="w-4 h-4" />
                          <span>Most Popular</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                        plan.popular ? 'bg-white/20' : `bg-${plan.color}/10`
                      }`}
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <IconComponent 
                        className={`w-8 h-8 ${
                          plan.popular ? 'text-white' : `text-${plan.color}`
                        }`} 
                      />
                    </motion.div>
                    
                    {/* Plan Details */}
                    <div className="text-center mb-8">
                      <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>
                        {plan.name}
                      </h3>
                      <motion.div 
                        className={`text-5xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-800'}`}
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {plan.price}
                      </motion.div>
                      {plan.period && (
                        <p className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                          {plan.period}
                        </p>
                      )}
                      <p className={`mt-2 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                        {plan.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + featureIndex * 0.1 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Check className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-dodo-green'}`} />
                          </motion.div>
                          <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <DodoButton 
                      variant={plan.buttonVariant}
                      size="lg"
                      className="w-full"
                      icon={plan.popular ? 'rocket' : 'arrow'}
                    >
                      {plan.buttonText}
                    </DodoButton>
                  </motion.div>
                </AnimatedElement>
              );
            })}
          </div>
          
          {/* Trust Indicators */}
          <AnimatedElement animation="fade" delay={1.0}>
            <div className="text-center mt-16">
              <p className="text-gray-600 mb-6">Trusted by aspiring data scientists worldwide</p>
              <motion.div 
                className="flex justify-center space-x-8 opacity-60"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {['Google', 'Microsoft', 'Meta', 'Netflix', 'Amazon'].map((company, index) => (
                  <motion.div
                    key={company}
                    className="text-lg font-semibold text-gray-400"
                    whileHover={{ 
                      scale: 1.1, 
                      color: 'var(--dodo-blue)' 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {company}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimatedElement>
        </StaggeredContainer>
      </div>
    </section>
  );
}
