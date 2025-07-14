import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, FileText, CheckCircle, AlertTriangle, X, Star } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface CVFeedback {
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

interface CVReview {
  score: number;
  feedback: CVFeedback[];
  suggestions: string;
}

export default function CVReview() {
  const [cvReview, setCvReview] = useState<CVReview | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsAnalyzing(true);

    try {
      const response = await apiRequest('POST', '/api/cv-review', {
        filename: file.name,
        userId: 1
      });
      const data = await response.json();
      setCvReview(data);
    } catch (error) {
      console.error('CV review failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-green-200 bg-green-50';
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-lilo-black mb-6">
              Welcome to<br />
              <span className="text-lilo-blue">The Turning Point of Careers.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of students who've transformed their career prospects with LILO's AI-powered internship simulations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="bg-lilo-black hover:bg-gray-800 text-white px-8 py-4">
                Start Your Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-lilo-blue text-lilo-blue hover:bg-lilo-blue hover:text-white px-8 py-4"
              >
                View Success Stories
              </Button>
            </div>
          </div>

          <Card className="shadow-2xl border border-gray-200">
            <div className="bg-gradient-to-r from-lilo-blue to-purple-600 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">AI CV Review</h3>
              <p className="text-blue-100">Get instant feedback on your resume</p>
            </div>
            <CardContent className="p-6">
              {!cvReview ? (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-lilo-blue transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          {fileName ? `Selected: ${fileName}` : 'Drop your CV here or click to upload'}
                        </p>
                        <p className="text-sm text-gray-500">PDF, DOC, or DOCX up to 10MB</p>
                      </div>
                    </label>
                    <Input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  {isAnalyzing && (
                    <div className="flex items-center justify-center space-x-2 text-lilo-blue">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-lilo-blue border-t-transparent" />
                      <span>Analyzing your CV...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{fileName}</span>
                  </div>

                  <div className="space-y-3">
                    {cvReview.feedback.map((item, index) => (
                      <div key={index} className={`flex items-start space-x-3 p-3 border rounded-lg ${getSeverityColor(item.severity)}`}>
                        {getSeverityIcon(item.severity)}
                        <div>
                          <p className="font-medium text-gray-800 capitalize">{item.type}</p>
                          <p className="text-sm text-gray-600">{item.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-lilo-blue/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">Resume Score</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-lilo-blue fill-current" />
                        <span className="text-2xl font-bold text-lilo-blue">{cvReview.score}/10</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-lilo-blue h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(cvReview.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Recommendations</h4>
                    <p className="text-sm text-gray-600">{cvReview.suggestions}</p>
                  </div>

                  <Button 
                    className="w-full bg-lilo-blue hover:bg-blue-700 text-white"
                    onClick={() => {
                      setCvReview(null);
                      setFileName('');
                    }}
                  >
                    Analyze Another CV
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
