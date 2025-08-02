import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';

interface DodoButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'arrow' | 'spark' | 'zap' | 'rocket' | 'none';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function DodoButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  icon = 'none',
  onClick,
  className = '',
  disabled = false,
  loading = false
}: DodoButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variants = {
    primary: {
      background: 'var(--dodo-dark)',
      color: 'white',
      border: 'none'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--dodo-dark)',
      border: '1px solid var(--border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--dodo-gray)',
      border: 'none'
    }
  };

  const iconComponents = {
    arrow: ArrowRight,
    spark: Sparkles,
    zap: Zap,
    rocket: Rocket,
    none: null
  };

  const IconComponent = iconComponents[icon];

  return (
    <motion.button
      className={`relative overflow-hidden rounded-xl font-medium 
                  transition-all duration-200 border-0 ${sizeClasses[size]} ${className}`}
      style={variants[variant]}
      disabled={disabled || loading}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -1
      }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {loading ? (
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <>
            <span>{children}</span>
            {IconComponent && (
              <motion.div
                animate={{
                  x: isHovered ? 2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <IconComponent className="w-4 h-4" />
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Hover effect */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-black/10 rounded-xl"
          initial={{ opacity: 99 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}
