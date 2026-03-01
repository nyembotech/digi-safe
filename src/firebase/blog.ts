import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from './config';
import { uploadImage, deleteImage } from './storage';
import { showToast } from '../lib/toast';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export async function getBlogPosts() {
  try {
    const postsRef = collection(db, 'blog_posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    showToast.error('Failed to load blog posts');
    throw error;
  }
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    // Validate required fields
    if (!data.title || !data.content || !data.author || !data.date) {
      throw new Error('Missing required fields');
    }

    // Handle image upload if provided
    let imageUrl = data.imageUrl;
    if (data.imageUrl && data.imageUrl.startsWith('data:')) {
      const imageId = uuidv4();
      const path = `blog-images/${imageId}`;
      imageUrl = await uploadImage(data.imageUrl, path);
    }

    const docRef = await addDoc(collection(db, 'blog_posts'), {
      ...data,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
  try {
    // Validate ID
    if (!id) {
      throw new Error('Blog post ID is required');
    }

    // Handle image update if provided
    let imageUrl = data.imageUrl;
    if (data.imageUrl && data.imageUrl.startsWith('data:')) {
      // Delete old image if exists
      const oldPost = await getBlogPost(id);
      if (oldPost?.imageUrl) {
        await deleteImage(oldPost.imageUrl);
      }

      // Upload new image
      const imageId = uuidv4();
      const path = `blog-images/${imageId}`;
      imageUrl = await uploadImage(data.imageUrl, path);
    }

    const postRef = doc(db, 'blog_posts', id);
    await updateDoc(postRef, {
      ...data,
      imageUrl,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: string) {
  try {
    // Validate ID
    if (!id) {
      throw new Error('Blog post ID is required');
    }

    // Delete associated image if exists
    const post = await getBlogPost(id);
    if (post?.imageUrl) {
      await deleteImage(post.imageUrl);
    }

    await deleteDoc(doc(db, 'blog_posts', id));
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, 'blog_posts', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}