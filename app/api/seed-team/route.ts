import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';

const salesMembers = [
  {
    name: 'Ananya Sharma',
    role: 'Enterprise Sales Lead & Client Partner',
    bio: 'Experienced enterprise technology sales leader specializing in digital transformation consulting, B2B SaaS solutions, and scaling global client accounts across North America, APAC, and EMEA.',
    avatarUrl: '/team/ananya-sharma.jpg',
    initials: 'AS',
    meta: 'Sales Lead 01',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    order: 4,
    isLeader: false,
    social: {
      linkedin: 'https://www.linkedin.com/in/meganods-08b7b5400/',
      twitter: '',
      github: '',
      email: 'sales@meganods.com'
    }
  },
  {
    name: 'Pooja Verma',
    role: 'Senior Business Development Executive',
    bio: 'Dynamic sales strategist driving client acquisition, market expansion, and tailored technology delivery partnerships for enterprise cloud, web platforms, and AI initiatives.',
    avatarUrl: '/team/pooja-verma.jpg',
    initials: 'PV',
    meta: 'Sales Executive 02',
    gradient: 'from-purple-600 via-pink-600 to-indigo-500',
    order: 5,
    isLeader: false,
    social: {
      linkedin: 'https://www.linkedin.com/in/meganods-08b7b5400/',
      twitter: '',
      github: '',
      email: 'sales@meganods.com'
    }
  },
  {
    name: 'Rhea Sen',
    role: 'Enterprise Client Solutions & Account Executive',
    bio: 'Results-oriented technology sales consultant dedicated to aligning complex technical architectures with client business objectives, accelerating deal velocity, and ensuring customer success.',
    avatarUrl: '/team/rhea-sen.jpg',
    initials: 'RS',
    meta: 'Sales Solutions 03',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    order: 6,
    isLeader: false,
    social: {
      linkedin: 'https://www.linkedin.com/in/meganods-08b7b5400/',
      twitter: '',
      github: '',
      email: 'sales@meganods.com'
    }
  }
];

export async function GET() {
  try {
    const colRef = collection(db, 'team');
    const existing = await getDocs(colRef);
    const existingNames = new Set(existing.docs.map(d => d.data().name?.toLowerCase()));

    const added = [];
    for (const member of salesMembers) {
      if (!existingNames.has(member.name.toLowerCase())) {
        const docRef = await addDoc(colRef, {
          ...member,
          slug: member.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        added.push({ id: docRef.id, name: member.name });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'SALES_PERSONNEL_NODES_SYNCHRONIZED',
      addedCount: added.length,
      added 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
