'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

// Disable SSR for this page
export const dynamic = 'force-dynamic';

export default function ManagePosts() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchPosts();
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, 'Posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts: ' + err.message);
    }
  };

  const handleDelete = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'Posts', postId));
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Failed to delete post: ' + err.message);
      }
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

  if (!user) return null;

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
            <h1 className="text-4xl font-bold text-center mb-8">Manage Posts</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="max-w-4xl mx-auto">
              {posts.length === 0 ? (
                <p className="text-center">No posts found.</p>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-600">Status: {post.status}</p>
                        <p className="text-gray-600">
                          Published: {new Date(post.publishDate).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Link href={`/admin/edit/${post.id}`} className="text-blue-500 hover:underline">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}