import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Loader2,
  Search,
  Sparkles,
  ArrowRight,
  Smartphone,
  Brain,
  Cpu,
  Layers3,
  Globe2,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CourseCard } from './CourseCard';
import { useDebounce } from '../lib/hooks/useDebounce';
import { useLanguage } from '../context/LanguageContext';
import { useCoursesQuery } from '../hooks/useCoursesQuery';
import { cn } from '../lib/utils';
import type { Course } from '../types/course';

const PROGRAM_TABS = [
  {
    id: 'all',
    label: 'All Courses',
    subtitle: 'Browse every European certification track',
    icon: Layers3,
    gradient: 'from-slate-200/60 to-transparent',
  },
  {
    id: 'smartphone',
    label: 'Smartphone License',
    subtitle: 'European Smartphone License mastery',
    icon: Smartphone,
    gradient: 'from-blue-500/40 to-blue-700/30',
  },
  {
    id: 'introAi',
    label: 'Intro to AI',
    subtitle: 'Creative AI discovery labs',
    icon: Cpu,
    gradient: 'from-purple-500/50 to-pink-500/40',
  },
  {
    id: 'youngEngineers',
    label: 'Young AI Engineers',
    subtitle: 'Build and launch future tech',
    icon: Brain,
    gradient: 'from-amber-400/60 to-orange-500/40',
  },
] as const;

const COURSES_PER_PAGE = 4;

const tabFilters: Record<string, (course: Course) => boolean> = {
  smartphone: (course) => {
    const matchCategory = course.category?.toLowerCase() === 'safety';
    const title = course.title?.toLowerCase() ?? '';
    return matchCategory || title.includes('smartphone');
  },
  introAi: (course) => {
    const matchCategory = course.category?.toLowerCase() === 'technology';
    const title = course.title?.toLowerCase() ?? '';
    return matchCategory || title.includes('intro') || title.includes('ai');
  },
  youngEngineers: (course) => {
    const matchCategory = course.category?.toLowerCase() === 'engineering';
    const title = course.title?.toLowerCase() ?? '';
    return matchCategory || title.includes('engineer');
  },
};

export function Courses() {
  const [activeTab, setActiveTab] = useState<(typeof PROGRAM_TABS)[number]['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { t } = useLanguage();
  const { data: courses = [], isLoading } = useCoursesQuery();

  const availableCountries = useMemo(() => {
    const countrySet = new Set<string>();
    courses.forEach((course) => {
      course.nextSessions?.forEach((session) => {
        const country = session.location?.country;
        if (country) countrySet.add(country);
      });
    });
    return Array.from(countrySet).sort();
  }, [courses]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, debouncedSearch, selectedCountry]);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesTab =
          activeTab === 'all' || tabFilters[activeTab]?.(course) || course.category === activeTab;

        const matchesSearch =
          debouncedSearch === '' ||
          course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          course.description.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesCountry =
          selectedCountry === 'all' ||
          course.nextSessions?.some(
            (session) => session.location?.country?.toLowerCase() === selectedCountry.toLowerCase()
          );

        return matchesTab && matchesSearch && matchesCountry;
      })
      .sort((a, b) => b.enrollments - a.enrollments);
  }, [courses, activeTab, debouncedSearch, selectedCountry]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / COURSES_PER_PAGE));
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface-primary)]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <section id="courses" className="relative overflow-hidden py-24 theme-section">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <motion.div
        className="absolute top-0 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 -left-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200 mb-4"
          >
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('courses.title')}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Bot className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {t('courses.subtitle')}
            </h2>
          </motion.div>
        </div>

        {/* Programs Stepper */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-theme-muted">{t('courses.subtitle')}</p>
              <h3 className="text-3xl font-semibold text-theme-primary">Our Programs</h3>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4" style={{ perspective: '2000px' }}>
            {PROGRAM_TABS.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ rotateX: -6, translateY: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'relative overflow-hidden rounded-2xl border text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eu-gold',
                    isActive
                      ? 'border-eu-gold/60 shadow-eu-floating'
                      : 'border-[var(--chip-border)] hover:shadow-eu-card'
                  )}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className={cn('absolute inset-0 opacity-60 blur-2xl', `bg-gradient-to-br ${tab.gradient}`)} />
                  <div className="relative z-10 flex h-full flex-col gap-4 p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[var(--surface-card)]/60 p-3 shadow-eu-card">
                        <Icon className="h-5 w-5 text-[var(--accent-primary)]" />
                      </div>
                      <span className="text-sm font-semibold text-theme-primary">{tab.label}</span>
                    </div>
                    <p className="text-sm text-theme-secondary">{tab.subtitle}</p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-theme-muted">
                      {index === 0 ? 'All Programs' : 'Targeted Track'}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-10 grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-theme-muted" />
            <input
              type="text"
              placeholder={t('courses.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[var(--chip-border)] bg-[var(--surface-card)] py-3 pl-12 pr-4 text-theme-primary shadow-lg transition focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] placeholder:text-theme-muted"
            />
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--chip-border)] bg-[var(--surface-card)] px-4 py-3 shadow-lg">
            <Filter className="h-5 w-5 text-theme-muted" />
            <div className="flex flex-1 flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-theme-muted">Filter by location</span>
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-[var(--accent-primary)]" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-transparent text-sm text-theme-primary focus:outline-none"
                >
                  <option value="all">All European Countries</option>
                  {availableCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {paginatedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          {filteredCourses.length === 0 && (
            <div className="theme-card col-span-2 rounded-2xl py-12 text-center">
              <p className="text-lg text-theme-secondary">
                {t('courses.noResults')}
              </p>
            </div>
          )}
        </div>

        {filteredCourses.length > COURSES_PER_PAGE && (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--chip-border)] bg-[var(--surface-card)] px-6 py-4 shadow-eu-card">
            <span className="text-sm text-theme-secondary">
              Showing <strong>{paginatedCourses.length}</strong> of <strong>{filteredCourses.length}</strong> programs
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-[var(--chip-border)] bg-[var(--surface-primary)] p-2 text-theme-primary transition disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold text-theme-primary">
                Page {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-xl border border-[var(--chip-border)] bg-[var(--surface-primary)] p-2 text-theme-primary transition disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
