


'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsQuery = query(collection(db, 'Posts'));
        const querySnapshot = await getDocs(postsQuery);
        const currentDateTime = new Date().toISOString();
        const posts = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => post.status === 'published' || (post.status === 'scheduled' && post.publishDate <= currentDateTime));
        console.log('Fetched posts:', posts);
        setLatestPosts(posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load latest articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setSubscribeStatus('Please enter a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeStatus('Please enter a valid email address.');
      return;
    }

    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: new Date().toISOString(),
      });
      setSubscribeStatus('Subscribed successfully! You’ll receive weekly updates.');
      setEmail('');
    } catch (err) {
      console.error('Error subscribing:', err);
      setSubscribeStatus('Failed to subscribe. Please try again.');
    }
  };

  const extractMediaAndText = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = Array.from(doc.querySelectorAll('img')).map(img => img.outerHTML);
    const videos = Array.from(doc.querySelectorAll('iframe')).map(video => video.outerHTML);
    const media = [...images, ...videos];
    doc.querySelectorAll('img, iframe').forEach(el => el.remove());
    const text = doc.body.innerHTML;
    return { media, text };
  };

  if (error) return <div className="text-center text-red-500 text-sm sm:text-base">{error}</div>;

  return (
    <main className="bg-white text-black">
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-md z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            OpenSignal
          </Link>
          <div className="space-x-4 sm:space-x-6 hidden sm:flex">
            <Link href="/" className="font-bold hover:text-blue-300 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="font-bold hover:text-blue-300 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="font-bold hover:text-blue-300 transition-colors">
              About
            </Link>
            {/* <Link href="/portfolio" className="font-bold hover:text-blue-300 transition-colors">
              Portfolio
            </Link> */}
            <Link href="/contact" className="font-bold hover:text-blue-300 transition-colors">
              Contact
            </Link>
            <Link href="/disclaimer" className="font-bold hover:text-blue-300 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </nav>
{/* 
      <nav className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 flex flex-col space-y-3 bg-[#04205f]/60 backdrop-blur-lg p-3 sm:p-5 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.5),_0_4px_8px_rgba(0,0,0,0.3),inset_0_2px_2px_rgba(255,255,255,0.2)] border border-white/10">
        <a
          href="#hero"
          className="text-white font-semibold text-sm sm:text-lg [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5),_0_0_8px_rgba(135,206,250,0.7)] hover:[text-shadow:_2px_2px_6px_rgba(0,0,0,0.7),_0_0_12px_rgba(135,206,250,1)] hover:text-sky-300 transition-all duration-300"
        >
          Top
        </a>
        <a
          href="#latest-articles"
          className="text-white font-semibold text-sm sm:text-lg [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5),_0_0_8px_rgba(135,206,250,0.7)] hover:[text-shadow:_2px_2px_6px_rgba(0,0,0,0.7),_0_0_12px_rgba(135,206,250,1)] hover:text-sky-300 transition-all duration-300"
        >
          Latest Articles
        </a>
        <a
          href="#cta-section"
          className="text-white font-semibold text-sm sm:text-lg [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5),_0_0_8px_rgba(135,206,250,0.7)] hover:[text-shadow:_2px_2px_6px_rgba(0,0,0,0.7),_0_0_12px_rgba(135,206,250,1)] hover:text-sky-300 transition-all duration-300"
        >
          Stay Updated
        </a>
      </nav> */}

      <section
        id="hero"
        className="relative h-screen bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center animate-gradient pt-16"
      >
        <div className="absolute inset-0 bg-[#04205f]/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to{' '}
            <span className="text-sky-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5),_4px_4px_8px_rgba(0,0,0,0.3)]">
              OpenSignal
            </span>
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Your go-to place for{' '}
            <span className="text-sky-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
              tech insights
            </span>
            ,{' '}
            <span className="text-sky-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
              finance tips
            </span>
            , and{' '}
            <span className="text-sky-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
              personal growth
            </span>
            .
          </p>
          <a
            href="#latest-articles"
            className="bg-sky-500 text-white px-4 sm:px-6 py-3 rounded-full hover:bg-sky-600 transition-colors text-sm sm:text-base"
          >
            Explore Blogs →
          </a>
        </div>
      </section>

      <section id="latest-articles" className="py-12">
        <h2 className="text-3xl font-bold text-center text-sky-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5),_4px_4px_8px_rgba(0,0,0,0.3)] mb-8">
          🔥 Latest Articles
        </h2>
        {loading ? (
          <p className="text-center text-sm sm:text-base">Loading latest articles...</p>
        ) : latestPosts.length > 0 ? (
          <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => {
              const { media, text } = extractMediaAndText(post.content);
              return (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  {media.length > 0 && (
                    <div
                      className="mb-4 post-image-preview"
                      dangerouslySetInnerHTML={{ __html: media[0] }}
                    />
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{post.title}</h3>
                  <div className="text-gray-600 mb-2 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: text.substring(0, 100) + '...' }} />
                  <p className="text-xs sm:text-sm text-gray-500">
                    {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'No date available'}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-sm sm:text-base">No articles have been posted yet.</p>
        )}
      </section>

      <section id="cta-section" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-sky-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5),_4px_4px_8px_rgba(0,0,0,0.3)] mb-4">
            Stay Updated with{' '}
            <span className="text-sky-400">OpenSignal</span>
          </h2>
          <p className="text-base sm:text-lg mb-6">
            Subscribe for weekly insights and exclusive content.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="bg-sky-500 text-white px-4 sm:px-6 py-3 rounded-full hover:bg-sky-600 transition-colors w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          {subscribeStatus && (
            <p className={`mt-4 text-sm sm:text-base ${subscribeStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {subscribeStatus}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}




























