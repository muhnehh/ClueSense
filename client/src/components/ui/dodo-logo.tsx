import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DodoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export function DodoLogo({ size = 'md', animated = true, className = '' }: DodoLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <motion.div 
      className={`flex items-center space-x-2 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={animated ? { scale: 1.05 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Animated Logo Icon */}
      <motion.div 
        className={`${sizeClasses[size]} relative`}
        animate={animated ? {
          rotate: isHovered ? 360 : 0,
        } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Main Circle */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(45deg, var(--dodo-blue), var(--dodo-purple))',
          }}
          animate={animated ? {
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner Morphing Shape */}
        <motion.div 
          className="absolute inset-2 rounded-full"
          style={{
            background: 'linear-gradient(45deg, var(--dodo-electric), var(--dodo-pink))',
          }}
          animate={animated ? {
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Center Dot */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={animated ? {
            scale: [1, 1.5, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Animated Text */}
      <motion.span 
        className={`font-bold text-dodo-dark ${textSizes[size]}`}
        animate={animated ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        style={{
          background: 'linear-gradient(45deg, var(--dodo-blue), var(--dodo-purple), var(--dodo-electric))',
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
      </motion.span>
    </motion.div>
  );
}

// Simplified static version for smaller usage
export function DodoIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(45deg, var(--dodo-blue), var(--dodo-purple))',
        }}
      />
      <div 
        className="absolute inset-1 rounded-full"
        style={{
          background: 'linear-gradient(45deg, var(--dodo-electric), var(--dodo-pink))',
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-white rounded-full"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
}
