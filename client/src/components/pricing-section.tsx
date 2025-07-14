import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        '1 company simulation',
        'Basic AI mentorship',
        'Progress tracking',
        'CV review (basic)'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Professional',
      price: '$49',
      period: 'per month',
      description: 'Most popular choice',
      features: [
        'All company simulations',
        'Advanced AI mentorship',
        'Human mentor access',
        'Mock interviews',
        'Detailed CV analysis',
        'Priority support'
      ],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For institutions',
      features: [
        'Unlimited simulations',
        'Custom company programs',
        'Dedicated mentors',
        'Analytics dashboard',
        'API access'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lilo-black mb-6">
            Flexible pricing for every journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as you progress through your internship simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative shadow-lg ${plan.popular ? 'ring-2 ring-lilo-blue bg-lilo-blue text-white' : 'bg-white'}`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-white text-lilo-blue px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>
                    {plan.price}
                  </div>
                  {plan.period && (
                    <p className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                      {plan.period}
                    </p>
                  )}
                  <p className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-green-600'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full font-semibold ${
                    plan.popular 
                      ? 'bg-white text-lilo-blue hover:bg-gray-100' 
                      : plan.buttonVariant === 'outline'
                        ? 'border-gray-300 text-gray-800 hover:bg-gray-100'
                        : 'bg-lilo-black text-white hover:bg-gray-800'
                  }`}
                  variant={plan.popular ? 'default' : plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
