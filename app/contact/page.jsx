'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@components/Header';
import { db } from '../../services/firebase'; // Updated path to Firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Add global styles for the gradient animation, float animation, fade-in animation, and smooth scrolling
const styles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  html {
    scroll-behavior: smooth;
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-gradient {
    animation: gradientShift 15s ease infinite;
  }
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Inject global styles */}
      <style>{styles}</style>

      <div className="min-h-screen bg-gradient-to-r from-sky-300 to-blue-900 animate-gradient bg-[length:200%_200%]">
        {/* Header Component */}
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-12 text-center">
          <div className="container mx-auto px-6">
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h1 className="text-5xl font-bold text-black mb-4">Get in Touch</h1>
              <p className="text-xl text-black max-w-2xl mx-auto">
                We’d love to hear from you! Whether you have a question, feedback, or just want to chat, reach out to OpenSignal today.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Contact Form and WhatsApp Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Form Box */}
              <div className="bg-gradient-to-r from-blue-50/80 to-sky-100/80 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-200 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 animate-float animate-fadeIn">
                <div className="px-6 py-6">
                  <h2 className="text-2xl font-semibold text-center text-blue-900 mb-4">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-black font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-black font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-black font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="+1234567890"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-black font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-2 rounded-md text-white font-semibold transition-colors ${
                        isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    {submitStatus === 'success' && (
                      <p className="text-center text-green-600 mt-2">Message sent successfully! We’ll get back to you soon.</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-center text-red-600 mt-2">Something went wrong. Please try again later.</p>
                    )}
                  </form>
                </div>
              </div>

              {/* WhatsApp Box */}
              <div className="bg-gradient-to-r from-sky-100/80 to-green-50/80 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.3)] border border-green-200 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300 animate-float animate-fadeIn">
                <div className="px-6 py-6 text-center">
                  <h2 className="text-2xl font-semibold text-green-900 mb-4">Reach Out on WhatsApp</h2>
                  <p className="text-black mb-6">
                    Prefer to chat instantly? Send us a message on WhatsApp, and let’s connect!
                  </p>
                  <a
                    href="https://wa.me/+256757773330?text=Hello%20OpenSignal,%20I%20have%20a%20question!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Message Us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-block bg-transparent border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}