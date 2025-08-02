import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    id: 'code-analysis',
    title: 'Sees your code',
    description: 'DODO analyzes your coding patterns, identifies areas for improvement, and provides real-time feedback on algorithms, data structures, and best practices.',
    image: '/api/placeholder/600/400',
    details: [
      'Real-time code quality analysis',
      'Time complexity optimization',
      'Best practices recommendations',
      'Automated test coverage reports'
    ]
  },
  {
    id: 'voice-interaction',
    title: 'Hears your questions',
    description: 'Ask anything during simulations. DODO understands context and provides detailed explanations just like a real mentor would.',
    image: '/api/placeholder/600/400',
    details: [
      'Natural language processing',
      'Context-aware responses',
      'Voice-to-text integration',
      'Instant clarifications'
    ]
  },
  {
    id: 'skill-building',
    title: 'Teaches real skills',
    description: 'Learn from industry-standard practices used at top tech companies. Build skills that matter in real internships.',
    image: '/api/placeholder/600/400',
    details: [
      'System design patterns',
      'Algorithm optimization',
      'Code review processes',
      'Industry best practices'
    ]
  },
  {
    id: 'mock-interviews',
    title: 'Simulates real interviews',
    description: 'Practice with AI interviewers trained on actual FAANG interview questions and evaluation criteria.',
    image: '/api/placeholder/600/400',
    details: [
      'FAANG-style interviews',
      'Real-time feedback',
      'Performance analytics',
      'Behavioral questions'
    ]
  }
];

export default function FeaturesScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to feature index
  const featureProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, features.length - 1]
  );

  useEffect(() => {
    const unsubscribe = featureProgress.onChange((latest) => {
      const index = Math.round(latest);
      setActiveFeature(Math.max(0, Math.min(index, features.length - 1)));
    });

    return unsubscribe;
  }, [featureProgress]);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The turning point of your career
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DODO helps you prepare for real internships with everything it simulates and teaches.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Sticky Image Section */}
            <div className="lg:sticky lg:top-32">
              <motion.div 
                className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-[4/3] relative">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      className={`absolute inset-0 ${
                        index === 0 ? 'bg-gradient-to-br from-blue-50 to-indigo-100' :
                        index === 1 ? 'bg-gradient-to-br from-green-50 to-emerald-100' :
                        index === 2 ? 'bg-gradient-to-br from-purple-50 to-pink-100' :
                        'bg-gradient-to-br from-orange-50 to-red-100'
                      }`}
                      initial={{ opacity: index === 0 ? 1 : 0 }}
                      animate={{ 
                        opacity: activeFeature === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="p-8 h-full flex flex-col justify-center">
                        {/* Code Analysis Animation */}
                        {index === 0 && (
                          <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-gray-900">Code Analysis</h3>
                              <motion.div
                                className="w-3 h-3 bg-green-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </div>
                            
                            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: activeFeature === index ? "100%" : 0 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="text-green-400 overflow-hidden whitespace-nowrap"
                              >
                                function quickSort(arr) {"{"}
                              </motion.div>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: activeFeature === index ? "100%" : 0 }}
                                transition={{ duration: 1.5, delay: 1 }}
                                className="text-blue-400 overflow-hidden whitespace-nowrap ml-4"
                              >
                                if (arr.length &lt;= 1) return arr;
                              </motion.div>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: activeFeature === index ? "100%" : 0 }}
                                transition={{ duration: 1.5, delay: 1.5 }}
                                className="text-yellow-400 overflow-hidden whitespace-nowrap ml-4"
                              >
                                // O(n log n) complexity ✓
                              </motion.div>
                            </div>

                            <div className="space-y-2">
                              <motion.div 
                                className="flex justify-between items-center p-2 bg-green-50 rounded"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ 
                                  x: activeFeature === index ? 0 : -50,
                                  opacity: activeFeature === index ? 1 : 0
                                }}
                                transition={{ delay: 2 }}
                              >
                                <span className="text-sm text-gray-700">Time Complexity</span>
                                <span className="text-green-600 font-semibold">O(n log n) ✓</span>
                              </motion.div>
                              <motion.div 
                                className="flex justify-between items-center p-2 bg-blue-50 rounded"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ 
                                  x: activeFeature === index ? 0 : -50,
                                  opacity: activeFeature === index ? 1 : 0
                                }}
                                transition={{ delay: 2.3 }}
                              >
                                <span className="text-sm text-gray-700">Code Quality</span>
                                <span className="text-blue-600 font-semibold">92% ✓</span>
                              </motion.div>
                            </div>
                          </div>
                        )}

                        {/* Voice Interaction Animation */}
                        {index === 1 && (
                          <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-gray-900">Voice Assistant</h3>
                              <motion.div
                                className="flex space-x-1"
                                animate={{ opacity: activeFeature === index ? 1 : 0 }}
                              >
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1 bg-blue-500 rounded-full"
                                    animate={{
                                      height: activeFeature === index ? [4, 20, 4] : 4,
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: i * 0.2,
                                    }}
                                  />
                                ))}
                              </motion.div>
                            </div>

                            <motion.div
                              className="bg-gray-50 rounded-lg p-4 mb-4"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ 
                                scale: activeFeature === index ? 1 : 0.9,
                                opacity: activeFeature === index ? 1 : 0
                              }}
                              transition={{ delay: 0.5 }}
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <motion.div
                                  className="w-2 h-2 bg-red-500 rounded-full"
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-xs text-gray-500">Listening...</span>
                              </div>
                              <motion.p
                                className="text-sm text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeFeature === index ? 1 : 0 }}
                                transition={{ delay: 1 }}
                              >
                                "How do I optimize this sorting algorithm?"
                              </motion.p>
                            </motion.div>

                            <motion.div
                              className="bg-blue-50 rounded-lg p-4"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ 
                                y: activeFeature === index ? 0 : 20,
                                opacity: activeFeature === index ? 1 : 0
                              }}
                              transition={{ delay: 1.5 }}
                            >
                              <p className="text-sm text-blue-800">
                                💡 "Try using quicksort with a median-of-three pivot selection for better average-case performance..."
                              </p>
                            </motion.div>
                          </div>
                        )}

                        {/* Skills Teaching Animation */}
                        {index === 2 && (
                          <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-gray-900">Skill Progress</h3>
                              <motion.div
                                className="text-2xl"
                                animate={{ 
                                  rotate: activeFeature === index ? 360 : 0,
                                  scale: activeFeature === index ? [1, 1.2, 1] : 1
                                }}
                                transition={{ duration: 2, delay: 0.5 }}
                              >
                                🎯
                              </motion.div>
                            </div>

                            <div className="space-y-4">
                              {[
                                { skill: 'System Design', progress: 85, color: 'bg-purple-500' },
                                { skill: 'Algorithms', progress: 92, color: 'bg-blue-500' },
                                { skill: 'Data Structures', progress: 78, color: 'bg-green-500' }
                              ].map((item, skillIndex) => (
                                <div key={item.skill} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                                    <motion.span
                                      className="text-sm font-bold text-gray-900"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: activeFeature === index ? 1 : 0 }}
                                      transition={{ delay: skillIndex * 0.3 + 1 }}
                                    >
                                      {item.progress}%
                                    </motion.span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <motion.div
                                      className={`h-2 rounded-full ${item.color}`}
                                      initial={{ width: 0 }}
                                      animate={{ 
                                        width: activeFeature === index ? `${item.progress}%` : 0
                                      }}
                                      transition={{ 
                                        duration: 1.5, 
                                        delay: skillIndex * 0.3 + 0.5,
                                        ease: "easeOut"
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            <motion.div
                              className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: activeFeature === index ? 1 : 0 }}
                              transition={{ delay: 2, type: "spring", stiffness: 200 }}
                            >
                              <p className="text-sm text-gray-700 text-center">
                                🏆 Ready for FAANG interviews!
                              </p>
                            </motion.div>
                          </div>
                        )}

                        {/* Mock Interview Animation */}
                        {index === 3 && (
                          <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-gray-900">Live Interview</h3>
                              <motion.div
                                className="flex items-center space-x-2"
                                animate={{ opacity: activeFeature === index ? 1 : 0 }}
                              >
                                <motion.div
                                  className="w-2 h-2 bg-green-500 rounded-full"
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span className="text-xs text-green-600 font-medium">LIVE</span>
                              </motion.div>
                            </div>

                            <motion.div
                              className="flex items-center space-x-3 mb-4"
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ 
                                x: activeFeature === index ? 0 : -50,
                                opacity: activeFeature === index ? 1 : 0
                              }}
                              transition={{ delay: 0.5 }}
                            >
                              <motion.div
                                className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold"
                                animate={{ 
                                  scale: activeFeature === index ? [1, 1.1, 1] : 1
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                              >
                                SC
                              </motion.div>
                              <div>
                                <h4 className="font-semibold text-gray-800">Sarah Chen</h4>
                                <p className="text-sm text-gray-500">Senior SWE at Google</p>
                              </div>
                            </motion.div>

                            <motion.div
                              className="bg-gray-50 rounded-lg p-4 mb-3"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ 
                                y: activeFeature === index ? 0 : 20,
                                opacity: activeFeature === index ? 1 : 0
                              }}
                              transition={{ delay: 1 }}
                            >
                              <motion.p
                                className="text-sm text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeFeature === index ? 1 : 0 }}
                                transition={{ delay: 1.5 }}
                              >
                                "Great approach! Can you walk me through the time complexity?"
                              </motion.p>
                            </motion.div>

                            <motion.div
                              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: activeFeature === index ? 1 : 0 }}
                              transition={{ delay: 2, type: "spring" }}
                            >
                              <span className="text-sm text-blue-800">Interview Score</span>
                              <motion.span
                                className="text-lg font-bold text-blue-600"
                                animate={{ 
                                  scale: activeFeature === index ? [1, 1.3, 1] : 1
                                }}
                                transition={{ delay: 2.5, duration: 0.5 }}
                              >
                                8.5/10
                              </motion.span>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Scrolling Content Section */}
            <div className="space-y-32">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="min-h-screen flex flex-col justify-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: false, margin: "-20%" }}
                >
                  <div className="space-y-6">
                    <motion.div
                      className="inline-block"
                      whileInView={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        Feature {index + 1}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    
                    <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                      {feature.description}
                    </p>

                    <div className="pt-6">
                      <motion.button
                        className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}