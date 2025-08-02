import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'slide-up' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function AnimatedElement({ 
  children, 
  animation = 'slide-up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true
}: AnimatedElementProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    'slide-up': {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'scale': {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { scale: 1, opacity: 1 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
interface StaggeredContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggeredContainer({ children, staggerDelay = 0.1, className = '' }: StaggeredContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Minimal background - no more crazy floating particles
export function MinimalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
