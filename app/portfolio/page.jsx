



'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@components/Header';
import Typed from 'typed.js';

// Add global styles for animations and smooth scrolling
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
  @keyframes colorChange {
    0% { color: #60A5FA; } /* Sky blue */
    33% { color: #34D399; } /* Green */
    66% { color: #A78BFA; } /* Purple */
    100% { color: #60A5FA; } /* Back to sky blue */
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
  .animate-color {
    animation: colorChange 6s infinite;
  }
  .grid-pattern {
    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
`;

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  // Sample project data (updated with your projects and suggestions)
  const projects = [
    {
      id: 1,
      title: "On-Ramp for Crypto Payments",
      category: "Web3",
      description: "A seamless on-ramp solution for converting fiat to crypto, enabling easy payments for Web3 applications.",
      image: "/images/on-ramp.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Arbitrage Trading Bot (Stablecoins)",
      category: "Web3",
      description: "An automated bot that exploits price differences of stablecoins across exchanges for profit.",
      image: "/images/arbitrage-bot.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Arbitrage Trading Bot (Shitcoins)",
      category: "Web3",
      description: "A high-risk, high-reward bot designed to trade volatile shitcoins for arbitrage opportunities.",
      image: "/images/shitcoin-bot.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Decentralized Lending Platform",
      category: "DeFi",
      description: "A lending platform that connects borrowers and lenders without intermediaries, earning fees on transactions.",
      image: "/images/lending-platform.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Blockchain Supply Chain Tracker",
      category: "Web3",
      description: "A blockchain-based solution for transparent supply chain tracking, with potential for monetization through SaaS.",
      image: "/images/supply-chain.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "Cross-Chain Bridge for Asset Transfers",
      category: "Web3",
      description: "A bridge that enables secure asset transfers between different blockchains, charging fees per transaction.",
      image: "/images/cross-chain-bridge.jpg",
      link: "#",
    },
  ];

  // Filter projects based on category
  const filteredProjects = filter === 'All' ? projects : projects.filter(project => project.category === filter);

  // Typing animation with scroll trigger
  useEffect(() => {
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Initialize Typed.js for heading
            const headingTyped = new Typed(headingEl, {
              strings: ["Our Work in Blockchain & DeFi"],
              typeSpeed: 50,
              showCursor: true,
              cursorChar: "|",
              onComplete: () => {
                // Initialize Typed.js for description after heading is done
                new Typed(descriptionEl, {
                  strings: ["Discover how OpenSignal is shaping the future of decentralized finance and blockchain technology through innovative projects and solutions."],
                  typeSpeed: 30,
                  showCursor: true,
                  cursorChar: "|",
                });
              },
            });
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    const heroSection = document.querySelector('#hero-section');
    if (heroSection) observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inject global styles */}
      <style>{styles}</style>

      <div className="min-h-screen bg-gradient-to-r from-sky-300 to-blue-900 animate-gradient bg-[length:200%_200%]">
        {/* Header Component */}
        <Header />

        {/* Hero Section */}
        <section id="hero-section" className="pt-24 pb-12 text-center">
          <div className="container mx-auto px-6">
            <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h1 className="text-5xl font-bold text-black mb-4 animate-color">
                <span ref={headingRef}></span>
              </h1>
              <p className="text-xl text-black max-w-2xl mx-auto animate-color">
                <span ref={descriptionRef}></span>
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              {['All', 'Web3', 'DeFi'].map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${
                    filter === category ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  className="relative bg-gradient-to-br from-blue-900/80 to-sky-700/80 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 animate-float animate-fadeIn grid-pattern"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-blue-200 text-sm mb-2">{project.category}</p>
                    <p className="text-white mb-4">{project.description}</p>
                    <a
                      href={project.link}
                      className="inline-block bg-transparent border-2 border-blue-400 text-blue-400 py-2 px-4 rounded-md hover:bg-blue-400 hover:text-white transition-colors"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center text-white mb-8">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-900/80 to-sky-700/80 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 animate-float animate-fadeIn grid-pattern text-center p-6">
                <h3 className="text-4xl font-bold text-blue-300 mb-2">3</h3>
                <p className="text-white">Revenue-Generating Bots</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/80 to-sky-700/80 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 animate-float animate-fadeIn grid-pattern text-center p-6">
                <h3 className="text-4xl font-bold text-blue-300 mb-2">2</h3>
                <p className="text-white">DeFi Platforms Built</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/80 to-sky-700/80 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 animate-float animate-fadeIn grid-pattern text-center p-6">
                <h3 className="text-4xl font-bold text-blue-300 mb-2">1</h3>
                <p className="text-white">Cross-Chain Solution</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-900/80 to-sky-700/80 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 animate-float animate-fadeIn grid-pattern p-8">
              <h2 className="text-3xl font-semibold text-white mb-4">Let’s Build the Future Together</h2>
              <p className="text-blue-200 max-w-2xl mx-auto mb-6">
                Interested in collaborating on a blockchain or DeFi project? Reach out to OpenSignal, and let’s make it happen!
              </p>
              <Link
                href="/contact"
                className="inline-block bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Back to Home Link */}
        <div className="py-8 text-center">
          <Link
            href="/"
            className="inline-block bg-transparent border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}