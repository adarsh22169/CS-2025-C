// import React from 'react';

// function Contact() {
//   return (
//     <section id="contact" className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//       <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-12">
//         Get In Touch
//       </h2>

//       <div className="flex flex-col md:flex-row justify-between px-6 md:px-16 space-y-12 md:space-y-0 md:space-x-12">
//         {/* Left side: Contact Form */}
//         <div className="w-full md:w-1/2 p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 ease-in-out">
//           <h3 className="text-3xl font-semibold text-yellow-300 mb-6">Reach Out to Me</h3>
//           <form className="space-y-6">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="p-4 w-full mb-4 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="p-4 w-full mb-4 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
//             />
//             <textarea
//               placeholder="Your Message"
//               className="p-4 w-full mb-4 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
//               rows="4"
//             ></textarea>
//             <button className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white p-4 w-full rounded-md hover:scale-105 transition-transform duration-300 ease-out shadow-lg">
//               Send Message
//             </button>
//           </form>
//         </div>

//         {/* Right side: Contact Info */}
//         <div className="w-full md:w-1/2 p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 ease-in-out">
//           <h3 className="text-3xl font-semibold text-yellow-300 mb-6">Connect With Me</h3>
//           <ul className="space-y-6">
//             <li className="flex items-center space-x-4">
//               <strong className="text-lg">Email:</strong>
//               <a href="mindcare@gmail.com.com" className="text-lg text-white hover:text-yellow-400 transition duration-300">
//                 Link
//               </a>
//             </li>
//             <li className="flex items-center space-x-4">
//               <strong className="text-lg">Phone:</strong>
//               <span className="text-lg text-white">+9114825225</span>
//             </li>
//             <li className="flex items-center space-x-4">
//               <strong className="text-lg">Twitter:</strong>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-yellow-400 transition duration-300">
//                 @akanksha
//               </a>
//             </li>
//             {/* <li className="flex items-center space-x-4">
//               <strong className="text-lg">LeetCode:</strong>
//               <a href="https://leetcode.com/akanksha" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-yellow-400 transition duration-300">
//                 akanksha
//               </a>
//             </li> */}
//             <li className="flex items-center space-x-4">
//               <strong className="text-lg">GitHub:</strong>
//               <a href="https://github.com/akanksha" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-yellow-400 transition duration-300">
//                 akanksha
//               </a>
//             </li>
//             {/* Add more social/contact links here */}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Contact;



import React, { useState } from 'react';

function Contact() {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);

    // Optional: Reset message after few seconds
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-12">
        Get In Touch
      </h2>

      <div className="flex flex-col md:flex-row justify-between px-6 md:px-16 space-y-12 md:space-y-0 md:space-x-12">
        {/* Left side: Contact Form */}
        <div className="w-full md:w-1/2 p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 ease-in-out">
          <h3 className="text-3xl font-semibold text-yellow-300 mb-6">Reach Out to Me</h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 w-full mb-4 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 w-full mb-4 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
              required
            />
            <textarea
              placeholder="Your Message"
              className="p-4 w-full mb-4 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
              rows="4"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white p-4 w-full rounded-md hover:scale-105 transition-transform duration-300 ease-out shadow-lg"
            >
              Send Message
            </button>

            {showMessage && (
              <p className="mt-4 text-green-300 font-semibold text-center">Message sent successfully!</p>
            )}
          </form>
        </div>

        {/* Right side: Contact Info */}
        <div className="w-full md:w-1/2 p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 ease-in-out">
          <h3 className="text-3xl font-semibold text-yellow-300 mb-6">Connect With Me</h3>
          <ul className="space-y-6">
            <li className="flex items-center space-x-4">
              <strong className="text-lg">📧 Email:</strong>
              <a href="mailto:support@mindcare.com" className="text-lg text-white hover:text-yellow-400 transition duration-300">
                support@mindcare.com
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <strong className="text-lg">📞 Helpline:</strong>
              <span className="text-lg text-white">(123) 456-7890</span>
            </li>


            <li className="flex items-center space-x-4">
              <strong className="text-lg">💬 WhatsApp:</strong>
              <a href="https://wa.me/918001234567" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-yellow-400 transition duration-300">
                Chat Now
              </a>
            </li>


            <li className="flex items-center space-x-4">
              <strong className="text-lg">🔗 LinkedIn:</strong>
              <a href="https://linkedin.com/company/mindcare" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-yellow-400 transition duration-300">
                linkedin.com/mindcare
              </a>
            </li>

            <li className="flex items-center space-x-4">
              <strong className="text-lg">🔗 Instagram:</strong>
              <a href="https://instagram.com/mindcare" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-yellow-400 transition duration-300">
                @mindcare
              </a>
            </li>

            <li className="flex items-center space-x-4">
              <strong className="text-lg">🔗 YouTube:</strong>
              <a href="https://youtube.com/@mindcare" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-yellow-400 transition duration-300">
                youtube.com/@mindcare
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Contact;
