import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <section className="py-24 bg-lilo-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to launch your career?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join thousands of students who've already started their journey with LILO.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-full text-gray-900 border-gray-300 focus:ring-lilo-blue focus:border-lilo-blue"
            required
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-lilo-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? 'Subscribing...' : 'Get Started'}
          </Button>
        </form>
        
        <p className="text-sm text-gray-400 mt-4">
          Start with a free account. No credit card required.
        </p>
      </div>
    </section>
  );
}
