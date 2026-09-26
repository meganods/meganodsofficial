import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { defaultBlogs } from '@/lib/data/blogs';

export async function GET() {
  try {
    const colRef = collection(db, 'blogs');
    const existing = await getDocs(colRef);
    
    // Clear existing blogs
    for (const d of existing.docs) {
      await deleteDoc(doc(db, 'blogs', d.id));
    }

    // Add new high quality humanized blogs
    for (const b of defaultBlogs) {
      await addDoc(colRef, {
        ...b,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'BLOG_REGISTRY_SYNCHRONIZED', 
      total: defaultBlogs.length,
      articles: defaultBlogs.map(b => b.title)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
