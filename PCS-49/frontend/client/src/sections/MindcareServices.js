import React from 'react';

function MindcareServices() {
  const servicesList = [
    {
      title: "Emotional Health Monitoring",
      icon: "graph-up",
      description: "Real-time tracking of emotional states with personalized insights and support recommendations for adolescents.",
      features: ["Mood Tracking", "Stress Analysis", "Personalized Support"],
      link: "/services/emotional-monitoring"
    },
    
    {
      title: "Mental Health Resources",
      icon: "book",
      description: "Comprehensive resources about adolescent mental health using interactive content and learning modules.",
      features: ["Interactive Lessons", "Progress Quizzes", "Resource Library"],
      link: "/services/mental-health-education"
    },
    
    {
      title: "Doctor-Patient Consultation",
      icon: "headset",
      description: "24/7 digital support system with immediate resources, coping strategies, and professional connection options for adolescents in distress.",
      features: ["Immediate Response", "Coping Techniques", "Professional Referrals"],
      link: "/services/crisis-support"
    },
  ];

  return (
    <section id="services" className="relative py-20 px-5 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-64 h-64 rounded-full bg-blue-600 blur-3xl -top-10 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-700 blur-3xl top-1/3 -right-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-80 h-80 rounded-full bg-violet-800 blur-3xl bottom-0 left-1/4 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* CSS Grid Pattern (no external file needed) */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute w-20 h-20 border border-white/20 rounded-xl top-20 left-10 animate-float rotate-12 opacity-30"></div>
      <div className="absolute w-16 h-16 border border-white/20 rounded-xl bottom-40 right-20 animate-float rotate-45 opacity-30" style={{ animationDelay: '3s' }}></div>
      <div className="absolute w-24 h-24 border border-white/20 rounded-xl top-1/2 left-1/3 animate-float -rotate-12 opacity-30" style={{ animationDelay: '1.5s' }}></div>

      {/* Add required keyframes animation for floating elements */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-indigo-900/50 backdrop-blur-sm rounded-full mb-4 border border-indigo-700/50">
            <span className="text-indigo-300 font-medium tracking-wide">Advanced Technology for Adolescent Wellbeing</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
            MindCare Solutions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Innovative digital mental health solutions designed specifically for adolescents,
            combining cutting-edge technology with evidence-based psychological approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700 -z-10 group-hover:scale-105"></div>
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700 hover:border-indigo-500/50 shadow-xl transition-all duration-500 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-slate-500 text-sm font-medium">0{index + 1}</span>
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="bg-slate-700/50 px-3 py-1 text-sm rounded-full text-indigo-300 border border-slate-600 hover:bg-indigo-900/30 transition"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href={service.link}
                  className="block w-full text-center bg-gradient-to-r from-indigo-600 to-violet-600 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition mt-auto group-hover:translate-y-1"
                >
                  Explore Service
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-indigo-900/20 backdrop-blur-md rounded-3xl -z-10"></div>
          <div className="max-w-5xl mx-auto py-16 px-8">
            <h3 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
              How Our Technology Helps
            </h3>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-500/40 transition-all duration-500 transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">Real-time Monitoring</h4>
                <p className="text-gray-400 text-center">Advanced analytics that track emotional patterns and provide timely interventions when needed.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:shadow-indigo-500/40 transition-all duration-500 transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">📚 Resources</h4>
                <p className="text-gray-400 text-center">We provide valuable mental health resources and short quizzes, designed with an interactive and user-friendly interface to help you better understand and manage your well-being.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20 group-hover:shadow-violet-500/40 transition-all duration-500 transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">Community Support</h4>
                <p className="text-gray-400 text-center">Digital connection tools that foster healthy relationships and build supportive communities.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center relative">
          <div className="inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 blur-xl opacity-70 -z-10 rounded-full scale-110"></div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default MindcareServices;
