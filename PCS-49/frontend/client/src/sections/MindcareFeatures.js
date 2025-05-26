import React from 'react';

function MindcareFeatures() {
  return (
    <section id="features" className="relative py-20 px-5 bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 tracking-wide">Features</h2>
      </div>

      <div className="max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-10 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6">Brings Happiness with</h3>
              <div className="flex items-center mb-4">
                <img src="/images/logo.png" alt="MindCare Logo" className="h-12 mr-3" />
                <h4 className="text-2xl font-bold">MIND CARE</h4>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg">Facial Emotion Detection</p>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg">Real-time Emotional Analysis</p>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg">Providing educational content about mental health disorders through AR experiences</p>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg">Customized AR and VR Experiences</p>
              </div>
            </div>


          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-blue-400 flex items-center justify-center bg-white relative overflow-hidden animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">

                </div>
              </div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-lg opacity-50"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <svg className="absolute -top-24 -left-24 text-blue-500/10" width="300" height="300" viewBox="0 0 200 200">
            <path fill="currentColor" d="M42.7,-73.2C55.9,-65.7,67.7,-55.1,76.6,-41.9C85.5,-28.7,91.5,-14.4,90.1,-0.8C88.7,12.7,79.8,25.5,70.8,37.8C61.8,50.2,52.6,62.2,40.4,68.4C28.3,74.7,14.1,75.2,-0.9,76.7C-15.9,78.2,-31.8,80.6,-45,75.3C-58.2,70,-68.6,57,-74.5,42.8C-80.4,28.6,-81.7,14.3,-79.6,1.2C-77.6,-11.9,-72.1,-23.9,-64.9,-34.4C-57.7,-45,-48.8,-54.2,-38,-61.4C-27.3,-68.6,-13.6,-73.9,0.7,-75.1C15.1,-76.3,30.1,-73.3,42.7,-66.6Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute -bottom-16 -right-16 text-cyan-500/10" width="200" height="200" viewBox="0 0 200 200">
            <path fill="currentColor" d="M38.5,-66.4C48.9,-60.9,55.6,-48,63.5,-35.1C71.5,-22.2,80.7,-9.4,81.2,3.9C81.6,17.2,73.2,31,63.4,42.6C53.7,54.2,42.6,63.7,29.9,69.8C17.3,75.9,3,78.5,-11.6,77.7C-26.2,76.9,-41,72.6,-52.6,63.7C-64.2,54.8,-72.5,41.1,-77.1,26.4C-81.8,11.6,-82.8,-4.3,-79.7,-19.8C-76.5,-35.3,-69.2,-50.5,-57.5,-55.8C-45.8,-61.2,-29.7,-56.8,-15.9,-58.1C-2.1,-59.4,10.4,-66.4,23.8,-69C37.2,-71.6,51.4,-69.8,58.6,-63.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default MindcareFeatures;