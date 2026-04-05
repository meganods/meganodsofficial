import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';

const testimonials = [
  {
    name: 'Sarah Jamieson',
    role: 'CTO, TechFlow Systems',
    content: 'Meganods transformed our legacy infrastructure into a high-performance neural mesh. Their implementation of sub-100ms mobility was a game-changer for our APAC rollout.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5,
    tag: 'Enterprise Scalability'
  },
  {
    name: 'Marcus Thorne',
    role: 'Founder, Apex Logistics',
    content: 'The level of technical depth Meganods brings to the table is unmatched. They don\'t just build apps; they architect global operational blueprints. Absolute 10/10 technical audit.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5,
    tag: 'Tactical Deployment'
  },
  {
    name: 'Elena Vance',
    role: 'Digital Director, Vance Group',
    content: 'Their Flutter architectures are beyond Anything we\'ve seen. Smooth, kinetic, and incredibly stable. Meganods is our primary node for all high-fidelity digital solutions.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5,
    tag: 'High-Fidelity Design'
  }
];

export async function GET() {
  try {
    const colRef = collection(db, 'testimonials');
    const existing = await getDocs(colRef);
    
    // Clear existing
    for (const d of existing.docs) {
      await deleteDoc(doc(db, 'testimonials', d.id));
    }

    // Add new
    for (const t of testimonials) {
      await addDoc(colRef, {
        ...t,
        createdAt: serverTimestamp()
      });
    }

    return NextResponse.json({ success: true, message: 'TESTIMONIAL_REGISTRY_SYNCHRONIZED' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
