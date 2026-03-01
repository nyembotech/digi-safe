import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.privacy': 'Privacy Policy',
    'nav.login': 'Login',
    'nav.dashboard': 'Dashboard',
    'nav.signOut': 'Sign Out',

    // Hero Section
    'hero.title': 'Secure Their Digital Future',
    'hero.subtitle': 'The European Smartphone License - empowering the next generation with certified digital safety skills',
    'hero.cta': 'Get Licensed Now',
    'hero.stats.licensed': 'Licensed Kids',
    'hero.stats.passRate': 'Pass Rate',
    'hero.stats.recognition': 'EU Recognition',

    // Courses Section
    'courses.title': 'Discover Your Path',
    'courses.subtitle': 'Our Programs',
    'courses.category.safety': 'Smartphone License',
    'courses.category.technology': 'Intro to Early AI',
    'courses.category.engineering': 'Young AI Engineers',
    'courses.viewCourses': 'View Courses',
    'courses.searchPlaceholder': 'Search courses...',
    'courses.noResults': 'No courses found matching your criteria.',
    'courses.price': 'Price',
    'courses.duration': 'Duration',
    'courses.level': 'Level',
    'courses.language': 'Language',
    'courses.instructor': 'Instructor',
    'courses.enrollments': 'enrolled',
    'courses.seats': 'seats left',
    'courses.full': 'Full',
    'courses.bookNow': 'Book Now',
    'courses.viewDetails': 'View Details',

    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Your Privacy Matters',
    'privacy.lastUpdated': 'Last Updated',
    'privacy.intro': 'Welcome to DigiSafe Europe\'s Privacy Policy',
    'privacy.content': 'Learn how we protect and manage your data',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.contact': 'Contact Us',
    'footer.privacy': 'Privacy Policy',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.courses': 'Kurse',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'nav.privacy': 'Datenschutzerklärung',
    'nav.login': 'Anmelden',
    'nav.dashboard': 'Dashboard',
    'nav.signOut': 'Abmelden',

    // Hero Section
    'hero.title': 'Sichere ihre digitale Zukunft',
    'hero.subtitle': 'Die Europäische Smartphone-Lizenz - Befähigung der nächsten Generation mit zertifizierten digitalen Sicherheitskompetenzen',
    'hero.cta': 'Jetzt Lizenz erhalten',
    'hero.stats.licensed': 'Lizenzierte Kinder',
    'hero.stats.passRate': 'Erfolgsquote',
    'hero.stats.recognition': 'EU-Anerkennung',

    // Courses Section
    'courses.title': 'Entdecke deinen Weg',
    'courses.subtitle': 'Unsere Programme',
    'courses.category.safety': 'Smartphone-Lizenz',
    'courses.category.technology': 'Einführung in KI',
    'courses.category.engineering': 'Junge KI-Ingenieure',
    'courses.viewCourses': 'Kurse ansehen',
    'courses.searchPlaceholder': 'Kurse suchen...',
    'courses.noResults': 'Keine Kurse gefunden, die Ihren Kriterien entsprechen.',
    'courses.price': 'Preis',
    'courses.duration': 'Dauer',
    'courses.level': 'Niveau',
    'courses.language': 'Sprache',
    'courses.instructor': 'Dozent',
    'courses.enrollments': 'eingeschrieben',
    'courses.seats': 'Plätze frei',
    'courses.full': 'Ausgebucht',
    'courses.bookNow': 'Jetzt buchen',
    'courses.viewDetails': 'Details ansehen',

    // Privacy Policy
    'privacy.title': 'Datenschutzerklärung',
    'privacy.subtitle': 'Ihr Datenschutz ist uns wichtig',
    'privacy.lastUpdated': 'Zuletzt aktualisiert',
    'privacy.intro': 'Willkommen zur Datenschutzerklärung von DigiSafe Europe',
    'privacy.content': 'Erfahren Sie, wie wir Ihre Daten schützen und verwalten',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.contact': 'Kontakt',
    'footer.privacy': 'Datenschutz',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'de') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};