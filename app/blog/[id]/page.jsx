

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { db } from '@services/firebase';
// import { doc, getDoc, collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
// import Header from '@components/Header';

// export default function BlogPost() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [comments, setComments] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [commentText, setCommentText] = useState('');
//   const [commentStatus, setCommentStatus] = useState(null);

//   // Fetch the blog post
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const postRef = doc(db, 'Posts', id);
//         const postSnap = await getDoc(postRef);

//         if (postSnap.exists()) {
//           setPost({ id: postSnap.id, ...postSnap.data() });
//         } else {
//           setPost(null);
//         }
//       } catch (error) {
//         console.error('Error fetching post:', error);
//         setPost(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   // Fetch comments for this post
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const commentsQuery = query(
//           collection(db, 'comments'),
//           where('postId', '==', id),
//           orderBy('createdAt', 'desc')
//         );
//         const querySnapshot = await getDocs(commentsQuery);
//         const commentsData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setComments(commentsData);
//       } catch (err) {
//         console.error('Error fetching comments:', err);
//       }
//     };

//     fetchComments();
//   }, [id]);

//   // Handle comment submission
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) {
//       setCommentStatus('Please enter a comment.');
//       return;
//     }

//     try {
//       await addDoc(collection(db, 'comments'), {
//         postId: id,
//         userName: userName.trim() || 'Anonymous',
//         commentText: commentText.trim(),
//         createdAt: new Date().toISOString(),
//       });
//       setCommentStatus('Comment submitted successfully!');
//       setUserName('');
//       setCommentText('');
//       // Refresh comments
//       const commentsQuery = query(
//         collection(db, 'comments'),
//         where('postId', '==', id),
//         orderBy('createdAt', 'desc')
//       );
//       const querySnapshot = await getDocs(commentsQuery);
//       const commentsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setComments(commentsData);
//       setTimeout(() => setCommentStatus(null), 5000); // Clear status after 5 seconds
//     } catch (err) {
//       console.error('Error submitting comment:', err);
//       setCommentStatus('Failed to submit comment. Please try again.');
//     }
//   };

//   // Function to extract media and text from content
//   const extractMediaAndText = (content) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(content, 'text/html');
//     const images = Array.from(doc.querySelectorAll('img')).map(img => img.outerHTML);
//     const videos = Array.from(doc.querySelectorAll('iframe')).map(video => video.outerHTML);
//     const media = [...images, ...videos];
    
//     doc.querySelectorAll('img, iframe').forEach(el => el.remove());
//     const text = doc.body.innerHTML;

//     return { media, text };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-center text-black">Loading...</p>
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p className="text-center text-red-500">Post not found.</p>
//       </div>
//     );
//   }

//   const { media, text } = extractMediaAndText(post.content);

//   // Format the publish date and time
//   const publishDateTime = new Date(post.publishDate);
//   const formattedDate = publishDateTime.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
//   const formattedTime = publishDateTime.toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <section className="pt-24 pb-12">
//         <div className="container mx-auto px-6">
//           <h1 className="text-4xl font-bold text-center mb-4 text-black">{post.title}</h1>
//           <div className="text-center mb-6">
//             <p className="text-black">Published by {post.author || 'Unknown Author'}</p>
//             <p className="text-black">
//               {formattedDate}, {formattedTime}
//             </p>
//           </div>
//           <div className="prose max-w-3xl mx-auto text-black">
//             {media.length > 0 && (
//               <div className="mb-6">
//                 {media.map((mediaItem, index) => (
//                   <div key={index} dangerouslySetInnerHTML={{ __html: mediaItem }} />
//                 ))}
//               </div>
//             )}
//             <div dangerouslySetInnerHTML={{ __html: text }} />
//           </div>

//           {/* Comments Section */}
//           <section className="mt-12">
//             <h2 className="text-3xl font-bold mb-6 text-center">Comments</h2>

//             {/* Comment Form */}
//             <form onSubmit={handleCommentSubmit} className="mb-8 max-w-3xl mx-auto">
//               <div className="mb-4">
//                 <label htmlFor="userName" className="block text-gray-700 mb-2">
//                   Name (optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="userName"
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                   className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   placeholder="Enter your name (or leave blank for Anonymous)"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="commentText" className="block text-gray-700 mb-2">
//                   Comment
//                 </label>
//                 <textarea
//                   id="commentText"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   rows="4"
//                   placeholder="Write your comment here..."
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors"
//               >
//                 Submit Comment
//               </button>
//               {commentStatus && (
//                 <p className={`mt-4 ${commentStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
//                   {commentStatus}
//                 </p>
//               )}
//             </form>

//             {/* Display Comments */}
//             {comments.length > 0 ? (
//               <div className="space-y-4 max-w-3xl mx-auto">
//                 {comments.map((comment) => (
//                   <div
//                     key={comment.id}
//                     className="p-4 bg-white rounded-lg shadow-md"
//                   >
//                     <p className="text-gray-700">{comment.commentText}</p>
//                     <p className="text-sm text-gray-500 mt-2">
//                       By {comment.userName} on{' '}
//                       {new Date(comment.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
//             )}
//           </section>

//           <div className="text-center mt-8">
//             <Link href="/blog" className="text-blue-500 hover:underline">
//               ← Back to Blog
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }











'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { db } from '@services/firebase';
import { doc, getDoc, collection, query, where, orderBy, getDocs, addDoc, updateDoc, increment } from 'firebase/firestore';
import Header from '@components/Header';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState(null);
  const [expandedCommentId, setExpandedCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyUserName, setReplyUserName] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [likedComments, setLikedComments] = useState(new Set());

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'Posts', id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setPost({ id: postSnap.id, ...postSnap.data() });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsQuery = query(
          collection(db, 'comments'),
          where('postId', '==', id),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(commentsQuery);
        const commentsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const commentData = { id: doc.id, ...doc.data() };
            const repliesQuery = query(
              collection(db, 'comments', doc.id, 'replies'),
              orderBy('createdAt', 'desc')
            );
            const repliesSnapshot = await getDocs(repliesQuery);
            const repliesData = repliesSnapshot.docs.map(replyDoc => ({
              id: replyDoc.id,
              ...replyDoc.data(),
            }));
            return { ...commentData, replies: repliesData };
          })
        );
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem(`likedComments_${id}`)) || [];
    setLikedComments(new Set(storedLikes));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setCommentStatus('Please enter a comment.');
      return;
    }
    try {
      const newComment = {
        postId: id,
        userName: userName.trim() || 'Anonymous',
        commentText: commentText.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      const docRef = await addDoc(collection(db, 'comments'), newComment);
      setCommentStatus('Comment submitted successfully!');
      setUserName('');
      setCommentText('');
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', id),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(commentsQuery);
      const commentsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const commentData = { id: doc.id, ...doc.data() };
          const repliesQuery = query(
            collection(db, 'comments', doc.id, 'replies'),
            orderBy('createdAt', 'desc')
          );
          const repliesSnapshot = await getDocs(repliesQuery);
          const repliesData = repliesSnapshot.docs.map(replyDoc => ({
            id: replyDoc.id,
            ...replyDoc.data(),
          }));
          return { ...commentData, replies: repliesData };
        })
      );
      setComments(commentsData);
      setTimeout(() => setCommentStatus(null), 5000);
    } catch (err) {
      console.error('Error submitting comment:', err);
      setCommentStatus('Failed to submit comment. Please try again.');
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyText.trim()) {
      setCommentStatus('Please enter a reply.');
      return;
    }
    try {
      await addDoc(collection(db, 'comments', commentId, 'replies'), {
        commentId: commentId,
        userName: replyUserName.trim() || 'Anonymous',
        replyText: replyText.trim(),
        createdAt: new Date().toISOString(),
      });
      setCommentStatus('Reply submitted successfully!');
      setReplyText('');
      setReplyUserName('');
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', id),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(commentsQuery);
      const commentsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const commentData = { id: doc.id, ...doc.data() };
          const repliesQuery = query(
            collection(db, 'comments', doc.id, 'replies'),
            orderBy('createdAt', 'desc')
          );
          const repliesSnapshot = await getDocs(repliesQuery);
          const repliesData = repliesSnapshot.docs.map(replyDoc => ({
            id: replyDoc.id,
            ...replyDoc.data(),
          }));
          return { ...commentData, replies: repliesData };
        })
      );
      setComments(commentsData);
      setTimeout(() => setCommentStatus(null), 5000);
    } catch (err) {
      console.error('Error submitting reply:', err);
      setCommentStatus('Failed to submit reply. Please try again.');
    }
  };

  const handleLike = async (commentId) => {
    if (likedComments.has(commentId)) return;
    try {
      await updateDoc(doc(db, 'comments', commentId), {
        likes: increment(1),
      });
      setLikedComments(prev => {
        const newLikes = new Set(prev);
        newLikes.add(commentId);
        localStorage.setItem(`likedComments_${id}`, JSON.stringify([...newLikes]));
        return newLikes;
      });
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId ? { ...comment, likes: (comment.likes || 0) + 1 } : comment
        )
      );
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const toggleExpandComment = (commentId) => {
    setExpandedCommentId(expandedCommentId === commentId ? null : commentId);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-center text-black">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-center text-red-500">Post not found.</p>
      </div>
    );
  }

  const { media, text } = extractMediaAndText(post.content);
  const publishDateTime = new Date(post.publishDate);
  const formattedDate = publishDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = publishDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-4 text-black">{post.title}</h1>
          <div className="text-center mb-6">
            <p className="text-black">Published by {post.author || 'Unknown Author'}</p>
            <p className="text-black">
              {formattedDate}, {formattedTime}
            </p>
          </div>
          <div className="prose max-w-3xl mx-auto text-black">
            {media.length > 0 && (
              <div className="mb-6">
                {media.map((mediaItem, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: mediaItem }} />
                ))}
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </div>

          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Comments</h2>

            <form onSubmit={handleCommentSubmit} className="mb-8 max-w-3xl mx-auto">
              <div className="mb-4">
                <label htmlFor="userName" className="block text-gray-700 mb-2">
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter your name (or leave blank for Anonymous)"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="commentText" className="block text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  id="commentText"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  rows="4"
                  placeholder="Write your comment here..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors"
              >
                Submit Comment
              </button>
              {commentStatus && (
                <p className={`mt-4 ${commentStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                  {commentStatus}
                </p>
              )}
            </form>

            {comments.length > 0 ? (
              <>
                <div className="space-y-4 max-w-3xl mx-auto">
                  {displayedComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => toggleExpandComment(comment.id)}
                    >
                      <p className="text-gray-700">
                        {expandedCommentId === comment.id
                          ? comment.commentText
                          : comment.commentText.length > 100
                          ? `${comment.commentText.substring(0, 100)}...`
                          : comment.commentText}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        By {comment.userName} on{' '}
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(comment.id);
                          }}
                          className={`flex items-center space-x-1 ${
                            likedComments.has(comment.id) ? 'text-gray-400' : 'text-sky-500'
                          }`}
                          disabled={likedComments.has(comment.id)}
                        >
                          <span>❤️</span>
                          <span>{comment.likes || 0}</span>
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="text-sky-500 hover:underline"
                        >
                          Reply
                        </button>
                      </div>

                      {expandedCommentId === comment.id && (
                        <div
                          className="mt-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-6 space-y-2">
                              <h4 className="text-lg font-semibold">Replies</h4>
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="p-2 bg-gray-100 rounded-lg"
                                >
                                  <p className="text-gray-700">{reply.replyText}</p>
                                  <p className="text-sm text-gray-500">
                                    By {reply.userName} on{' '}
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mt-4 ml-6">
                            <h4 className="text-lg font-semibold">Add a Reply</h4>
                            <div className="mb-2">
                              <label htmlFor={`replyUserName-${comment.id}`} className="block text-gray-700">
                                Name (optional)
                              </label>
                              <input
                                type="text"
                                id={`replyUserName-${comment.id}`}
                                value={replyUserName}
                                onChange={(e) => setReplyUserName(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Enter your name (or leave blank for Anonymous)"
                              />
                            </div>
                            <div className="mb-2">
                              <label htmlFor={`replyText-${comment.id}`} className="block text-gray-700">
                                Reply
                              </label>
                              <textarea
                                id={`replyText-${comment.id}`}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                rows="2"
                                placeholder="Write your reply here..."
                                required
                              />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReplySubmit(comment.id);
                              }}
                              className="bg-sky-500 text-white px-4 py-1 rounded-full hover:bg-sky-600 transition-colors"
                            >
                              Submit Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!showAllComments && comments.length > 3 && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setShowAllComments(true)}
                      className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors"
                    >
                      Dive Into the Conversation
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
            )}
          </section>

          <div className="text-center mt-8">
            <Link href="/blog" className="text-blue-500 hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}