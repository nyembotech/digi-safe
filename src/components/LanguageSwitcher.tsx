import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 rounded-2xl border border-[var(--chip-border)] bg-[var(--surface-card)] px-3 py-2 text-theme-primary transition hover:shadow-eu-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eu-gold"
      aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
    >
      <Globe className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
      <span className="text-sm font-semibold tracking-wide">{language.toUpperCase()}</span>
    </button>
  );
}
