
// 'use client';

// // React hooks for state management and navigation
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// // Firebase imports for authentication and Firestore database
// import { auth, db } from '@services/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { addDoc, collection } from 'firebase/firestore';
// // Next.js components for linking and dynamic imports
// import Link from 'next/link';
// import dynamicImport from 'next/dynamic';

// // Dynamically import ReactQuillWrapper with SSR disabled
// const ReactQuillWrapper = dynamicImport(() => import('@components/ReactQuillWrapper'), {
//   ssr: false, // Disable SSR for this component
// });

// // Disable SSR for this page
// export const dynamic = 'force-dynamic';

// // Main component for the admin dashboard
// export default function AdminDashboard() {
//   // State variables for user authentication and form inputs
//   // useState hook to manage the authenticated user
//   const [user, setUser] = useState(null);
//   // useState hook to manage the post title
//   const [title, setTitle] = useState('');
//   // useState hook to manage the post content
//   const [content, setContent] = useState('');
//   // useState hook to manage the publish date
//   const [publishDate, setPublishDate] = useState('');
//   // useState hook to manage the publish time
//   const [publishTime, setPublishTime] = useState('');
//   // useState hook to manage the author, prefilled with "Published by OpenSignal"
//   const [author, setAuthor] = useState('OpenSignal');
//   // useState hook to manage form submission errors
//   const [error, setError] = useState(null);
//   // useRouter hook for navigation
//   const router = useRouter();

//   // useEffect hook to check authentication state
//   // This function checks if a user is logged in and redirects to login if not
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         router.push('/admin/login');
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   // Function to handle post creation
//   // This function creates a new post in Firestore and redirects to manage posts
//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const publishDateTime = publishDate && publishTime ? new Date(`${publishDate}T${publishTime}`).toISOString() : new Date().toISOString();
//       const status = publishDateTime > new Date().toISOString() ? 'scheduled' : 'published';

//       const newPost = {
//         title,
//         content,
//         publishDate: publishDateTime,
//         status,
//         createdAt: new Date().toISOString(),
//         author, // Use the author from the form
//       };
//       await addDoc(collection(db, 'Posts'), newPost);
//       setTitle('');
//       setContent('');
//       setPublishDate('');
//       setPublishTime('');

//       // Reset author to "Published by OpenSignal" after submission
//       setAuthor(' OpenSignal'); 
//       router.push('/admin/manage-posts');
//     } catch (err) {
//       console.error('Error creating post:', err);
//       setError('Failed to create post: ' + err.message);
//     }
//   };

//   // Function to handle user logout
//   // This function signs out the user and redirects to the login page
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/admin/login');
//     } catch (err) {
//       console.error('Logout error:', err);
//       setError('Failed to log out: ' + err.message);
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="fixed top-0 left-0 w-64 h-full bg-blue-900 text-white shadow-md z-50">
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
//           <nav className="space-y-4">
//             <Link href="/admin/dashboard" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md">
//               <span>✍️</span>
//               <span>Create Post</span>
//             </Link>
//             <Link href="/admin/manage-posts" className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md">
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
//       <div className="flex-1 ml-64">
//         {/* Top Navigation */}
//         <nav className="fixed top-0 left-64 right-0 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-md z-40">
//           <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//             <Link href="/" className="text-2xl font-bold">
//               OpenSignal
//             </Link>
//             <div className="space-x-6">
//               <Link href="/" className="font-bold hover:text-blue-300 transition-colors">
//                 Home
//               </Link>
//               <Link href="/blog" className="font-bold hover:text-blue-300 transition-colors">
//                 Blog
//               </Link>
//               <Link href="/about" className="font-bold hover:text-blue-300 transition-colors">
//                 About
//               </Link>
//               <Link href="/portfolio" className="font-bold hover:text-blue-300 transition-colors">
//                 Portfolio
//               </Link>
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
//             <h1 className="text-4xl font-bold text-center mb-8 text-black">Create Post</h1>
//             <p className="text-center mb-6 text-black">Welcome, {user.email}</p>

//             <div className="max-w-2xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold mb-4 text-black">Create New Post</h2>
//               {error && <p className="text-red-500 mb-4">{error}</p>}
//               <form onSubmit={handleCreatePost} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label htmlFor="author" className="block text-sm font-medium text-black">
//                       Author
//                     </label>
//                     <input
//                       type="text"
//                       id="author"
//                       value={author}
//                       onChange={(e) => setAuthor(e.target.value)}
//                       className="w-full p-2 border rounded-md text-black"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="publishDate" className="block text-sm font-medium text-black">
//                       Publish Date
//                     </label>
//                     <input
//                       type="date"
//                       id="publishDate"
//                       value={publishDate}
//                       onChange={(e) => setPublishDate(e.target.value)}
//                       className="w-full p-2 border rounded-md text-black"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="publishTime" className="block text-sm font-medium text-black">
//                       Publish Time
//                     </label>
//                     <input
//                       type="time"
//                       id="publishTime"
//                       value={publishTime}
//                       onChange={(e) => setPublishTime(e.target.value)}
//                       className="w-full p-2 border rounded-md text-black"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-black">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full p-2 border rounded-md text-black"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="content" className="block text-sm font-medium text-black">
//                     Content
//                   </label>
//                   <ReactQuillWrapper
//                     value={content}
//                     onChange={setContent}
//                     className="bg-white text-black"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   Create Post
//                 </button>
//               </form>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }










// 'use client';

// // React hooks for state management and navigation
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// // Firebase imports for authentication and Firestore database
// import { auth, db } from '@services/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { addDoc, collection } from 'firebase/firestore';
// // Next.js components for linking and dynamic imports
// import Link from 'next/link';
// import dynamicImport from 'next/dynamic';

// // Dynamically import ReactQuillWrapper with SSR disabled
// const ReactQuillWrapper = dynamicImport(() => import('@components/ReactQuillWrapper'), {
//   ssr: false, // Disable SSR for this component
// });

// // Disable SSR for this page
// export const dynamic = 'force-dynamic';

// // Main component for the admin dashboard
// export default function AdminDashboard() {
//   // State variables for user authentication, form inputs, and sidebar toggle
//   const [user, setUser] = useState(null);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [publishDate, setPublishDate] = useState('');
//   const [publishTime, setPublishTime] = useState('');
//   const [author, setAuthor] = useState('OpenSignal');
//   const [error, setError] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const router = useRouter();

//   // Check authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         router.push('/admin/login');
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   // Handle post creation
//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const publishDateTime = publishDate && publishTime ? new Date(`${publishDate}T${publishTime}`).toISOString() : new Date().toISOString();
//       const status = publishDateTime > new Date().toISOString() ? 'scheduled' : 'published';

//       const newPost = {
//         title,
//         content,
//         publishDate: publishDateTime,
//         status,
//         createdAt: new Date().toISOString(),
//         author,
//       };
//       await addDoc(collection(db, 'Posts'), newPost);
//       setTitle('');
//       setContent('');
//       setPublishDate('');
//       setPublishTime('');
//       setAuthor('OpenSignal');
//       router.push('/admin/manage-posts');
//     } catch (err) {
//       console.error('Error creating post:', err);
//       setError('Failed to create post: ' + err.message);
//     }
//   };

//   // Handle user logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/admin/login');
//     } catch (err) {
//       console.error('Logout error:', err);
//       setError('Failed to log out: ' + err.message);
//     }
//   };

//   // Toggle sidebar visibility on mobile
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (!user) return null;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white shadow-md z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-8 md:mb-8">
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
//           <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center justify-between w-full md:w-auto">
//               <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">
//                 OpenSignal
//               </Link>
//               <button
//                 onClick={toggleSidebar}
//                 className="md:hidden text-white focus:outline-none p-2"
//               >
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//                 </svg>
//               </button>
//             </div>
//             <div className="hidden md:flex space-x-6 items-center">
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
//             <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">Create Post</h1>
//             <p className="text-center mb-6 text-black">Welcome, {user.email}</p>

//             <div className="max-w-2xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-xl md:text-2xl font-semibold mb-4 text-black">Create New Post</h2>
//               {error && <p className="text-red-500 mb-4">{error}</p>}
//               <form onSubmit={handleCreatePost} className="space-y-4">
//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label htmlFor="author" className="block text-sm font-medium text-black">
//                       Author
//                     </label>
//                     <input
//                       type="text"
//                       id="author"
//                       value={author}
//                       onChange={(e) => setAuthor(e.target.value)}
//                       className="w-full p-3 border rounded-md text-black"
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="publishDate" className="block text-sm font-medium text-black">
//                         Publish Date
//                       </label>
//                       <input
//                         type="date"
//                         id="publishDate"
//                         value={publishDate}
//                         onChange={(e) => setPublishDate(e.target.value)}
//                         className="w-full p-3 border rounded-md text-black"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="publishTime" className="block text-sm font-medium text-black">
//                         Publish Time
//                       </label>
//                       <input
//                         type="time"
//                         id="publishTime"
//                         value={publishTime}
//                         onChange={(e) => setPublishTime(e.target.value)}
//                         className="w-full p-3 border rounded-md text-black"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-black">
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       id="title"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       className="w-full p-3 border rounded-md text-black"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="content" className="block text-sm font-medium text-black">
//                       Content
//                     </label>
//                     <ReactQuillWrapper
//                       value={content}
//                       onChange={setContent}
//                       className="bg-white text-black min-h-[200px]"
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   Create Post
//                 </button>
//               </form>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }












'use client';

// React hooks for state management and navigation
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Firebase imports for authentication and Firestore database
import { auth, db } from '@services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
// Next.js components for linking and dynamic imports
import Link from 'next/link';
import dynamicImport from 'next/dynamic';

// Dynamically import ReactQuillWrapper with SSR disabled
const ReactQuillWrapper = dynamicImport(() => import('@components/ReactQuillWrapper'), {
  ssr: false, // Disable SSR for this component
});

// Disable SSR for this page
export const dynamic = 'force-dynamic';

// Main component for the admin dashboard
export default function AdminDashboard() {
  // State variables for user authentication, form inputs, and sidebar toggle
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('');
  const [author, setAuthor] = useState('OpenSignal');
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Handle post creation
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const publishDateTime = publishDate && publishTime ? new Date(`${publishDate}T${publishTime}`).toISOString() : new Date().toISOString();
      const status = publishDateTime > new Date().toISOString() ? 'scheduled' : 'published';

      const newPost = {
        title,
        content,
        publishDate: publishDateTime,
        status,
        createdAt: new Date().toISOString(),
        author,
      };
      await addDoc(collection(db, 'Posts'), newPost);
      setTitle('');
      setContent('');
      setPublishDate('');
      setPublishTime('');
      setAuthor('OpenSignal');
      router.push('/admin/manage-posts');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post: ' + err.message);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out: ' + err.message);
    }
  };

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white shadow-md z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8 md:mb-8">
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
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">
                OpenSignal
              </Link>
              <button
                onClick={toggleSidebar}
                className="md:hidden text-white focus:outline-none p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
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
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">Create Post</h1>
            <p className="text-center mb-6 text-black">Welcome, {user.email}</p>

            <div className="max-w-2xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-black">Create New Post</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="mb-6">
                <Link href="/admin/manage-posts">
                  <button className="w-full md:w-auto px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                    Manage Posts
                  </button>
                </Link>
              </div>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-black">
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full p-3 border rounded-md text-black"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="publishDate" className="block text-sm font-medium text-black">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        id="publishDate"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        className="w-full p-3 border rounded-md text-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="publishTime" className="block text-sm font-medium text-black">
                        Publish Time
                      </label>
                      <input
                        type="time"
                        id="publishTime"
                        value={publishTime}
                        onChange={(e) => setPublishTime(e.target.value)}
                        className="w-full p-3 border rounded-md text-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-black">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 border rounded-md text-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-black">
                      Content
                    </label>
                    <ReactQuillWrapper
                      value={content}
                      onChange={setContent}
                      className="bg-white text-black min-h-[200px]"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}