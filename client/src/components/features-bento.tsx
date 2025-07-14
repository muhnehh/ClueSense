import { Card, CardContent } from '@/components/ui/card';
import { Code, Mic, GraduationCap, MessageSquare, BarChart3, Brain } from 'lucide-react';

export default function FeaturesBento() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lilo-black mb-6">
            The turning point of your career
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LILO helps you prepare for real internships with everything it simulates and teaches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sees Your Code */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 border-none">
            <CardContent className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-lilo-black mb-4">Sees your code</h3>
                <p className="text-gray-600 mb-6">
                  LILO analyzes your coding patterns, identifies areas for improvement, and provides 
                  real-time feedback on algorithms, data structures, and best practices.
                </p>
                
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Code Quality Analysis</span>
                    <span className="text-sm text-green-600 font-semibold">85% Score</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time Complexity</span>
                      <span className="text-green-600">O(log n) ✓</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Code Style</span>
                      <span className="text-yellow-600">Needs improvement</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Test Coverage</span>
                      <span className="text-green-600">92% ✓</span>
                    </div>
                  </div>
                </div>
              </div>
              <Code className="absolute top-4 right-4 w-16 h-16 text-blue-500 opacity-10" />
            </CardContent>
          </Card>

          {/* Hears Your Questions */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-none">
            <CardContent className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-lilo-black mb-4">Hears your questions</h3>
                <p className="text-gray-600 mb-6">
                  Ask anything during simulations. LILO understands context and provides detailed explanations.
                </p>
                
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500">Listening...</span>
                  </div>
                  <p className="text-sm text-gray-700">"How do I optimize this sorting algorithm?"</p>
                </div>
              </div>
              <Mic className="absolute bottom-4 right-4 w-12 h-12 text-green-600 opacity-10" />
            </CardContent>
          </Card>

          {/* Teaches Real Skills */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-none">
            <CardContent className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-lilo-black mb-4">Teaches real skills</h3>
                <p className="text-gray-600 mb-6">
                  Learn from industry-standard practices used at top tech companies.
                </p>
                
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-2 shadow-sm flex items-center justify-between">
                    <span className="text-sm text-gray-700">System Design</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-3/4" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm flex items-center justify-between">
                    <span className="text-sm text-gray-700">Algorithms</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-5/6" />
                    </div>
                  </div>
                </div>
              </div>
              <GraduationCap className="absolute bottom-4 right-4 w-12 h-12 text-purple-600 opacity-10" />
            </CardContent>
          </Card>

          {/* Mock Interviews */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-orange-50 to-red-100 border-none">
            <CardContent className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-lilo-black mb-4">Simulates real interviews</h3>
                <p className="text-gray-600 mb-6">
                  Practice with AI interviewers trained on actual FAANG interview questions and evaluation criteria.
                </p>
                
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Sarah Chen</h4>
                        <p className="text-sm text-gray-500">Senior SWE at Google</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Interview in progress</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      "Great approach! Can you walk me through the time complexity of your solution? 
                      How would you handle edge cases when the input array is empty?"
                    </p>
                  </div>
                </div>
              </div>
              <MessageSquare className="absolute top-4 right-4 w-16 h-16 text-orange-500 opacity-10" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
