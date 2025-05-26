



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Brain, Heart, AlertTriangle, AlertCircle, Zap, Moon, CloudRain, Clipboard } from 'lucide-react';
import MentalHealthAssessment from './MentalHealthAssessment'; // Import the Assessment component

const mentalHealthConditions = [
  {
    name: 'Depression',
    description: 'Persistent feelings of sadness, loss of interest, and decreased energy affecting daily functioning.',
    symptoms: ['Low Mood', 'Fatigue', 'Sleep Changes'],
    icon: <CloudRain className="w-12 h-12 text-blue-300" />,
    color: 'from-blue-900 to-blue-700',
    lightColor: 'text-blue-300',
    borderColor: 'border-blue-400/30'
  },
  {
    name: 'Anxiety',
    description: 'Excessive worry, fear, and nervousness that can interfere with everyday activities.',
    symptoms: ['Restlessness', 'Tension', 'Panic'],
    icon: <AlertTriangle className="w-12 h-12 text-amber-300" />,
    color: 'from-amber-900 to-amber-700',
    lightColor: 'text-amber-300',
    borderColor: 'border-amber-400/30'
  },
  {
    name: 'Suicide',
    description: 'A serious mental health crisis that may result from prolonged emotional distress, trauma, or untreated mental illness.',
    symptoms: ['Hopelessness', 'Withdrawal', 'Self-harm thoughts'],
    icon: <AlertCircle className="w-12 h-12 text-rose-300" />,
    color: 'from-rose-900 to-rose-700',
    lightColor: 'text-rose-300',
    borderColor: 'border-rose-400/30'
  },
  {
    name: 'Stress',
    description: 'A natural response to challenging situations, causing physical, emotional, and behavioral symptoms such as tension, fatigue, and difficulty concentrating.',
    symptoms: ['Fatigue', 'Irritability', 'Tension'],
    icon: <Activity className="w-12 h-12 text-violet-300" />,
    color: 'from-violet-900 to-violet-700',
    lightColor: 'text-violet-300',
    borderColor: 'border-violet-400/30'
  },
  {
    name: 'Bipolar Disorder',
    description: 'Characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression)',
    symptoms: [' Mood Swings', 'Mania', 'Depression'],
    icon: <Brain className="w-12 h-12 text-emerald-300" />,
    color: 'from-emerald-900 to-emerald-700',
    lightColor: 'text-emerald-300',
    borderColor: 'border-emerald-400/30'
  }
];

function MentalHealthConditions() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);

  const navigate = useNavigate();

  const handleLearnMore = (conditionName) => {
    let targetUrl;

    if (conditionName === 'Depression' || conditionName === 'Stress') {
      targetUrl = 'https://depression-and-stress-resources.vercel.app/';
    } else if (conditionName === 'Suicide') {
      targetUrl = 'https://helpful-resources-for-sucidemindcare.vercel.app/';
    } else if (conditionName === 'Bipolar Disorder') {
      targetUrl = 'https://bipolarresourcesmindcare.vercel.app/';
    } else {
      targetUrl = 'https://mindcareanxietyguide.vercel.app/';
    }

    window.open(targetUrl, '_blank');
    console.log(`User clicked Learn More for: ${conditionName}`);
  };

  const toggleAssessment = () => {
    setShowAssessment(!showAssessment);
    if (!showAssessment) {
      setTimeout(() => {
        document.getElementById('assessment-form').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <>
      <section id="mental-health" className="py-24 px-4 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-indigo-800 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-blue-800 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-800 blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 relative">
            <span className="text-sm font-semibold tracking-widest text-indigo-300 uppercase mb-2 block">Understanding Mental Health</span>
            <h2 className="text-5xl font-bold mb-4 tracking-tight text-white">
              Mental Health Conditions
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto mt-4"></div>
            <p className="text-center text-gray-300 mt-6 text-lg max-w-3xl mx-auto leading-relaxed">
              Understanding common mental health conditions and their symptoms can help in early identification and support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentalHealthConditions.map((condition, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-500 group bg-slate-800/50"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${condition.color} opacity-30`}></div>
                <div className={`absolute inset-0 rounded-xl border ${condition.borderColor}`}></div>

                <div className="relative z-20 p-8 h-full flex flex-col items-center text-center">
                  <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-slate-900/70 mb-6 shadow-lg transform transition-transform duration-500 ${hoveredIndex === index ? 'scale-110' : ''} ${condition.borderColor}`}>
                    {condition.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    <span className={`${condition.lightColor}`}>
                      {condition.name}
                    </span>
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                    {condition.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6 mt-auto">
                    {condition.symptoms.map((symptom, idx) => (
                      <span
                        key={idx}
                        className={`bg-gradient-to-br ${condition.color} px-3 py-1 text-xs rounded-full shadow-lg backdrop-blur-sm border border-white/5 transform transition-transform duration-300 hover:scale-105`}
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleLearnMore(condition.name)}
                    className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-white px-5 py-2 rounded-md shadow-lg border border-slate-700 transition-all duration-300 transform hover:scale-105 text-sm font-medium group/btn"
                  >
                    <span className={`w-2 h-2 rounded-full ${condition.lightColor} group-hover/btn:animate-pulse`}></span>
                    Learn More
                    <svg className="w-3 h-3 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-16">
            <button
              onClick={toggleAssessment}
              className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-8 py-4 rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <Clipboard className="w-5 h-5 text-indigo-200 group-hover:animate-pulse" />
              <span className="font-semibold">
                {showAssessment ? 'Hide Mental Health Assessment' : 'Take Mental Health Assessment'}
              </span>
            </button>

            <p className="text-gray-400 mt-4 text-sm max-w-lg text-center">
              Our assessment helps identify potential mental health concerns and provides personalized recommendations.
            </p>
          </div>

          {/* 🔗 New External Redirect Button */}
          <div className="mt-12 text-center">
            <a
              href="https://mindcareanxietyguide.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full shadow-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Explore More Mental Health Resources
            </a>
          </div>
        </div>
      </section>

      {showAssessment && (
        <section id="assessment-form" className="py-16 px-4 bg-gradient-to-b from-[#0f172a] to-[#162033]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white">Mental Health Assessment</h3>
              <p className="text-gray-400 mt-2">Complete the following assessment to help us understand your needs</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-6 backdrop-blur-sm">
              <MentalHealthAssessment />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default MentalHealthConditions;
