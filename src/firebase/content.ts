import { collection, doc, getDocs, updateDoc, query, orderBy, where, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config';
import type { PageContent, NavigationItem } from '../types/content';

export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    const pagesRef = collection(db, 'pages');
    const q = query(pagesRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as PageContent;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

async function getNavigation(): Promise<NavigationItem[]> {
  try {
    const navRef = collection(db, 'navigation');
    const q = query(navRef, orderBy('order'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NavigationItem[];
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
}

export async function updatePageContent(pageId: string, content: Partial<PageContent>) {
  try {
    const pageRef = doc(db, 'pages', pageId);
    await updateDoc(pageRef, {
      ...content,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating page content:', error);
    throw error;
  }
}

export async function getPrivacyPolicy() {
  try {
    const docRef = doc(db, 'content', 'privacy_policy');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    
    // Return default content if no document exists
    return {
      lastUpdated: new Date().toISOString(),
      sections: [
        {
          id: 'introduction',
          title: 'Introduction',
          content: `<p>DigiSafe-Europe is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.</p>`
        },
        {
          id: 'data-collection',
          title: 'Data Collection',
          content: `<p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Course enrollment data</li>
            <li>Payment information</li>
          </ul>`
        },
        {
          id: 'data-use',
          title: 'How We Use Your Data',
          content: `<p>We use your information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process your payments</li>
            <li>Send you updates and communications</li>
            <li>Ensure platform security</li>
          </ul>`
        },
        {
          id: 'data-protection',
          title: 'Data Protection',
          content: `<p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>`
        },
        {
          id: 'your-rights',
          title: 'Your Rights',
          content: `<p>Under GDPR, you have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>`
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    return null;
  }
}

export async function getFAQs() {
  try {
    const faqsRef = collection(db, 'faqs');
    const q = query(faqsRef, orderBy('order'));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }
    
    // Return default FAQs if none exist
    const defaultFAQs = [
      {
        question: "What age groups are your courses designed for?",
        answer: "Our courses are tailored for children aged 8-16 years old, with different difficulty levels and content appropriate for each age group.",
        order: 1
      },
      {
        question: "How do I book a training session?",
        answer: "You can book a training session through our Courses page. Simply select your preferred course, choose an available session, and complete the booking process.",
        order: 2
      },
      {
        question: "Are your courses available online?",
        answer: "Yes, all our courses are available both online and in-person. Online sessions are conducted through our secure virtual classroom platform.",
        order: 3
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, PayPal, and bank transfers. We also offer subsidized pricing for eligible families.",
        order: 4
      },
      {
        question: "How do you ensure online safety during courses?",
        answer: "We implement strict security protocols, monitor all sessions, and use AI-powered safety tools to create a secure learning environment.",
        order: 5
      }
    ];

    // Add default FAQs to Firestore
    for (const faq of defaultFAQs) {
      await addDoc(collection(db, 'faqs'), {
        ...faq,
        createdAt: new Date().toISOString()
      });
    }

    return defaultFAQs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function updateFAQ(id: string, data: { question: string; answer: string; order: number }) {
  try {
    const faqRef = doc(db, 'faqs', id);
    await updateDoc(faqRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    throw error;
  }
}

export async function createFAQ(data: { question: string; answer: string; order: number }) {
  try {
    const docRef = await addDoc(collection(db, 'faqs'), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    throw error;
  }
}

export async function deleteFAQ(id: string) {
  try {
    await deleteDoc(doc(db, 'faqs', id));
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    throw error;
  }
}