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
import { db } from "./firebase";
import type { Post, InsertPost } from "@shared/schema";

const POSTS_COLLECTION = "posts";

export async function createPost(postData: InsertPost): Promise<void> {
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
}

export function subscribeToPostsExclude(callback: (posts: Post[]) => void): Unsubscribe {
  const q = query(
    collection(db, POSTS_COLLECTION),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, (snapshot) => {
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
  });
}

export async function toggleLike(postId: string, userAddress: string): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  const normalizedAddress = userAddress.toLowerCase();

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
}

export async function toggleDislike(postId: string, userAddress: string): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  const normalizedAddress = userAddress.toLowerCase();

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
}
