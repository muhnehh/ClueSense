export default function MentorshipSection() {
  const features = [
    {
      title: 'AI Mentorship',
      description: "LILO's AI mentors provide instant feedback on your code, suggest optimizations, and guide you through complex problems with personalized explanations tailored to your learning style.",
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    },
    {
      title: 'Real Projects',
      description: 'Work on authentic projects mirroring actual internship experiences at top tech companies. Build production-ready features with industry-standard tools and practices.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    },
    {
      title: 'Career Preparation',
      description: 'From technical interviews to behavioral assessments, LILO prepares you for every aspect of the hiring process with mock interviews and personalized feedback.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lilo-black mb-6">
            Three ways LILO transforms learning
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="rounded-2xl shadow-lg w-full h-64 object-cover mb-6" 
              />
              <h3 className="text-2xl font-bold text-lilo-black mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
