'use client';

import Link from 'next/link';
import Header from '@components/Header';

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

export default function Disclaimer() {
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
              <h1 className="text-5xl font-bold text-black mb-4">Disclaimer</h1>
              <p className="text-xl text-black max-w-2xl mx-auto">
                At OpenSignal, we’re committed to cutting through the noise with clarity and education. Here’s what you need to know about our content.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 space-y-12">
            {/* General Disclaimer */}
            <div className="mt-6 bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-md shadow-lg border-l-4 border-blue-400 transform hover:scale-105 hover:rotate-1 transition-transform duration-300 animate-float animate-fadeIn">
              <div className="bg-blue-100 text-blue-900 px-8 py-3 rounded-t-md">
                <h2 className="text-3xl font-semibold text-center">General Disclaimer</h2>
              </div>
              <div className="px-8 py-6 prose text-black">
                <p>
                  The content on OpenSignal (the “Platform”) is provided for informational and educational purposes only. We aim to deliver accurate and insightful content across a wide range of topics, including technology, blockchain, Web3, decentralization, parenting, farming, music, mental health, and more.
                </p>
                <p>
                  However, the information we provide is not intended to be a substitute for professional advice, whether financial, legal, medical, agricultural, or otherwise. You should not rely on our content as the sole basis for making decisions, and we strongly recommend consulting with qualified professionals tailored to your specific circumstances.
                </p>
                <p>
                  OpenSignal, its creators, and affiliates make no representations or warranties about the accuracy, completeness, or suitability of the information on this Platform. We are not liable for any errors, omissions, or delays in the content, or for any actions taken in reliance on it.
                </p>
              </div>
            </div>

            {/* Financial Disclaimer (DeFi Focus) */}
            <div className="mt-6 bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-md shadow-lg border-l-4 border-blue-400 transform hover:scale-105 hover:rotate-1 transition-transform duration-300 animate-float animate-fadeIn">
              <div className="bg-blue-100 text-blue-900 px-8 py-3 rounded-t-md">
                <h2 className="text-3xl font-semibold text-center">Financial Disclaimer</h2>
              </div>
              <div className="px-8 py-6 prose text-black">
                <p>
                  OpenSignal provides content related to blockchain, Web3, and decentralized finance (DeFi), including discussions about cryptocurrencies, tokens, NFTs, and other digital assets. This content is for educational purposes only and does <strong>not constitute financial advice, investment advice, or a recommendation to buy, sell, or hold any financial product</strong>.
                </p>
                <p>
                  The cryptocurrency and DeFi spaces are highly volatile and speculative, involving significant financial risks. Prices can fluctuate widely, and you may lose some or all of your investment. Before making any financial decisions, we strongly recommend conducting your own research and consulting with a licensed financial advisor.
                </p>
                <p>
                  OpenSignal, its creators, and affiliates are not responsible for any financial losses, damages, or other consequences resulting from actions taken based on our content. Your financial decisions are your own responsibility.
                </p>
              </div>
            </div>

            {/* Diverse Topics Disclaimer */}
            <div className="mt-6 bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-md shadow-lg border-l-4 border-blue-400 transform hover:scale-105 hover:rotate-1 transition-transform duration-300 animate-float animate-fadeIn">
              <div className="bg-blue-100 text-blue-900 px-8 py-3 rounded-t-md">
                <h2 className="text-3xl font-semibold text-center">Diverse Topics Disclaimer</h2>
              </div>
              <div className="px-8 py-6 prose text-black">
                <p>
                  In addition to technology, OpenSignal covers a wide range of topics, including parenting, sustainable farming, music, mental health, self-care, and more. While we strive to provide helpful and accurate information, this content is general in nature and not a substitute for professional advice.
                </p>
                <p>
                  For example, our mental health content is not a replacement for therapy or medical advice from a licensed professional. Similarly, our parenting or farming tips are not tailored to your specific situation and should not be used in place of guidance from experts in those fields.
                </p>
                <p>
                  We encourage you to use our content as a starting point for your own research and to seek professional advice when needed. OpenSignal is not liable for any outcomes resulting from applying our general advice to your personal circumstances.
                </p>
              </div>
            </div>

            {/* Third-Party Links and Content */}
            <div className="mt-6 bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-md shadow-lg border-l-4 border-blue-400 transform hover:scale-105 hover:rotate-1 transition-transform duration-300 animate-float animate-fadeIn">
              <div className="bg-blue-100 text-blue-900 px-8 py-3 rounded-t-md">
                <h2 className="text-3xl font-semibold text-center">Third-Party Links and Content</h2>
              </div>
              <div className="px-8 py-6 prose text-black">
                <p>
                  OpenSignal may include links to third-party websites, tools, or resources, especially in our articles about blockchain, Web3, and DeFi. These links are provided for your convenience and informational purposes only.
                </p>
                <p>
                  We do not endorse, control, or assume responsibility for the content, accuracy, or safety of any third-party websites or resources. Accessing these links is at your own risk, and we are not liable for any damages or losses resulting from your use of third-party content.
                </p>
                <p>
                  We encourage you to review the terms, policies, and disclaimers of any third-party websites you visit.
                </p>
              </div>
            </div>

            {/* Content Accuracy and Updates */}
            <div className="mt-6 bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-md shadow-lg border-l-4 border-blue-400 transform hover:scale-105 hover:rotate-1 transition-transform duration-300 animate-float animate-fadeIn">
              <div className="bg-blue-100 text-blue-900 px-8 py-3 rounded-t-md">
                <h2 className="text-3xl font-semibold text-center">Content Accuracy and Updates</h2>
              </div>
              <div className="px-8 py-6 prose text-black">
                <p>
                  The fields of blockchain, Web3, and DeFi are rapidly evolving, and information can become outdated quickly. While we strive to keep our content accurate and up-to-date, we cannot guarantee that all information on OpenSignal is current or error-free.
                </p>
                <p>
                  This applies to all topics we cover, including tech, parenting, farming, and mental health. We may update our content periodically, but we are not obligated to do so, and we are not liable for any consequences of outdated or inaccurate information.
                </p>
                <p>
                  It’s your responsibility to verify the accuracy of any information before acting on it, especially in fast-moving areas like DeFi and cryptocurrency.
                </p>
              </div>
            </div>

            {/* User Responsibility */}
            <div className="mt-6 bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-md shadow-lg border-l-4 border-blue-400 transform hover:scale-105 hover:rotate-1 transition-transform duration-300 animate-float animate-fadeIn">
              <div className="bg-blue-100 text-blue-900 px-8 py-3 rounded-t-md">
                <h2 className="text-3xl font-semibold text-center">Your Responsibility</h2>
              </div>
              <div className="px-8 py-6 prose text-black">
                <p>
                  By using OpenSignal, you agree that you are solely responsible for your own decisions and actions based on our content. This includes, but is not limited to, financial decisions, personal choices, and lifestyle changes.
                </p>
                <p>
                  We encourage you to do your own research, seek professional advice, and exercise caution, especially when dealing with high-risk areas like DeFi or when applying general advice to your unique situation.
                </p>
                <p>
                  OpenSignal is here to educate and inspire, but the responsibility for how you use our content rests with you.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="mt-6 bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-md shadow-lg border-l-4 border-blue-400 transform hover:scale-105 hover:rotate-1 transition-transform duration-300 animate-float animate-fadeIn text-center">
              <div className="bg-blue-100 text-blue-900 px-8 py-3 rounded-t-md">
                <h2 className="text-3xl font-semibold">Questions?</h2>
              </div>
              <div className="px-8 py-6 prose text-black">
                <p>
                  If you have any questions about this disclaimer or our content, we’d love to hear from you. Reach out to us, and let’s keep the conversation going!
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-md hover:bg-blue-500 hover:text-white transition-colors mt-4"
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