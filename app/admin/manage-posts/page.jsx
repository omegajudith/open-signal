

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth, db } from '@services/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import Link from 'next/link';

// // Disable SSR for this page
// export const dynamic = 'force-dynamic';

// export default function ManagePosts() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchPosts();
//       } else {
//         router.push('/admin/login');
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const fetchPosts = async () => {
//     try {
//       const postsCollection = collection(db, 'Posts');
//       const postsSnapshot = await getDocs(postsCollection);
//       const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setPosts(postsList);
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       setError('Failed to load posts: ' + err.message);
//     }
//   };

//   const handleDelete = async (postId) => {
//     if (confirm('Are you sure you want to delete this post?')) {
//       try {
//         await deleteDoc(doc(db, 'Posts', postId));
//         setPosts(posts.filter(post => post.id !== postId));
//       } catch (err) {
//         console.error('Error deleting post:', err);
//         setError('Failed to delete post: ' + err.message);
//       }
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/admin/login');
//     } catch (err) {
//       console.error('Logout error:', err);
//       setError('Failed to log out: ' + err.message);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (!user) return null;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white shadow-md z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold">Admin Panel</h2>
//             <button onClick={toggleSidebar} className="md:hidden text-white focus:outline-none">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <nav className="space-y-4">
//             <Link href="/admin/dashboard" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md" onClick={() => setIsSidebarOpen(false)}>
//               <span>✍️</span>
//               <span>Create Post</span>
//             </Link>
//             <Link href="/admin/manage-posts" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md" onClick={() => setIsSidebarOpen(false)}>
//               <span>🗂</span>
//               <span>Manage Posts</span>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md w-full text-left"
//             >
//               <span>🚪</span>
//               <span>Logout</span>
//             </button>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 md:ml-64">
//         {/* Top Navigation */}
//         <nav className="fixed top-0 left-0 md:left-64 right-0 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-md z-40">
//           <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center">
//               <Link href="/" className="text-2xl font-bold">
//                 OpenSignal
//               </Link>
//               <button
//                 onClick={toggleSidebar}
//                 className="ml-4 md:hidden text-white focus:outline-none"
//               >
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//                 </svg>
//               </button>
//             </div>
//             <div className="hidden md:flex space-x-6">
//               <Link href="/" className="font-bold hover:text-blue-300 transition-colors">
//                 Home
//               </Link>
//               <Link href="/blog" className="font-bold hover:text-blue-300 transition-colors">
//                 Blog
//               </Link>
//               <Link href="/about" className="font-bold hover:text-blue-300 transition-colors">
//                 About
//               </Link>
//               {/* <Link href="/portfolio" className="font-bold hover:text-blue-300 transition-colors">
//                 Portfolio
//               </Link> */}
//               <Link href="/contact" className="font-bold hover:text-blue-300 transition-colors">
//                 Contact
//               </Link>
//               <Link href="/disclaimer" className="font-bold hover:text-blue-300 transition-colors">
//                 Disclaimer
//               </Link>
//             </div>
//           </div>
//         </nav>

//         {/* Content */}
//         <section className="pt-24 pb-12">
//           <div className="container mx-auto px-6">
//             <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">Manage Posts</h1>
//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//             <div className="max-w-2xl mx-auto">
//               <Link href="/admin/dashboard">
//                 <button className="w-full md:w-auto mb-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
//                   Create New Post
//                 </button>
//               </Link>
//               {posts.length === 0 ? (
//                 <p className="text-center">No posts found.</p>
//               ) : (
//                 <div className="space-y-6">
//                   {posts.map(post => (
//                     <div key={post.id} className="p-6 bg-white rounded-lg shadow-md">
//                       <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
//                       <p className="text-gray-600 mb-2">Status: {post.status}</p>
//                       <p className="text-gray-600 mb-4">
//                         Published: {new Date(post.publishDate).toLocaleString()}
//                       </p>
//                       <div className="flex space-x-4">
//                         <Link href={`/admin/edit/${post.id}`} className="text-blue-500 hover:underline px-4 py-2 bg-blue-100 rounded">
//                           Edit
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(post.id)}
//                           className="text-red-500 hover:underline px-4 py-2 bg-red-100 rounded"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }





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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white shadow-md z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button onClick={toggleSidebar} className="md:hidden text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-4">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md" onClick={() => setIsSidebarOpen(false)}>
              <span>✍️</span>
              <span>Create Post</span>
            </Link>
            <Link href="/admin/manage-posts" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md" onClick={() => setIsSidebarOpen(false)}>
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
      <div className="flex-1 md:ml-64">
        {/* Top Navigation */}
        <nav className="fixed top-0 left-0 md:left-64 right-0 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-md z-40">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                OpenSignal
              </Link>
              <button
                onClick={toggleSidebar}
                className="ml-4 md:hidden text-white focus:outline-none"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex space-x-6">
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

        {/* Content */}
        <section className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">Manage Posts</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <Link href="/admin/dashboard">
                  <button className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Create New Post
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
              {posts.length === 0 ? (
                <p className="text-center">No posts found.</p>
              ) : (
                <div className="space-y-6">
                  {posts.map(post => (
                    <div key={post.id} className="p-6 bg-white rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-2">Status: {post.status}</p>
                      <p className="text-gray-600 mb-4">
                        Published: {new Date(post.publishDate).toLocaleString()}
                      </p>
                      <div className="flex space-x-4">
                        <Link href={`/admin/edit/${post.id}`} className="text-blue-500 hover:underline px-4 py-2 bg-blue-100 rounded">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-500 hover:underline px-4 py-2 bg-red-100 rounded"
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