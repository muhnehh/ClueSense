import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import type { CompanySimulation } from '@/lib/types';

export default function CompanySimulations() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const { data: companies, isLoading } = useQuery<CompanySimulation[]>({
    queryKey: ['/api/companies'],
  });

  const handleCompanySelect = (companySlug: string) => {
    setSelectedCompany(companySlug);
    // Here you would typically start a simulation
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading companies...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lilo-black mb-6">
            Internships that feel real
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience authentic internship environments at top tech companies with realistic projects, mentorship, and feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {companies?.map((company) => (
            <Card 
              key={company.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                selectedCompany === company.slug ? 'border-lilo-blue ring-2 ring-lilo-blue ring-opacity-20' : 'border-transparent'
              }`}
              onClick={() => handleCompanySelect(company.slug)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 ${company.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{company.logo}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{company.name}</h3>
                    <p className="text-sm text-gray-500">{company.description}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-semibold">{company.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Projects</span>
                    <span className="font-semibold">{company.projectCount} real projects</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mentorship</span>
                    <span className="font-semibold">AI + Human</span>
                  </div>
                </div>
                <Button 
                  className={`w-full mt-4 ${company.color.replace('bg-', 'bg-')} hover:opacity-90 transition-colors text-white`}
                >
                  Start Simulation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Dashboard Demo */}
        <Card className="shadow-2xl">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Your Progress Dashboard</h3>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">7</span>
                </div>
                <h4 className="font-semibold text-gray-800">Projects Completed</h4>
                <p className="text-sm text-gray-500">Across 3 companies</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-lilo-blue">94%</span>
                </div>
                <h4 className="font-semibold text-gray-800">Interview Readiness</h4>
                <p className="text-sm text-gray-500">Based on skill assessment</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">42h</span>
                </div>
                <h4 className="font-semibold text-gray-800">Mentorship Hours</h4>
                <p className="text-sm text-gray-500">AI + Human guidance</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Skill Development</h4>
                <div className="space-y-3">
                  {[
                    { skill: 'Data Structures & Algorithms', progress: 85, color: 'bg-lilo-blue' },
                    { skill: 'System Design', progress: 72, color: 'bg-green-500' },
                    { skill: 'Behavioral Interviews', progress: 91, color: 'bg-purple-500' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">{item.skill}</span>
                        <span className="text-sm font-semibold text-gray-800">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Recent Achievements</h4>
                <div className="space-y-3">
                  {[
                    { icon: '🏆', title: 'Google SWE Project Completed', desc: 'Scored 96% on final evaluation', color: 'bg-green-50' },
                    { icon: '💻', title: 'Algorithm Mastery', desc: 'Solved 50 advanced problems', color: 'bg-blue-50' },
                    { icon: '💬', title: 'Interview Simulation', desc: 'Passed Meta technical round', color: 'bg-purple-50' }
                  ].map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 ${achievement.color} rounded-lg`}>
                      <div className="text-xl">{achievement.icon}</div>
                      <div>
                        <p className="font-semibold text-gray-800">{achievement.title}</p>
                        <p className="text-sm text-gray-500">{achievement.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
