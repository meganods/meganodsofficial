import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      phone = '', 
      company = '', 
      service = 'General Inquiry', 
      message = '', 
      source = 'WEBSITE_POPUP' 
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company.trim(),
      service,
      message: message.trim(),
      source,
      status: 'NEW',
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    };

    // 1. Save to Firebase Firestore Database
    const docRef = await addDoc(collection(db, 'leads'), leadData);

    // 2. Sync to Google Sheets if a Webhook URL is configured
    const sheetWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: docRef.id,
            timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone,
            company: leadData.company,
            service: leadData.service,
            message: leadData.message,
            source: leadData.source,
            status: leadData.status,
          }),
        });
      } catch (sheetError) {
        console.error('Failed to sync lead to Google Sheet webhook:', sheetError);
      }
    }

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Lead registered successfully in database and synced to spreadsheet.',
    });
  } catch (error: any) {
    console.error('Error in /api/leads route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
