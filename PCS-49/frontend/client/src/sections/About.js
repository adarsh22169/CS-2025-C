// import React from 'react';
// import { motion } from 'framer-motion';

// function About() {
//   return (
//     <section id="about" className="py-20 bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
//       <div className="max-w-5xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-center gap-12">

//         {/* Text Content */}
//         <motion.div
//           className="text-center md:text-left"
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, ease: 'easeInOut' }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
//             👋 About Me
//           </h2>
//           <p className="text-lg leading-relaxed text-gray-300 mb-6 max-w-xl">
//             I’m a <span className="text-pink-400 font-semibold">passionate web developer</span> with a strong grip on modern technologies. I love building responsive and interactive websites that provide seamless user experiences.
//             <br /><br />
//             From crafting beautiful frontends with <span className="text-cyan-300">React</span> and <span className="text-blue-300">Tailwind CSS</span> to building robust backends with <span className="text-green-300">Node.js</span>, I’m constantly learning and pushing boundaries.
//           </p>
//         </motion.div>

//         {/* Profile Image */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex-shrink-0"
//         >
//           <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-pink-500 shadow-lg shadow-pink-800 transition-transform transform hover:scale-105">
//             <img
//               src="/images/profile.jpg"
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default About;



import React from 'react';

function About() {
  return (
    <div
      id="about"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 md:px-8 flex items-center justify-center"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-600 to-blue-500 opacity-30"></div>
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-purple-600 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>

      {/* Main Content */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10 text-center md:text-left">

        {/* Text Content */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-lg mb-4">
            <h2 className="text-xl font-bold flex items-center justify-center md:justify-start">
              <span className="mr-2">👋</span> About Me
            </h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Smart solutions for mindful living, powered by innovation
          </h1>

          <p className="text-lg leading-relaxed text-gray-300">
            At the intersection of empathy and innovation, MindCare is a cutting-edge mental health platform crafted to empower adolescents with personalized support, real-time emotional insights, and a stigma-free digital sanctuary — all built on the backbone of advanced AI and full-stack technology.
          </p>
        </div>

        {/* Optional Image Block (uncomment to use) */}
        {/*
        <div className="relative z-10">
          <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
              <img src="./group child.png" alt="Developer Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800">
            <span className="text-3xl">💻</span>
          </div>
        </div>
        */}
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-12">
        <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
      </div>
    </div>
  );
}

export default About;
