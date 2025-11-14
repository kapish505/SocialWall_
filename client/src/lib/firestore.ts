import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  runTransaction,
  doc,
  serverTimestamp,
  Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db, isConfigured } from "./firebase";
import type { Post, InsertPost } from "@shared/schema";

const POSTS_COLLECTION = "posts";

export async function createPost(postData: InsertPost): Promise<void> {
  if (!isConfigured) {
    console.warn("Firebase not configured - demo mode active");
    return Promise.resolve();
  }
  
  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      message: postData.message,
      address: postData.address.toLowerCase(),
      timestamp: Date.now(),
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
      signature: postData.signature || null,
    });
  } catch (error: any) {
    if (error.code === "permission-denied") {
      console.warn("⚠️ Firestore permission denied - falling back to demo mode");
      throw new Error("PERMISSION_DENIED");
    }
    throw error;
  }
}

export function subscribeToPostsExclude(
  callback: (posts: Post[]) => void,
  onPermissionError?: () => void
): Unsubscribe {
  if (!isConfigured) {
    console.warn("Firebase not configured - no real-time updates available");
    callback([]);
    return () => {};
  }

  const q = query(
    collection(db, POSTS_COLLECTION),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const posts: Post[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          message: data.message,
          address: data.address,
          timestamp: data.timestamp,
          likes: data.likes || 0,
          dislikes: data.dislikes || 0,
          likedBy: data.likedBy || [],
          dislikedBy: data.dislikedBy || [],
          signature: data.signature,
          ensName: data.ensName,
        };
      });
      callback(posts);
    },
    (error) => {
      console.error("Firestore subscription error:", error);
      
      if (error.code === "permission-denied") {
        console.warn(
          "⚠️ Firestore permission denied!\n\n" +
          "Please configure Firestore security rules in Firebase Console.\n" +
          "See FIREBASE_SETUP.md for detailed instructions.\n\n" +
          "Falling back to demo mode with local state only."
        );
        
        if (onPermissionError) {
          onPermissionError();
        }
      }
      
      callback([]);
    }
  );
}

export async function toggleLike(postId: string, userAddress: string): Promise<void> {
  if (!isConfigured) {
    console.warn("Firebase not configured - demo mode active");
    return Promise.resolve();
  }

  const postRef = doc(db, POSTS_COLLECTION, postId);
  const normalizedAddress = userAddress.toLowerCase();

  try {
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);
      
      if (!postDoc.exists()) {
        throw new Error("Post does not exist");
      }

      const data = postDoc.data();
      const likedBy: string[] = data.likedBy || [];
      const dislikedBy: string[] = data.dislikedBy || [];
      const hasLiked = likedBy.includes(normalizedAddress);
      const hasDisliked = dislikedBy.includes(normalizedAddress);

      let newLikes = data.likes || 0;
      let newDislikes = data.dislikes || 0;
      let newLikedBy = [...likedBy];
      let newDislikedBy = [...dislikedBy];

      if (hasLiked) {
        newLikes--;
        newLikedBy = newLikedBy.filter(addr => addr !== normalizedAddress);
      } else {
        newLikes++;
        newLikedBy.push(normalizedAddress);
        
        if (hasDisliked) {
          newDislikes--;
          newDislikedBy = newDislikedBy.filter(addr => addr !== normalizedAddress);
        }
      }

      transaction.update(postRef, {
        likes: Math.max(0, newLikes),
        dislikes: Math.max(0, newDislikes),
        likedBy: newLikedBy,
        dislikedBy: newDislikedBy,
      });
    });
  } catch (error: any) {
    if (error.code === "permission-denied") {
      console.warn("⚠️ Firestore permission denied - falling back to demo mode");
      throw new Error("PERMISSION_DENIED");
    }
    throw error;
  }
}

export async function toggleDislike(postId: string, userAddress: string): Promise<void> {
  if (!isConfigured) {
    console.warn("Firebase not configured - demo mode active");
    return Promise.resolve();
  }

  const postRef = doc(db, POSTS_COLLECTION, postId);
  const normalizedAddress = userAddress.toLowerCase();

  try {
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);
      
      if (!postDoc.exists()) {
        throw new Error("Post does not exist");
      }

      const data = postDoc.data();
      const likedBy: string[] = data.likedBy || [];
      const dislikedBy: string[] = data.dislikedBy || [];
      const hasLiked = likedBy.includes(normalizedAddress);
      const hasDisliked = dislikedBy.includes(normalizedAddress);

      let newLikes = data.likes || 0;
      let newDislikes = data.dislikes || 0;
      let newLikedBy = [...likedBy];
      let newDislikedBy = [...dislikedBy];

      if (hasDisliked) {
        newDislikes--;
        newDislikedBy = newDislikedBy.filter(addr => addr !== normalizedAddress);
      } else {
        newDislikes++;
        newDislikedBy.push(normalizedAddress);
        
        if (hasLiked) {
          newLikes--;
          newLikedBy = newLikedBy.filter(addr => addr !== normalizedAddress);
        }
      }

      transaction.update(postRef, {
        likes: Math.max(0, newLikes),
        dislikes: Math.max(0, newDislikes),
        likedBy: newLikedBy,
        dislikedBy: newDislikedBy,
      });
    });
  } catch (error: any) {
    if (error.code === "permission-denied") {
      console.warn("⚠️ Firestore permission denied - falling back to demo mode");
      throw new Error("PERMISSION_DENIED");
    }
    throw error;
  }
}
