rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Posts/{postId} { // Updated to match the collection name 'Posts'
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}