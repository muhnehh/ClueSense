import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/newsletter', { email });
      toast({
        title: 'Success!',
        description: 'You\'ve been subscribed to our newsletter.',
      });
      setEmail('');
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-dodo-dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to launch your career?
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-normal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join thousands of students who've already started their journey with DODO.
        </motion.p>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dodo-input flex-1 text-sm"
            required
          />
          <motion.button 
            type="submit"
            disabled={isSubmitting}
            className="dodo-button-primary flex items-center space-x-2"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{isSubmitting ? 'Joining...' : 'Get Started'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.form>
        
        <motion.p 
          className="text-sm text-gray-500 mt-4 font-normal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Start with a free account. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}
