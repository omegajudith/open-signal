'use client';

import Link from 'next/link';
import Header from '@components/Header';

// Add global styles for the gradient animation, float animation, and smooth scrolling
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
  html {
    scroll-behavior: smooth;
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-gradient {
    animation: gradientShift 15s ease infinite;
  }
`;

export default function About() {
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
              <h1 className="text-5xl font-bold text-black mb-4">Welcome to OpenSignal</h1>
              <p className="text-xl text-black max-w-2xl mx-auto">
                Your beacon in the digital noise—unlocking the future of tech with blockchain, Web3, and decentralization, while inspiring you with diverse insights.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 space-y-12">
            {/* Who We Are */}
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
              <h2 className="text-3xl font-semibold text-black mb-4 text-center">Who We Are</h2>
              <div className="prose text-black">
                <p>
                  Hey there, curious reader! We’re OpenSignal—a platform on a mission to cut through the chaos of the internet and bring you content that truly matters.
                </p>
                <p>
                  At our core, we’re passionate about the future of tech, with a special focus on blockchain, Web3, and decentralization. We’re here to make these game-changing concepts accessible to everyone, no matter your background.
                </p>
                <p>
                  But we’re more than just tech enthusiasts—we’re your go-to source for diverse topics like parenting, sustainable farming, music, mental health, and more. OpenSignal is where education meets inspiration.
                </p>
              </div>
            </div>

            {/* Our Story */}
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
              <h2 className="text-3xl font-semibold text-black mb-4 text-center">Our Story</h2>
              <div className="prose text-black">
                <p>
                  OpenSignal was born out of a simple frustration: there’s too much noise online, and not enough signal. Everyone else is just a noise maker, but we wanted to be different.
                </p>
                <p>
                  It all started with a single idea—to make tech, especially blockchain and Web3, understandable for everyone. We kicked things off with a blog post breaking down decentralization in a way that just clicked.
                </p>
                <p>
                  From there, we expanded our horizons. We began exploring diverse topics that matter to real people—like how to practice sustainable farming, ways to support mental health, or the role of music in our lives.
                </p>
                <p>
                  Today, OpenSignal is a growing platform that’s all about clarity and connection. We’re here to educate, inspire, and amplify what matters, one story at a time.
                </p>
              </div>
            </div>

            {/* What We Offer */}
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
              <h2 className="text-3xl font-semibold text-black mb-4 text-center">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-sky-200 to-blue-400 rounded-lg shadow-md text-center">
                  <span className="text-4xl mb-4 block">📝</span>
                  <h3 className="text-xl font-semibold text-black mb-2">Tech & Blockchain Education</h3>
                  <p className="text-black">
                    Dive into articles that break down complex topics like blockchain, Web3, and decentralization in a way anyone can understand.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-200 to-blue-600 rounded-lg shadow-md text-center">
                  <span className="text-4xl mb-4 block">🌟</span>
                  <h3 className="text-xl font-semibold text-black mb-2">Diverse Topics</h3>
                  <p className="text-black">
                    From farming tips to music insights to mental health advice, we cover a wide range of topics to inspire and educate across all walks of life.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-sky-100 to-blue-500 rounded-lg shadow-md text-center">
                  <span className="text-4xl mb-4 block">💡</span>
                  <h3 className="text-xl font-semibold text-black mb-2">Everyday Wisdom for Modern Life</h3>
                  <p className="text-black">
                    Discover practical advice for parenting, self-care, and sustainable living—your go-to guide for navigating life’s challenges with confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
              <h2 className="text-3xl font-semibold text-black mb-4 text-center">Our Mission</h2>
              <div className="prose text-black">
                <p>
                  At OpenSignal, we believe in the power of clarity. Our mission is to educate and inspire by delivering content that cuts through the noise and delivers real value.
                </p>
                <p>
                  We’re here to make tech—especially blockchain and Web3—accessible to everyone, while also exploring diverse topics that matter to you, from mental health to parenting to sustainable farming.
                </p>
                <p>
                  Through insightful articles, we’re building a space where learning is fun, actionable, and meaningful. Let’s make the digital world a clearer place together!
                </p>
              </div>
            </div>

            {/* Why OpenSignal Matters */}
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
              <h2 className="text-3xl font-semibold text-black mb-4 text-center">Why OpenSignal Matters</h2>
              <div className="prose text-black">
                <p>
                  In a world where information is everywhere, finding the good stuff can feel like searching for a needle in a haystack. That’s where OpenSignal comes in.
                </p>
                <p>
                  While everyone else is busy making noise, we’re here to be your signal—bringing you content that’s worth your time. No fluff, no filler—just insights, education, and inspiration.
                </p>
                <p>
                  Whether you’re curious about blockchain, eager to explore topics like music or mental health, or looking for practical parenting tips, OpenSignal is your trusted guide.
                </p>
                <p>
                  We’re not just another blog. We’re a platform that’s passionate about making the internet a better place, one piece of content at a time.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
              <h2 className="text-3xl font-semibold text-black mb-4 text-center">Our Vision</h2>
              <div className="prose text-black">
                <p>
                  We dream of a digital world where quality content reigns supreme. A world where every click leads to something meaningful—whether it’s a lesson on Web3, a mental health tip, or a parenting hack.
                </p>
                <p>
                  Our vision is to make OpenSignal your go-to destination for education and inspiration across a wide range of topics. We want to empower you with knowledge that matters.
                </p>
                <p>
                  As we grow, we’ll keep pushing the boundaries of what a platform can be. More topics, more insights, more connections—stay tuned for what’s next!
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float text-center">
              <h2 className="text-3xl font-semibold text-black mb-4">Ready to Explore?</h2>
              <div className="prose text-black mb-6">
                <p>
                  We’ve got a lot to share, and we’d love for you to be part of it. Dive into our blog, explore our diverse topics, or drop us a line—we can’t wait to connect!
                </p>
                <p>
                  Let’s make the internet a brighter, clearer place together. What are you waiting for?
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/blog"
                  className="inline-block bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Read Our Blog
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}