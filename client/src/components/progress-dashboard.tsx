import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Code, MessageSquare, Target } from 'lucide-react';

interface Skill {
  name: string;
  progress: number;
  color: string;
}

interface Achievement {
  icon: any;
  title: string;
  description: string;
  color: string;
}

export default function ProgressDashboard() {
  const skills: Skill[] = [
    { name: 'Data Structures & Algorithms', progress: 85, color: 'bg-lilo-blue' },
    { name: 'System Design', progress: 72, color: 'bg-green-500' },
    { name: 'Behavioral Interviews', progress: 91, color: 'bg-purple-500' }
  ];

  const achievements: Achievement[] = [
    {
      icon: Trophy,
      title: 'Google SWE Project Completed',
      description: 'Scored 96% on final evaluation',
      color: 'bg-green-50 text-green-700'
    },
    {
      icon: Code,
      title: 'Algorithm Mastery',
      description: 'Solved 50 advanced problems',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      icon: MessageSquare,
      title: 'Interview Simulation',
      description: 'Passed Meta technical round',
      color: 'bg-purple-50 text-purple-700'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '7', subtitle: 'Across 3 companies', color: 'text-green-600' },
    { label: 'Interview Readiness', value: '94%', subtitle: 'Based on skill assessment', color: 'text-lilo-blue' },
    { label: 'Mentorship Hours', value: '42h', subtitle: 'AI + Human guidance', color: 'text-purple-600' }
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <h4 className="font-semibold text-gray-800">{stat.label}</h4>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Skill Development</h4>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{skill.name}</span>
                    <span className="text-sm font-semibold text-gray-800">{skill.progress}%</span>
                  </div>
                  <Progress 
                    value={skill.progress} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Recent Achievements</h4>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.color.split(' ')[0]}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${achievement.color.split(' ')[0]} ${achievement.color.split(' ')[1]}`}>
                    <achievement.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{achievement.title}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
