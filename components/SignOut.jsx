// components/SignOut.jsx
'use client';

import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login'); // Redirect to login page after signing out
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
}