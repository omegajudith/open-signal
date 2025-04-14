
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
  // State variables for user authentication and form inputs
  // useState hook to manage the authenticated user
  const [user, setUser] = useState(null);
  // useState hook to manage the post title
  const [title, setTitle] = useState('');
  // useState hook to manage the post content
  const [content, setContent] = useState('');
  // useState hook to manage the publish date
  const [publishDate, setPublishDate] = useState('');
  // useState hook to manage the publish time
  const [publishTime, setPublishTime] = useState('');
  // useState hook to manage the author, prefilled with "Published by OpenSignal"
  const [author, setAuthor] = useState('OpenSignal');
  // useState hook to manage form submission errors
  const [error, setError] = useState(null);
  // useRouter hook for navigation
  const router = useRouter();

  // useEffect hook to check authentication state
  // This function checks if a user is logged in and redirects to login if not
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

  // Function to handle post creation
  // This function creates a new post in Firestore and redirects to manage posts
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
        author, // Use the author from the form
      };
      await addDoc(collection(db, 'Posts'), newPost);
      setTitle('');
      setContent('');
      setPublishDate('');
      setPublishTime('');

      // Reset author to "Published by OpenSignal" after submission
      setAuthor(' OpenSignal'); 
      router.push('/admin/manage-posts');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post: ' + err.message);
    }
  };

  // Function to handle user logout
  // This function signs out the user and redirects to the login page
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
            <h1 className="text-4xl font-bold text-center mb-8 text-black">Create Post</h1>
            <p className="text-center mb-6 text-black">Welcome, {user.email}</p>

            <div className="max-w-2xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-black">Create New Post</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-black">
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full p-2 border rounded-md text-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="publishDate" className="block text-sm font-medium text-black">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      id="publishDate"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full p-2 border rounded-md text-black"
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
                      className="w-full p-2 border rounded-md text-black"
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
                    className="w-full p-2 border rounded-md text-black"
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
                    className="bg-white text-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
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























// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth, db, storage } from '@services/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { addDoc, collection, updateDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import Link from 'next/link';
// import dynamicImport from 'next/dynamic'; // Renamed `dynamic` to `dynamicImport`
// import Resizer from 'react-image-file-resizer'; // Image Resizer

// // Import ReactQuill dynamically with SSR disabled
// const ReactQuill = dynamicImport(() => import('react-quill'), { ssr: false });
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// export const dynamic = 'force-dynamic';

// export default function AdminDashboard() {
//   const [user, setUser] = useState(null);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [publishDate, setPublishDate] = useState('');
//   const [publishTime, setPublishTime] = useState('');
//   const [author, setAuthor] = useState('OpenSignal');
//   const [image, setImage] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const router = useRouter();
//   const quillRef = useState(null)[0]; // Ref to access the Quill editor instance

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) setUser(currentUser);
//       else router.push('/admin/login');
//     });
//     return () => unsubscribe();
//   }, [router]);

//   // Resize image before uploading
//   const resizeImage = (file) => {
//     return new Promise((resolve, reject) => {
//       Resizer.imageFileResizer(
//         file,
//         800, // max width
//         800, // max height
//         'JPEG', // format
//         80, // quality
//         0, // rotation
//         (uri) => {
//           resolve(uri);
//         },
//         'file' // output type
//       );
//     });
//   };

//   // Upload image and track progress
//   const handleImageUpload = async (file, postId) => {
//     if (!file) return null;
//     const resizedImage = await resizeImage(file); // Resize image before uploading

//     const storageRef = ref(storage, `posts/${postId}/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, resizedImage);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setUploadProgress(progress); // Update progress
//       },
//       (error) => {
//         setError('Image upload failed: ' + error.message);
//       },
//       async () => {
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//         setUploadProgress(0); // Reset progress once uploaded
//         return downloadURL;
//       }
//     );
//   };

//   // Create a new post
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
//       const docRef = await addDoc(collection(db, 'Posts'), newPost);
//       let imageUrl = null;
//       if (image) {
//         imageUrl = await handleImageUpload(image, docRef.id); // Upload image and get URL
//         await updateDoc(docRef, { imageUrl });
//       }
//       setTitle('');
//       setContent('');
//       setPublishDate('');
//       setPublishTime('');
//       setAuthor('OpenSignal');
//       setImage(null);
//       router.push('/admin/manage-posts');
//     } catch (err) {
//       setError('Failed to create post: ' + err.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/admin/login');
//     } catch (err) {
//       setError('Failed to log out: ' + err.message);
//     }
//   };

//   const handleQuillImageUpload = async () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();
//     input.onchange = async () => {
//       const file = input.files[0];
//       if (file) {
//         const tempId = Date.now().toString();
//         const url = await handleImageUpload(file, tempId);
//         if (quillRef) {
//           const range = quillRef.getSelection();
//           if (range) quillRef.insertEmbed(range.index, 'image', url);
//         }
//       }
//     };
//   };

//   if (!user) return null;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
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
//             <button onClick={handleLogout} className="flex items-center space-x-3 text-lg hover:bg-blue-800 p-2 rounded-md w-full text-left">
//               <span>🚪</span>
//               <span>Logout</span>
//             </button>
//           </nav>
//         </div>
//       </aside>
//       <div className="flex-1 ml-64">
//         <nav className="fixed top-0 left-64 right-0 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-md z-40">
//           <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//             <Link href="/" className="text-2xl font-bold">OpenSignal</Link>
//             <div className="space-x-6">
//               <Link href="/" className="font-bold hover:text-blue-300 transition-colors">Home</Link>
//               <Link href="/blog" className="font-bold hover:text-blue-300 transition-colors">Blog</Link>
//               <Link href="/about" className="font-bold hover:text-blue-300 transition-colors">About</Link>
//               <Link href="/portfolio" className="font-bold hover:text-blue-300 transition-colors">Portfolio</Link>
//               <Link href="/contact" className="font-bold hover:text-blue-300 transition-colors">Contact</Link>
//               <Link href="/disclaimer" className="font-bold hover:text-blue-300 transition-colors">Disclaimer</Link>
//             </div>
//           </div>
//         </nav>
//         <section className="pt-24 pb-12">
//           <div className="container mx-auto px-6">
//             <h1 className="text-4xl font-bold text-center mb-8 text-black">Create Post</h1>
//             <p className="text-center mb-6 text-black">Welcome, {user.email}</p>
//             <div className="max-w-2xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold mb-4 text-black">Create New Post</h2>
//               {error && <p className="text-red-500 mb-4">{error}</p>}
//               <form onSubmit={handleCreatePost} className="space-y-4">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-black">Title</label>
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
//                   <label className="block text-sm font-medium text-black">Featured Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setImage(e.target.files[0])}
//                     className="w-full p-2 border rounded-md text-black"
//                   />
//                   {uploadProgress > 0 && (
//                     <div className="mt-2">
//                       <div className="bg-gray-200 w-full h-2 rounded-full">
//                         <div
//                           className="bg-blue-600 h-2 rounded-full"
//                           style={{ width: `${uploadProgress}%` }}
//                         />
//                       </div>
//                       <p className="text-sm mt-1">{uploadProgress}% Uploading...</p>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="content" className="block text-sm font-medium text-black">Content</label>
//                   <ReactQuill
//                     value={content}
//                     onChange={setContent}
//                     className="bg-white text-black"
//                     ref={(el) => {
//                       if (el) quillRef.current = el.getEditor();
//                     }}
//                     modules={{
//                       toolbar: {
//                         container: [
//                           [{ 'header': [1, 2, false] }],
//                           ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                           [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//                           ['link', 'image'],
//                           ['clean']
//                         ],
//                         handlers: { image: handleQuillImageUpload }
//                       }
//                     }}
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label htmlFor="author" className="block text-sm font-medium text-black">Author</label>
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
//                     <label htmlFor="publishDate" className="block text-sm font-medium text-black">Publish Date</label>
//                     <input
//                       type="date"
//                       id="publishDate"
//                       value={publishDate}
//                       onChange={(e) => setPublishDate(e.target.value)}
//                       className="w-full p-2 border rounded-md text-black"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="publishTime" className="block text-sm font-medium text-black">Publish Time</label>
//                     <input
//                       type="time"
//                       id="publishTime"
//                       value={publishTime}
//                       onChange={(e) => setPublishTime(e.target.value)}
//                       className="w-full p-2 border rounded-md text-black"
//                     />
//                   </div>
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




















