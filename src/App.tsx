import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { WhyUs } from './components/WhyUs';
import { Services } from './components/Services';
import { EventDetails } from './components/EventDetails';
import { Struggle } from './components/Struggle';
import { Testimonials } from './components/Testimonials';
import { CallToAction } from './components/CallToAction';
import { UserFlowShowcase } from './components/UserFlowShowcase';
import { BusinessImpact } from './components/BusinessImpact';
import { Footer } from './components/Footer';
import { Dashboard } from './components/admin/Dashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { LoginPage } from './components/LoginPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { StudentLogin } from './components/student/StudentLogin';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';

const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)] transition-colors duration-500">
    <Navbar />
    <main className="relative z-10">{children}</main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/student/login" element={<StudentLogin />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageShell>
                  <Dashboard />
                </PageShell>
              </ProtectedRoute>
            } />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <PageShell>
                  <StudentDashboard />
                </PageShell>
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/contact" element={
              <PageShell>
                <Contact />
              </PageShell>
            } />
            
            <Route path="/blog" element={
              <PageShell>
                <Blog />
              </PageShell>
            } />
            
            <Route path="/privacy-policy" element={
              <PageShell>
                <PrivacyPolicy />
              </PageShell>
            } />
            
            <Route path="/" element={
              <PageShell>
                <Hero />
                <UserFlowShowcase />
                <Courses />
                <BusinessImpact />
                <WhyUs />
                <Services />
                <EventDetails />
                <Struggle />
                <Testimonials />
                <CallToAction />
              </PageShell>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
