import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setSubscribed(false); // hide message after 3 seconds
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="MindCare Logo"
                className="h-10 w-10 rounded-lg object-cover mr-2"
              />
              <span className="text-xl font-bold text-white">MindCare</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Providing comprehensive mental health support and resources to help
              you on your journey to wellness.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white">Our Services</a></li>
              <li><Link to="/assessment" className="text-gray-400 hover:text-white">Mental Health Assessment</Link></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white">User Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Mental Health Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Self-Help Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Crisis Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              {/* <li className="flex items-start">
                <MapPin className="w-5 h-5 text-indigo-400 mr-3 mt-1" />
                <span>
                  123 Wellness Street<br />
                  Mental Health District<br />
                  Mindful City, MC 12345
                </span>
              </li> */}
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-indigo-400 mr-3" />
                <a href="tel:+11234567890" className="hover:text-white">(123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-indigo-400 mr-3" />
                <a href="mailto:info@mindcare.com" className="hover:text-white">support@mindcare.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center text-indigo-300">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 text-center mb-4">
              Stay updated with the latest mental health resources and tips.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm mt-4 text-center">
                Successfully subscribed!
              </p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {currentYear} MindCare. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-2">
            If you're experiencing a mental health emergency, please call the National Suicide Prevention Lifeline at 988 or 1-800-273-8255
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
