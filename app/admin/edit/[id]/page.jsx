'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { auth, db } from '@services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import dynamicImport from 'next/dynamic';

// Dynamically import ReactQuillWrapper with SSR disabled
const ReactQuillWrapper = dynamicImport(() => import('@components/ReactQuillWrapper'), {
  ssr: false, // Disable SSR for this component
});

// Disable SSR for this page
export const dynamic = 'force-dynamic';

export default function EditPost() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const postRef = doc(db, 'Posts', id);
          const postSnap = await getDoc(postRef);
          if (postSnap.exists()) {
            const postData = postSnap.data();
            setTitle(postData.title);
            setContent(postData.content);
            if (postData.publishDate) {
              const publishDateTime = new Date(postData.publishDate);
              setPublishDate(publishDateTime.toISOString().split('T')[0]);
              setPublishTime(publishDateTime.toISOString().split('T')[1].slice(0, 5));
            }
          } else {
            setError('Post not found');
          }
        } catch (err) {
          console.error('Error fetching post:', err);
          setError('Failed to load post: ' + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [id, router]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const publishDateTime = publishDate && publishTime ? new Date(`${publishDate}T${publishTime}`).toISOString() : new Date().toISOString();
      const status = publishDateTime > new Date().toISOString() ? 'scheduled' : 'published';

      const postRef = doc(db, 'Posts', id);
      await updateDoc(postRef, {
        title,
        content,
        publishDate: publishDateTime,
        status,
        updatedAt: new Date().toISOString(),
      });

      router.push('/admin/manage-posts');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post: ' + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out: ' + err.message);
    }
  };

  if (!user || loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-blue-900 text-white shadow-md z-50">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md">
              <span>✍️</span>
              <span>Create Post</span>
            </Link>
            <Link href="/admin/manage-posts" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md">
              <span>🗂</span>
              <span>Manage Posts</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md w-full text-left"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navigation */}
        <nav className="fixed top-0 left-64 right-0 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-md z-40">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              OpenSignal
            </Link>
            <div className="space-x-6">
              <Link href="/" className="font-bold hover:text-blue-300 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="font-bold hover:text-blue-300 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="font-bold hover:text-blue-300 transition-colors">
                About
              </Link>
              <Link href="/portfolio" className="font-bold hover:text-blue-300 transition-colors">
                Portfolio
              </Link>
              <Link href="/contact" className="font-bold hover:text-blue-300 transition-colors">
                Contact
              </Link>
              <Link href="/disclaimer" className="font-bold hover:text-blue-300 transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <section className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-center mb-8">Edit Post</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
              <form onSubmit={handleUpdatePost} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium">
                    Content
                  </label>
                  <ReactQuillWrapper
                    value={content}
                    onChange={setContent}
                    className="bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="publishDate" className="block text-sm font-medium">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      id="publishDate"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="publishTime" className="block text-sm font-medium">
                      Publish Time
                    </label>
                    <input
                      type="time"
                      id="publishTime"
                      value={publishTime}
                      onChange={(e) => setPublishTime(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Update Post
                </button>
              </form>
            </div>
            <div className="text-center mt-8">
              <Link href="/admin/manage-posts" className="text-blue-500 hover:underline">
                ← Back to Manage Posts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}










