import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { defaultProjects } from '@/lib/data/projects';

export async function GET() {
  try {
    const colRef = collection(db, 'projects');
    const existing = await getDocs(colRef);
    
    // Clear existing
    for (const d of existing.docs) {
      await deleteDoc(doc(db, 'projects', d.id));
    }

    // Add new projects
    for (const p of defaultProjects) {
      await addDoc(colRef, {
        ...p,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    return NextResponse.json({ success: true, message: 'PROJECT_REGISTRY_SYNCHRONIZED', total: defaultProjects.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
