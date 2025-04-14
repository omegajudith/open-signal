

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from '@components/Header';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(db, 'Posts'), where('status', '==', 'published'));
        const postsSnapshot = await getDocs(postsQuery);
        const fetchedPosts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to extract media and text from content
  const extractMediaAndText = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = Array.from(doc.querySelectorAll('img')).map(img => img.outerHTML);
    const videos = Array.from(doc.querySelectorAll('iframe')).map(video => video.outerHTML);
    const media = [...images, ...videos];
    
    // Remove media from content to get text
    doc.querySelectorAll('img, iframe').forEach(el => el.remove());
    const text = doc.body.innerHTML;

    return { media, text };
  };

  // Function to strip HTML tags and limit text
  const getTextSnippet = (htmlText, charLimit = 100) => {
    // Strip HTML tags
    const text = htmlText.replace(/<[^>]+>/g, '');
    // Limit to charLimit characters and add ellipsis
    return text.length > charLimit ? text.substring(0, charLimit) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold-green text-center mb-8 text-black">Blog</h1>
          {loading ? (
            <p className="text-center text-black">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.length === 0 ? (
                <p className="text-center col-span-3 text-black">No posts found.</p>
              ) : (
                posts.map(post => {
                  const { media, text } = extractMediaAndText(post.content);
                  const textSnippet = getTextSnippet(text, 100); // Limit to 100 characters
                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div>
                        {media.length > 0 && (
                          <div
                            className="mb-4 post-image-preview"
                            dangerouslySetInnerHTML={{ __html: media[0] }}
                          />
                        )}
                        <h2 className="text-xl font-semibold text-black">{post.title}</h2>
                        <p className="text-black mt-2">{textSnippet}</p>
                        <p className="text-black mt-2">
                          {new Date(post.publishDate).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



