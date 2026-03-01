import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Shield, Lock, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PrivacyPolicy() {
  const { t, language } = useLanguage();

  const sections = [
    {
      icon: Shield,
      title: language === 'en' ? 'Data Protection' : 'Datenschutz',
      content: language === 'en' 
        ? 'We implement state-of-the-art security measures to protect your personal data. Our infrastructure is regularly audited and updated to ensure maximum security.'
        : 'Wir setzen modernste Sicherheitsmaßnahmen zum Schutz Ihrer personenbezogenen Daten ein. Unsere Infrastruktur wird regelmäßig überprüft und aktualisiert, um maximale Sicherheit zu gewährleisten.'
    },
    {
      icon: Lock,
      title: language === 'en' ? 'Data Collection' : 'Datenerfassung',
      content: language === 'en'
        ? 'We collect only essential information needed to provide our services, including name, contact details, and course participation data. All data collection is transparent and with your consent.'
        : 'Wir erfassen nur die wesentlichen Informationen, die zur Erbringung unserer Dienstleistungen erforderlich sind, einschließlich Name, Kontaktdaten und Kursteilnahmedaten. Jede Datenerfassung erfolgt transparent und mit Ihrer Einwilligung.'
    },
    {
      icon: FileText,
      title: language === 'en' ? 'Your Rights' : 'Ihre Rechte',
      content: language === 'en'
        ? 'Under GDPR, you have the right to access, correct, or delete your personal data. You can also request data portability or object to data processing at any time.'
        : 'Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten. Sie können auch jederzeit die Datenübertragbarkeit anfordern oder der Datenverarbeitung widersprechen.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#003399] to-[#002868] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Bot className="w-8 h-8 text-[#FFD700]" />
            <h1 className="text-4xl font-bold">{t('privacy.title')}</h1>
          </div>
          <p className="text-xl max-w-2xl mx-auto text-blue-100">
            {t('privacy.subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <div className="text-center mb-12">
            <p className="text-gray-500">
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'de-DE')}
            </p>
            <h2 className="text-2xl font-bold mt-4 mb-2">{t('privacy.intro')}</h2>
            <p className="text-gray-600">{t('privacy.content')}</p>
          </div>

          <div className="grid gap-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <section.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}