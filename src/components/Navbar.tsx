import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { signOut } from '../firebase/auth';

export function Navbar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuth = async () => {
    if (user) {
      await signOut();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/courses', label: t('nav.courses') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/privacy-policy', label: t('nav.privacy') },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    return user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed z-50 w-full border-b backdrop-blur-lg"
      style={{
        background: 'var(--nav-surface)',
        borderColor: 'var(--nav-border)',
        boxShadow: 'var(--nav-shadow)',
      }}
    >
      {/* European Flag Accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eu-blue via-eu-gold to-eu-blue"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <Logo size="sm" />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`relative group py-2 px-3 lg:px-4 rounded-2xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-[var(--accent-primary)] bg-[var(--chip-bg)] border border-[var(--chip-border)] shadow-eu-card'
                      : 'text-theme-secondary border border-transparent hover:text-[var(--accent-primary)] hover:bg-[var(--chip-bg)]'
                  }`}
                  style={{
                    color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-eu-blue via-eu-gold to-eu-blue"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[var(--chip-bg)] opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to={getDashboardPath()}
                  className={`relative group flex items-center gap-2 rounded-2xl py-2 px-3 lg:px-4 transition-all duration-300 whitespace-nowrap ${
                    isActive(getDashboardPath())
                      ? 'text-[var(--accent-primary)] bg-[var(--chip-bg)] border border-[var(--chip-border)] shadow-eu-card'
                      : 'text-theme-secondary border border-transparent hover:text-[var(--accent-primary)] hover:bg-[var(--chip-bg)]'
                  }`}
                  style={{
                    color: isActive(getDashboardPath()) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <Shield className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                  <span className="relative z-10">{t(user.role === 'admin' ? 'nav.dashboard' : 'nav.dashboard')}</span>
                  {isActive(getDashboardPath()) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-eu-blue via-eu-gold to-eu-blue"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            )}

            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThemeSwitcher />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                variant="primary"
                className="btn-eu-primary flex items-center gap-2 relative overflow-hidden group whitespace-nowrap"
                onClick={handleAuth}
              >
                <motion.div
                  animate={{ rotate: user ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogIn className="w-4 h-4" />
                </motion.div>
                <span className="relative z-10">{t(user ? 'nav.signOut' : 'nav.login')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-eu-blue-600/20 to-eu-blue-800/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden rounded-2xl border bg-[var(--surface-card)] p-2 transition hover:shadow-eu-card"
            style={{
              borderColor: 'var(--chip-border)',
              color: 'var(--text-primary)',
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-b backdrop-blur-xl"
          style={{
            background: 'var(--surface-overlay)',
            borderColor: 'var(--nav-border)',
          }}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? 'font-semibold bg-[var(--chip-bg)] border-l-4 border-eu-gold'
                      : 'hover:bg-[var(--chip-bg)]'
                  }`}
                  style={{
                    color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            
            {user && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              >
                <Link
                  to={getDashboardPath()}
                  className={`flex items-center gap-2 rounded-lg py-3 px-4 transition-all duration-300 ${
                    isActive(getDashboardPath())
                      ? 'font-semibold bg-[var(--chip-bg)] border-l-4 border-eu-gold'
                      : 'hover:bg-[var(--chip-bg)]'
                  }`}
                  style={{
                    color: isActive(getDashboardPath()) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                  {t(user.role === 'admin' ? 'nav.dashboard' : 'nav.dashboard')}
                </Link>
              </motion.div>
            )}

            <motion.div 
              className="py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <LanguageSwitcher />
            </motion.div>

            <motion.div
              className="py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            >
              <ThemeSwitcher />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Button 
                variant="primary" 
                className="w-full mt-4 btn-eu-primary flex items-center justify-center gap-2 relative overflow-hidden group"
                onClick={() => {
                  handleAuth();
                  setIsMenuOpen(false);
                }}
              >
                <motion.div
                  animate={{ rotate: user ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogIn className="w-4 h-4" />
                </motion.div>
                <span className="relative z-10">{t(user ? 'nav.signOut' : 'nav.login')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-eu-blue-600/20 to-eu-blue-800/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
