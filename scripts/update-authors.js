import dotenv from 'dotenv';
import { db } from '../services/firebase.js';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Debug: Log the API key to confirm it's being loaded
console.log('Loaded API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

async function updateAuthors() {
  try {
    const postsRef = collection(db, 'Posts');
    const postsSnapshot = await getDocs(postsRef);

    for (const postDoc of postsSnapshot.docs) {
      const postRef = doc(db, 'Posts', postDoc.id);
      await updateDoc(postRef, {
        author: 'OpenSignal',
      });
      console.log(`Updated author for post: ${postDoc.data().title}`);
    }
    console.log('All posts updated successfully.');
  } catch (error) {
    console.error('Error updating authors:', error);
  }
}

updateAuthors();