// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import profileImage from '../assets/project3-image.jpg';
// import './sparkles.css';

// function Hero() {
//   const [flipped, setFlipped] = useState(false);
//   const [showImage, setShowImage] = useState(false);
//   const [typedText, setTypedText] = useState('');
//   const fullText = 'Welcome to MindCare 👋';

//   // Professional typing effect
//   useEffect(() => {
//     if (typedText.length < fullText.length) {
//       const timeout = setTimeout(() => {
//         setTypedText(fullText.slice(0, typedText.length + 1));
//       }, 100);
//       return () => clearTimeout(timeout);
//     }
//   }, [typedText]);

//   // Start typing when component mounts
//   useEffect(() => {
//     setTypedText('');
//   }, []);

//   const handleClick = () => {
//     setFlipped(true);
//     setShowImage(true);
//   };

//   const handleDoubleClick = () => {
//     setFlipped(false);
//     setShowImage(false);
//   };

//   return (
//     <section
//       id="hero"
//       className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center text-white overflow-hidden"
//     >
//       {/* Professional animated background with subtle 3D depth */}
//       <div className="absolute inset-0 bg-black/50 z-0 backdrop-blur-sm"></div>

//       {/* Enhanced glowing particle background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-ping" />
//         <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-ping" />
//       </div>

//       {/* Subtle floating particles */}
//       <div className="absolute inset-0 z-0 opacity-40">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animation: `float ${5 + Math.random() * 10}s linear infinite`,
//               opacity: Math.random() * 0.5 + 0.3
//             }}
//           />
//         ))}
//       </div>

//       <div className="z-10 text-center px-6 md:px-12 max-w-6xl mx-auto">
//         {/* Premium logo badge */}
//         <motion.div
//           className="mx-auto mb-6 bg-white/10 backdrop-blur-md p-3 rounded-full w-24 h-24 flex items-center justify-center border border-white/30"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1, rotate: 360 }}
//           transition={{ duration: 1.2, type: "spring" }}
//         >
//           <span className="text-4xl">💭</span>
//         </motion.div>

//         {/* Professional typing heading with premium gradient */}
//         <motion.h1
//           className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight cursor-pointer"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//           onClick={handleClick}
//         >
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 relative">
//             {typedText}
//             <span className="absolute right-0 top-0 h-full w-1 bg-white animate-blink"></span>
//           </span>
//         </motion.h1>

//         {/* Enhanced subtitle with gradient badge */}
//         <motion.div
//           className="mt-8"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 1 }}
//         >
//           {!flipped && (
//             <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full shadow-lg">
//               <p className="text-lg md:text-2xl font-medium">
//                 Empowering Youth, One Thought at a Time ✨
//               </p>
//             </div>
//           )}
//         </motion.div>

//         {/* Enhanced 3D card with premium effects */}
//         <motion.div
//           className="relative mt-10 w-72 md:w-96 lg:w-[28rem] h-[24rem] md:h-[28rem] lg:h-[32rem] mx-auto perspective hover:scale-105 transition-transform duration-500"
//           initial={{ rotateY: 0 }}
//           animate={{ rotateY: flipped ? 180 : 0 }}
//           transition={{ duration: 0.8 }}
//           style={{ transformStyle: 'preserve-3d' }}
//           onDoubleClick={handleDoubleClick}
//         >
//           {/* Enhanced front face with 3D depth */}
//           <div
//             className={`absolute w-full h-full rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 shadow-2xl backface-hidden flex flex-col items-center justify-center gap-6 transition-all duration-500 ease-in-out ${flipped ? 'opacity-0' : 'opacity-100'}`}
//           >
//             <motion.div
//               className="text-6xl"
//               animate={{
//                 y: [0, -10, 0],
//                 scale: [1, 1.1, 1]
//               }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 3
//               }}
//             >
//               🧠
//             </motion.div>
//             <p className="text-xl font-semibold text-white">Click to discover MindCare</p>
//             <div className="absolute bottom-6 w-16 h-1 bg-white/50 rounded-full animate-pulse"></div>
//           </div>

//           {/* Enhanced back face with premium photo treatment */}
//           <div
//             className="absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 transform rotateY-180 backface-hidden transition-all duration-700 flex items-center justify-center"
//           >
//             {flipped && (
//               <div className="relative w-full h-full">
//                 <img
//                   src={profileImage}
//                   alt="MindCare"
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                   style={{
//                     filter: 'brightness(0.8) contrast(1.25) saturate(1.1)',
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
//                   <h3 className="text-2xl font-bold text-white mb-2">MindCare</h3>
//                   <p className="text-white/80 text-sm">A revolutionary approach to mental wellness, designed for today's youth.</p>
//                 </div>
//                 <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm">
//                   Double-click to go back
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Enhanced sparkles */}
//           {showImage && (
//             <>
//               <div className="sparkle sparkle1 z-20"></div>
//               <div className="sparkle sparkle2 z-20"></div>
//               <div className="sparkle sparkle3 z-20"></div>
//               <div className="sparkle sparkle4 z-20"></div>
//               <div className="sparkle sparkle5 z-20"></div>
//             </>
//           )}
//         </motion.div>

//         {/* Call to action button */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//           className="mt-10"
//         >
//           <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
//             Explore MindCare
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default Hero;






// uppar wala bahut jyada pyara hai
/////////////////////





// ye bhi bahut bhaut accha hai
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Brain, HeartPulse, Sparkles, ArrowRight } from 'lucide-react';
// import './mindcare-animations.css';

// function Hero() {
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [typedText, setTypedText] = useState('');

//   const features = [
//     {
//       title: "Mental Wellness",
//       description: "Personalized mindfulness and mental health exercises for youth",
//       icon: <Brain className="w-12 h-12" />,
//       color: "from-blue-500 to-indigo-600"
//     },
//     {
//       title: "Emotional Support",
//       description: "AI-powered emotional analysis and support techniques",
//       icon: <HeartPulse className="w-12 h-12" />,
//       color: "from-pink-500 to-purple-600"
//     },
//     {
//       title: "Growth Mindset",
//       description: "Tools to build resilience and positive thinking habits",
//       icon: <Sparkles className="w-12 h-12" />,
//       color: "from-amber-400 to-orange-500"
//     }
//   ];

//   // Professional typing effect
//   const fullText = 'Welcome to MindCare 👋';
//   useEffect(() => {
//     if (typedText.length < fullText.length) {
//       const timeout = setTimeout(() => {
//         setTypedText(fullText.slice(0, typedText.length + 1));
//       }, 100);
//       return () => clearTimeout(timeout);
//     }
//   }, [typedText]);

//   // Start typing on component mount
//   useEffect(() => {
//     setTypedText('');
//   }, []);

//   // Auto rotate features
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       id="hero"
//       className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center text-white overflow-hidden"
//     >
//       {/* Professional depth layers */}
//       <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-sm"></div>

//       {/* Neural network animation background */}
//       <div className="absolute inset-0 z-0">
//         <div className="neural-network"></div>
//         <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-ping" />
//         <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
//       </div>

//       {/* Floating thought bubbles */}
//       <div className="absolute inset-0 z-0 opacity-40">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute"
//             initial={{ y: 0, x: 0, opacity: 0 }}
//             animate={{
//               y: [0, -100, -200, -300, -400],
//               x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20],
//               opacity: [0, 0.7, 0.7, 0.7, 0]
//             }}
//             transition={{
//               duration: 15,
//               repeat: Infinity,
//               repeatType: "loop",
//               delay: i * 3
//             }}
//             style={{
//               bottom: `${Math.random() * 20}%`,
//               left: `${20 + Math.random() * 60}%`,
//             }}
//           >
//             <div className="thought-bubble w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
//               {["💭", "✨", "🧠", "💙", "😌", "🔆", "💪", "💫"][i]}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="z-10 text-center px-6 py-16 md:py-0 md:px-12 max-w-6xl mx-auto">
//         {/* Brain logo with pulse animation */}
//         <motion.div
//           className="mx-auto mb-8 p-4"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.2, type: "spring" }}
//         >
//           <div className="relative">
//             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-70 animate-pulse-slow"></div>
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl relative">
//               <div className="brain-waves"></div>
//               <span className="text-4xl z-10">🧠</span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Professional typing heading with premium gradient */}
//         <motion.h1
//           className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 relative">
//             {typedText}
//             <span className="absolute right-0 top-0 h-full w-1 bg-white animate-blink"></span>
//           </span>
//         </motion.h1>

//         {/* Tagline with gradient badge */}
//         <motion.div
//           className="mt-8"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 1 }}
//         >
//           <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full shadow-lg">
//             <p className="text-lg md:text-2xl font-medium">
//               Empowering Youth, One Thought at a Time ✨
//             </p>
//           </div>
//         </motion.div>

//         {/* Interactive feature showcase */}
//         <motion.div
//           className="mt-16 mb-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.8 }}
//         >
//           <div className="relative h-96 md:h-[28rem] w-full max-w-3xl mx-auto">
//             {/* Feature cards carousel */}
//             <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFeature}
//                   className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} p-6 md:p-10 flex flex-col`}
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="h-full flex flex-col">
//                     {/* Feature content */}
//                     <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
//                       <motion.div
//                         className="p-4 bg-white/20 rounded-2xl backdrop-blur-md"
//                         initial={{ scale: 0.8, rotate: -5 }}
//                         animate={{ scale: 1, rotate: 0 }}
//                         transition={{ delay: 0.2, duration: 0.5 }}
//                       >
//                         {features[activeFeature].icon}
//                       </motion.div>

//                       <motion.h2
//                         className="text-3xl md:text-4xl font-bold"
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.3, duration: 0.5 }}
//                       >
//                         {features[activeFeature].title}
//                       </motion.h2>

//                       <motion.p
//                         className="text-xl text-white/90 max-w-lg"
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.4, duration: 0.5 }}
//                       >
//                         {features[activeFeature].description}
//                       </motion.p>
//                     </div>

//                     {/* Navigation dots */}
//                     <div className="flex justify-center gap-3 mt-6">
//                       {features.map((_, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setActiveFeature(idx)}
//                           className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeFeature
//                               ? "bg-white w-8"
//                               : "bg-white/50 hover:bg-white/80"
//                             }`}
//                           aria-label={`Go to feature ${idx + 1}`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Decorative elements */}
//             <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full blur-lg opacity-60"></div>
//             <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-400 rounded-full blur-lg opacity-60"></div>
//           </div>
//         </motion.div>

//         {/* Get started CTA button */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="mt-8"
//         >
//           <button className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 mx-auto hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
//             Get Started with MindCare
//             <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default Hero;




//3rd code

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import { Brain, HeartPulse, Sparkles, ArrowRight, Shield, BookOpen, Award } from 'lucide-react';
// import './mindcare-animations.css';

// function Hero() {
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [typedText, setTypedText] = useState('');
//   const [isHovered, setIsHovered] = useState(false);
//   const [scrollY, setScrollY] = useState(0);
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"]
//   });

//   const features = [
//     {
//       title: "Mental Wellness",
//       description: "Personalized mindfulness exercises designed specifically for youth development and mental health",
//       icon: <Brain className="w-12 h-12" />,
//       color: "from-blue-500 to-indigo-600",
//       highlights: ["Personalized Programs", "Stress Reduction", "Daily Mindfulness"]
//     },
//     {
//       title: "Emotional Support",
//       description: "Advanced AI-powered emotional analysis and targeted support techniques for teenagers",
//       icon: <HeartPulse className="w-12 h-12" />,
//       color: "from-pink-500 to-purple-600",
//       highlights: ["Emotion Tracking", "Mood Journaling", "Crisis Resources"]
//     },
//     {
//       title: "Growth Mindset",
//       description: "Scientifically-backed tools to build resilience, positive thinking habits and emotional intelligence",
//       icon: <Sparkles className="w-12 h-12" />,
//       color: "from-amber-400 to-orange-500",
//       highlights: ["Goal Setting", "Habit Formation", "Resilience Training"]
//     },
//     {
//       title: "Professional Guidance",
//       description: "Expert-designed cognitive behavioral techniques and professional mental health resources",
//       icon: <Shield className="w-12 h-12" />,
//       color: "from-emerald-400 to-teal-600",
//       highlights: ["Expert Content", "Research-Backed", "Licensed Techniques"]
//     }
//   ];

//   // Enhanced typing effect with cursor
//   const fullText = 'Welcome to MindCare  👋';
//   useEffect(() => {
//     if (typedText.length < fullText.length) {
//       const timeout = setTimeout(() => {
//         setTypedText(fullText.slice(0, typedText.length + 1));
//       }, 100);
//       return () => clearTimeout(timeout);
//     }
//   }, [typedText]);

//   // Start typing on component mount
//   useEffect(() => {
//     setTypedText('');
//   }, []);

//   // Auto rotate features with pause on hover
//   useEffect(() => {
//     if (isHovered) return;

//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isHovered, features.length]);

//   // Parallax scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Animation variants
//   const backgroundParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
//   const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

//   return (
//     <section
//       ref={heroRef}
//       id="hero"
//       className="relative min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 flex items-center justify-center text-white overflow-hidden"
//     >
//       {/* Depth layers with parallax effect */}
//       <motion.div
//         className="absolute inset-0 bg-black/40 z-0 backdrop-blur-md"
//         style={{
//           y: backgroundParallax,
//           opacity: opacityParallax
//         }}
//       ></motion.div>

//       {/* Enhanced neural network animation background */}
//       <div className="absolute inset-0 z-0">
//         <div className="neural-network"></div>
//         <motion.div
//           className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-600 opacity-20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.2, 0.3, 0.2],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2
//           }}
//         />
//         <motion.div
//           className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-600 opacity-20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.4, 1],
//             opacity: [0.2, 0.35, 0.2],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1
//           }}
//         />
//       </div>

//       {/* Premium 3D floating particles */}
//       <div className="absolute inset-0 z-0 opacity-40">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute"
//             initial={{
//               y: Math.random() * 1000,
//               x: Math.random() * 1000,
//               opacity: 0,
//               scale: 0.5
//             }}
//             animate={{
//               y: [null, Math.random() * -600 - 100],
//               x: [null, Math.random() * 40 - 20],
//               opacity: [0, 0.9, 0.9, 0.9, 0],
//               scale: [0.5, 1, 1, 1, 0.8],
//               rotate: [0, Math.random() * 180]
//             }}
//             transition={{
//               duration: 15 + Math.random() * 10,
//               repeat: Infinity,
//               repeatType: "loop",
//               ease: "easeInOut",
//               delay: i * 1.5
//             }}
//             style={{
//               bottom: `${Math.random() * 20}%`,
//               left: `${20 + Math.random() * 60}%`,
//             }}
//           >
//             <div className="thought-bubble w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-white/20">
//               {["💭", "✨", "🧠", "💙", "😌", "🔆", "💪", "💫", "🌟", "🎯", "🌱", "⚡"][i]}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Premium content container with glass effect */}
//       <motion.div
//         className="z-10 text-center px-6 py-16 md:py-0 md:px-12 max-w-6xl mx-auto"
//         style={{ opacity: opacityParallax }}
//       >
//         {/* Enhanced brain logo with dynamic pulse animation */}
//         <motion.div
//           className="mx-auto mb-8 p-4"
//           initial={{ scale: 0, rotate: -10 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
//         >
//           <div className="relative">
//             <motion.div
//               className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 blur-lg opacity-70"
//               animate={{
//                 scale: [1, 1.2, 1.1, 1.3, 1],
//               }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             ></motion.div>
//             <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl relative">
//               <div className="brain-waves"></div>
//               <motion.span
//                 className="text-4xl z-10"
//                 animate={{
//                   scale: [1, 1.1, 1],
//                   rotate: [0, 5, 0, -5, 0]
//                 }}
//                 transition={{
//                   duration: 5,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               >🧠</motion.span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Professional typing heading with premium animated gradient */}
//         <motion.h1
//           className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="relative">
//             <motion.span
//               className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 inline-block"
//               animate={{
//                 backgroundPosition: ['0% center', '100% center', '0% center'],
//               }}
//               transition={{
//                 duration: 10,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               style={{
//                 backgroundSize: '200% auto',
//               }}
//             >
//               {typedText}
//             </motion.span>
//             <span className="absolute right-0 top-0 h-full w-1 bg-white animate-blink"></span>
//           </div>
//         </motion.h1>

//         {/* Enhanced tagline with 3D glass effect badge */}
//         <motion.div
//           className="mt-8"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 1 }}
//         >
//           <div className="inline-block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-6 py-3 rounded-full shadow-xl border border-white/20 backdrop-blur-md">
//             <motion.p
//               className="text-lg md:text-2xl font-medium"
//               animate={{
//                 textShadow: ['0 0 5px rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.5)', '0 0 5px rgba(255,255,255,0)'],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               Empowering Youth, One Thought at a Time ✨
//             </motion.p>
//           </div>
//         </motion.div>

//         {/* Enhanced interactive feature showcase with 3D effect */}
//         <motion.div
//           className="mt-16 mb-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.8 }}
//         >
//           <div
//             className="relative h-96 md:h-[28rem] w-full max-w-3xl mx-auto"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             {/* Premium feature cards carousel with 3D effect */}
//             <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
//               <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"></div>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeFeature}
//                   className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} p-6 md:p-10 flex flex-col`}
//                   initial={{ opacity: 0, x: 100, rotateY: 45 }}
//                   animate={{ opacity: 1, x: 0, rotateY: 0 }}
//                   exit={{ opacity: 0, x: -100, rotateY: -45 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                 >
//                   <div className="h-full flex flex-col">
//                     {/* Feature content with enhanced layout */}
//                     <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
//                       <motion.div
//                         className="p-6 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30 shadow-xl"
//                         initial={{ scale: 0.8, rotate: -5 }}
//                         animate={{
//                           scale: 1,
//                           rotate: 0,
//                           boxShadow: ['0 0 0px rgba(255,255,255,0.3)', '0 0 20px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0.3)']
//                         }}
//                         transition={{
//                           delay: 0.2,
//                           duration: 0.5,
//                           boxShadow: {
//                             duration: 2,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                           }
//                         }}
//                       >
//                         {features[activeFeature].icon}
//                       </motion.div>

//                       <motion.h2
//                         className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.3, duration: 0.5 }}
//                       >
//                         {features[activeFeature].title}
//                       </motion.h2>

//                       <motion.p
//                         className="text-xl text-white/90 max-w-lg"
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.4, duration: 0.5 }}
//                       >
//                         {features[activeFeature].description}
//                       </motion.p>

//                       {/* Feature highlights */}
//                       <motion.div
//                         className="flex flex-wrap justify-center gap-2 mt-2"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5, duration: 0.5 }}
//                       >
//                         {features[activeFeature].highlights.map((highlight, idx) => (
//                           <motion.span
//                             key={idx}
//                             className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20"
//                             initial={{ scale: 0, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
//                           >
//                             {highlight}
//                           </motion.span>
//                         ))}
//                       </motion.div>
//                     </div>

//                     {/* Enhanced navigation dots */}
//                     <div className="flex justify-center gap-3 mt-6">
//                       {features.map((_, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setActiveFeature(idx)}
//                           className={`h-3 rounded-full transition-all duration-300 ${idx === activeFeature
//                               ? "bg-white w-8"
//                               : "bg-white/50 hover:bg-white/80 w-3"
//                             }`}
//                           aria-label={`Go to feature ${idx + 1}`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Enhanced decorative elements */}
//             <motion.div
//               className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full blur-xl opacity-60"
//               animate={{
//                 scale: [1, 1.3, 1],
//                 opacity: [0.6, 0.8, 0.6],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             ></motion.div>
//             <motion.div
//               className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-400 rounded-full blur-xl opacity-60"
//               animate={{
//                 scale: [1, 1.4, 1],
//                 opacity: [0.6, 0.7, 0.6],
//               }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 1
//               }}
//             ></motion.div>
//           </div>
//         </motion.div>

//         {/* Enhanced CTA button with premium animations */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="mt-8"
//         >
//           <motion.button
//             className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 mx-auto hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//             style={{
//               backgroundSize: '200% auto',
//             }}
//             animate={{
//               backgroundPosition: ['0% center', '100% center', '0% center'],
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           >
//             <span className="relative z-10">Get Started with MindCare</span>
//             <motion.span
//               className="relative z-10"
//               animate={{ x: [0, 5, 0] }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 repeatType: "reverse"
//               }}
//             >
//               <ArrowRight className="w-5 h-5" />
//             </motion.span>
//             <motion.span
//               className="absolute inset-0 bg-white/20 z-0"
//               initial={{ x: '-100%', opacity: 0 }}
//               whileHover={{ x: '100%', opacity: 0.2 }}
//               transition={{ duration: 0.5 }}
//             />
//           </motion.button>
//         </motion.div>

//         {/* Trust badges */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5, duration: 1 }}
//           className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10"
//         >
//           {[
//             { icon: <Shield className="w-6 h-6" />, text: "Data Protected" },
//             { icon: <BookOpen className="w-6 h-6" />, text: "Research Backed" },
//             { icon: <Award className="w-6 h-6" />, text: "Award Winning" }
//           ].map((badge, idx) => (
//             <motion.div
//               key={idx}
//               className="flex items-center gap-2 text-white/80"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 1.5 + idx * 0.2, duration: 0.5 }}
//             >
//               {badge.icon}
//               <span className="text-sm font-medium">{badge.text}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>

//       {/* Scrolling indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 2, duration: 1 }}
//       >
//         <motion.div
//           className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <motion.div
//             className="w-1.5 h-1.5 bg-white rounded-full mt-2"
//             animate={{
//               y: [0, 12, 0],
//               opacity: [1, 0.2, 1]
//             }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           />
//         </motion.div>
//       </motion.div>

//       {/* CSS for animations that should be in mindcare-animations.css */}
//       <style jsx>{`
//         .neural-network {
//           position: absolute;
//           inset: 0;
//           background: 
//             radial-gradient(circle at 20% 35%, rgba(120, 0, 255, 0.15) 0%, transparent 50%),
//             radial-gradient(circle at 75% 44%, rgba(33, 150, 243, 0.15) 0%, transparent 50%),
//             radial-gradient(circle at 50% 80%, rgba(233, 30, 99, 0.15) 0%, transparent 50%);
//           z-index: -1;
//         }

//         .brain-waves:before, .brain-waves:after {
//           content: '';
//           position: absolute;
//           inset: -15px;
//           border: 2px solid white;
//           border-radius: 50%;
//           opacity: 0;
//           z-index: 0;
//           animation: ripple 3s infinite ease-out;
//         }

//         .brain-waves:after {
//           animation-delay: 1.5s;
//         }

//         @keyframes ripple {
//           0% { transform: scale(0.9); opacity: 0; }
//           50% { opacity: 0.3; }
//           100% { transform: scale(1.4); opacity: 0; }
//         }

//         .animate-blink {
//           animation: blink 1s step-start infinite;
//         }

//         @keyframes blink {
//           50% { opacity: 0; }
//         }
//       `}</style>
//     </section>
//   );
// }

// export default Hero;


//4th code



import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Brain, HeartPulse, Sparkles, ArrowRight, Shield, BookOpen, Award, Star, Zap, Clock } from 'lucide-react';
import './mindcare-animations.css';

function Hero() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const features = [
    {
      title: "Mental Wellness",
      description: "Personalized mindfulness exercises designed specifically for youth development and mental health",
      icon: <Brain className="w-12 h-12" />,
      color: "from-blue-500 to-indigo-600",
      highlights: ["Personalized Programs", "Stress Reduction", "Daily Mindfulness"]
    },
    {
      title: "Emotional Support",
      description: "Advanced AI-powered emotional analysis and targeted support techniques for teenagers",
      icon: <HeartPulse className="w-12 h-12" />,
      color: "from-pink-500 to-purple-600",
      highlights: ["Emotion Tracking", "Mood Journaling", "Crisis Resources"]
    },
    {
      title: "Growth Mindset",
      description: "Scientifically-backed tools to build resilience, positive thinking habits and emotional intelligence",
      icon: <Sparkles className="w-12 h-12" />,
      color: "from-amber-400 to-orange-500",
      highlights: ["Goal Setting", "Habit Formation", "Resilience Training"]
    },
    {
      title: "Professional Guidance",
      description: "Expert-designed cognitive behavioral techniques and professional mental health resources",
      icon: <Shield className="w-12 h-12" />,
      color: "from-emerald-400 to-teal-600",
      highlights: ["Expert Content", "Research-Backed", "Licensed Techniques"]
    }
  ];

  // Enhanced typing effect with cursor
  const fullText = 'Welcome to MindCare  👋';
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Start typing on component mount
  useEffect(() => {
    setTypedText('');
  }, []);

  // Auto rotate features with pause on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, features.length]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enhanced animation variants
  const backgroundParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Testimonials data
  const testimonials = [
    { name: "Emma, 16", text: "MindCare helped me understand my emotions better than ever before." },
    { name: "Jason, 18", text: "The daily exercises have truly transformed how I handle stress." },
    { name: "Sarah, 15", text: "I feel like I finally have tools to manage my anxiety. Thank you!" }
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950 flex items-center justify-center text-white overflow-hidden"
    >
      {/* Enhanced depth layers with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-black/40 z-0 backdrop-blur-md"
        style={{
          y: backgroundParallax,
          opacity: opacityParallax
        }}
      ></motion.div>

      {/* Enhanced neural network animation background */}
      <div className="absolute inset-0 z-0">
        <div className="neural-network"></div>

        {/* Animated 3D orbs with blur effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-96 h-96 opacity-20 rounded-full blur-3xl`}
            style={{
              background: `radial-gradient(circle at center, 
                ${['rgba(236,72,153,0.3)', 'rgba(79,70,229,0.3)', 'rgba(147,51,234,0.3)', 'rgba(6,182,212,0.3)', 'rgba(249,115,22,0.3)'][i % 5]}, 
                transparent)`,
              top: `${20 + i * 15}%`,
              left: `${15 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.2 + i * 0.05, 1],
              opacity: [0.15 + i * 0.01, 0.25 + i * 0.02, 0.15 + i * 0.01],
              x: [0, 20 + i * 5, 0],
              y: [0, 10 + i * 5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      {/* Enhanced 3D floating particles with depth effect */}
      <div className="absolute inset-0 z-0 opacity-60">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              y: Math.random() * 1000,
              x: Math.random() * 1000,
              opacity: 0,
              scale: 0.5,
              zIndex: Math.floor(Math.random() * 5)
            }}
            animate={{
              y: [null, Math.random() * -600 - 100],
              x: [null, Math.random() * 60 - 30],
              opacity: [0, 0.9, 0.9, 0.9, 0],
              scale: [0.5, 1, 1, 1, 0.8],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 1.2
            }}
            style={{
              bottom: `${Math.random() * 20}%`,
              left: `${20 + Math.random() * 60}%`,
              filter: `blur(${Math.random() * 1}px)`,
            }}
          >
            <div className="thought-bubble w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-white/30">
              {["💭", "✨", "🧠", "💙", "😌", "🔆", "💪", "💫", "🌟", "🎯", "🌱", "⚡", "🌈", "🦋", "💭", "❤️", "🌿", "🚀"][i]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium content container with enhanced glass effect */}
      <motion.div
        className="z-10 text-center px-6 py-16 md:py-0 md:px-12 max-w-6xl mx-auto"
        style={{ opacity: opacityParallax }}
      >
        {/* Enhanced logo with sophisticated animation */}
        <motion.div
          className="mx-auto mb-8 p-4"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
        >
          <div className="relative">
            {/* Dynamic pulsing effect */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 blur-lg opacity-70"
                animate={{
                  scale: [1, 1.2 + i * 0.1, 1],
                  opacity: [0.5 - i * 0.1, 0.7 - i * 0.1, 0.5 - i * 0.1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8
                }}
              ></motion.div>
            ))}

            {/* Enhanced brain logo container */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl relative">
              <div className="brain-waves"></div>
              <div className="spinning-particles"></div>
              <motion.span
                className="text-4xl z-10"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, 0, -5, 0],
                  filter: ['drop-shadow(0 0 8px rgba(255,255,255,0.5))', 'drop-shadow(0 0 15px rgba(255,255,255,0.8))', 'drop-shadow(0 0 8px rgba(255,255,255,0.5))']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >🧠</motion.span>
            </div>
          </div>
        </motion.div>

        {/* Ultra premium typing heading with animated gradient */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 inline-block"
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: '200% auto',
                filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))',
              }}
            >
              {typedText}
            </motion.span>
            <span className="absolute right-0 top-0 h-full w-1 bg-white animate-blink"></span>
          </div>
        </motion.h1>

        {/* Premium 3D floating tagline with enhanced glass effect */}
        <motion.div
          className="mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="inline-block relative">
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Premium glass effect tagline */}
            <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-8 py-4 rounded-full shadow-2xl border border-white/30 backdrop-blur-md">
              <motion.p
                className="text-lg md:text-2xl font-medium"
                animate={{
                  textShadow: ['0 0 5px rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.6)', '0 0 5px rgba(255,255,255,0)'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Empowering Youth, One Thought at a Time ✨
              </motion.p>

              {/* Decorative accent elements */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Enhanced 3D interactive feature showcase with premium effects */}
        <motion.div
          className="mt-16 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div
            className="relative h-96 md:h-[28rem] w-full max-w-3xl mx-auto perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating decorative elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-white/30 z-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15],
                  x: [0, Math.random() * 30 - 15],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Premium feature cards carousel with enhanced 3D effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/30 shadow-2xl transform preserve-3d">
              {/* Layered glass background */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 z-0"></div>

              {/* Feature card with enhanced 3D transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} p-6 md:p-10 flex flex-col`}
                  initial={{ opacity: 0, x: 100, rotateY: 45, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, rotateY: -45, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="h-full flex flex-col">
                    {/* Enhanced feature content with premium layout */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
                      <motion.div
                        className="p-6 bg-white/20 rounded-2xl backdrop-blur-md border border-white/40 shadow-2xl relative"
                        initial={{ scale: 0.8, rotate: -5 }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                          boxShadow: ['0 0 0px rgba(255,255,255,0.3)', '0 0 30px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0.3)']
                        }}
                        transition={{
                          delay: 0.2,
                          duration: 0.5,
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                        }}
                      >
                        {/* Decorative rings around icon */}
                        <motion.div
                          className="absolute inset-0 border-2 border-white/20 rounded-2xl"
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        {features[activeFeature].icon}
                      </motion.div>

                      <motion.h2
                        className="text-3xl md:text-4xl font-bold"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {/* Animated gradient text */}
                        <span className="bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent animate-shimmer">
                          {features[activeFeature].title}
                        </span>
                      </motion.h2>

                      <motion.p
                        className="text-xl text-white/90 max-w-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {features[activeFeature].description}
                      </motion.p>

                      {/* Enhanced feature highlights with floating animation */}
                      <motion.div
                        className="flex flex-wrap justify-center gap-3 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {features[activeFeature].highlights.map((highlight, idx) => (
                          <motion.span
                            key={idx}
                            className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 flex items-center gap-1.5"
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(255,255,255,0.2)",
                              transition: { duration: 0.2 }
                            }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                          >
                            <motion.span
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                              ✦
                            </motion.span>
                            {highlight}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Enhanced navigation dots with premium style */}
                    <div className="flex justify-center gap-3 mt-6">
                      {features.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveFeature(idx)}
                          className="group relative"
                          aria-label={`Go to feature ${idx + 1}`}
                        >
                          <motion.div
                            className={`h-3 rounded-full transition-all duration-300 ${idx === activeFeature
                              ? "bg-white w-8"
                              : "bg-white/40 group-hover:bg-white/70 w-3"
                              }`}
                          />
                          {idx === activeFeature && (
                            <motion.div
                              className="absolute inset-0 rounded-full bg-white/50 blur-sm"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1.5 }}
                              exit={{ opacity: 0, scale: 2 }}
                              transition={{ duration: 0.5 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced decorative glowing elements */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-16 h-16 rounded-full blur-xl opacity-60`}
                style={{
                  background: `radial-gradient(circle at center, 
                    ${['rgba(236,72,153,0.7)', 'rgba(79,70,229,0.7)', 'rgba(147,51,234,0.7)', 'rgba(6,182,212,0.7)'][i]}, 
                    transparent)`,
                  top: `${['-10%', '100%', '40%', '70%'][i]}`,
                  left: `${['90%', '-5%', '100%', '5%'][i]}`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced testimonials slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="relative mt-8 mb-12 max-w-xl mx-auto"
        >
          <div className="relative">
            {/* Decorative quote marks */}
            <motion.div
              className="absolute -left-6 -top-6 text-4xl text-purple-400 opacity-50"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
                rotate: [-5, 0, -5]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              "
            </motion.div>
            <motion.div
              className="absolute -right-6 -bottom-6 text-4xl text-blue-400 opacity-50"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
                rotate: [5, 0, 5]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              "
            </motion.div>

            {/* Testimonials slider */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature % testimonials.length}
                className="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="italic text-white/90">{testimonials[activeFeature % testimonials.length].text}</p>
                <p className="mt-3 font-medium text-right text-white">— {testimonials[activeFeature % testimonials.length].name}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Ultra premium CTA button with advanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 relative"
        >
          {/* Button glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-600/30 to-blue-500/30 blur-xl rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Premium CTA button */}
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 mx-auto hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundSize: '200% auto',
            }}
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Animated particle effects on button */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.5,
                  opacity: 0.7
                }}
                animate={{
                  x: [0, (Math.random() * 100 - 50)],
                  y: [0, (Math.random() * -100 - 50)],
                  scale: [0.5, 0],
                  opacity: [0.7, 0]
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatDelay: Math.random() * 2,
                  delay: Math.random() * 2
                }}
              />
            ))}

            <motion.span
              className="absolute inset-0 bg-white/20 z-0"
              initial={{ x: '-100%', opacity: 0 }}
              whileHover={{ x: '100%', opacity: 0.2 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>






      </motion.div>

      {/* Enhanced scrolling indicator with advanced animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center relative overflow-hidden"
          whileHover={{ borderColor: 'rgba(255,255,255,0.8)' }}
        >
          {/* Animated glowing background */}

          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.2, 1],
              boxShadow: ['0 0 0px rgba(255,255,255,0.3)', '0 0 10px rgba(255,255,255,0.8)', '0 0 0px rgba(255,255,255,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.p
          className="text-xs text-white/60 mt-2 text-center"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >

        </motion.p>
      </motion.div>

      {/* CSS for enhanced animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .neural-network {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 35%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 75% 44%, rgba(56, 189, 248, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 10%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
          z-index: -1;
        }

        .brain-waves:before, .brain-waves:after {
          content: '';
          position: absolute;
          inset: -15px;
          border: 2px solid white;
          border-radius: 50%;
          opacity: 0;
          z-index: 0;
          animation: ripple 3s infinite ease-out;
        }

        .brain-waves:after {
          animation-delay: 1.5s;
        }

        .spinning-particles:before, .spinning-particles:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: transparent;
          border: 2px dotted rgba(255,255,255,0.3);
          animation: spin 20s linear infinite;
        }

        .spinning-particles:after {
          width: 85%;
          height: 85%;
          animation-duration: 15s;
          animation-direction: reverse;
        }

        @keyframes ripple {
          0% { transform: scale(0.9); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-blink {
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .text-gradient-blue {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .animate-shimmer {
          background-size: 200% auto;
          background-position: 0% center;
          animation: shimmer 3s ease-in-out infinite alternate;
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
      `}</style>

      {/* This code should reference an external CSS file: mindcare-animations.css */}
      {/* Expected contents of mindcare-animations.css:
      
      .thought-bubble {
        position: relative;
        overflow: visible;
      }
      
      .thought-bubble::before {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        background: inherit;
        filter: blur(4px);
        opacity: 0.7;
        z-index: -1;
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      
      @keyframes shimmer {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      */}
    </section>
  );
}

export default Hero;