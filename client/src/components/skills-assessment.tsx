import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, EyeOff, Brain, CheckCircle, Clock, Play } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import type { SkillsAssessment } from '@/lib/types';

export default function SkillsAssessment() {
  const [assessment, setAssessment] = useState<SkillsAssessment | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);

  const handleStartAssessment = async () => {
    setIsAssessing(true);
    try {
      const response = await apiRequest('POST', '/api/skills-assessment', {
        answers: ['example'], // In a real app, this would come from a form
        userId: 1
      });
      const data = await response.json();
      setAssessment(data);
    } catch (error) {
      console.error('Assessment failed:', error);
    } finally {
      setIsAssessing(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lilo-black mb-6">
            Undetectable by design
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No interviewer knows you practiced. No resume gaps. No fake experience claims. Just real skills, naturally developed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-8">
              {[
                {
                  icon: Shield,
                  color: 'text-green-600',
                  bgColor: 'bg-green-100',
                  title: "Doesn't appear on resume",
                  description: "LILO simulations don't create artificial work experience. They build real skills you can confidently discuss in interviews."
                },
                {
                  icon: EyeOff,
                  color: 'text-lilo-blue',
                  bgColor: 'bg-blue-100',
                  title: "Invisible to recruiters",
                  description: "No one knows you used LILO unless you tell them. Your skills speak for themselves in real interviews."
                },
                {
                  icon: Brain,
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-100',
                  title: "Follow your learning",
                  description: "LILO adapts to your pace and style, ensuring you develop genuine competence and confidence."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-lilo-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-2xl">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Live Skills Assessment</h3>
            </div>
            <CardContent className="p-6">
              {!assessment ? (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 text-lilo-blue mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Ready for Assessment?</h4>
                  <p className="text-gray-600 mb-6">
                    Get a comprehensive analysis of your technical skills and interview readiness.
                  </p>
                                  <div className="text-center">
                  <Button
                    onClick={handleStartAssessment}
                    disabled={isAssessing}
                    size="lg"
                    className="btn-primary-visible"
                  >
                    {isAssessing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Assessment
                      </>
                    )}
                  </Button>
                </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Overall Readiness</span>
                      <span className="text-sm font-bold text-green-600">{assessment.readinessLevel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${assessment.overallScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {Object.entries(assessment.skills).map(([skill, score], index) => (
                      <div key={skill} className={`flex items-center justify-between p-3 rounded-lg ${
                        score >= 85 ? 'bg-green-50' : score >= 70 ? 'bg-yellow-50' : 'bg-blue-50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className={`w-5 h-5 ${
                            score >= 85 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-lilo-blue'
                          }`} />
                          <span className="font-medium text-gray-800 capitalize">
                            {skill.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                        <span className={`font-semibold ${
                          score >= 85 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-lilo-blue'
                        }`}>
                          {score >= 85 ? 'Mastered' : score >= 70 ? 'Proficient' : 'Learning'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Next Recommendation</h4>
                    <p className="text-sm text-gray-600">{assessment.recommendations[0]}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
