import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bot,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Heart,
  Shield,
  Award,
  CheckCircle
} from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/digisafe-europe' },
  { icon: Twitter, href: 'https://twitter.com/digisafe_europe' },
  { icon: Instagram, href: 'https://instagram.com/digisafe.europe' },
  { icon: Linkedin, href: 'https://linkedin.com/company/digisafe-europe' },
  { icon: Youtube, href: 'https://youtube.com/digisafe-europe' }
];

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Courses', path: '/courses' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy-policy' }
];

const certifications = [
  { icon: Shield, label: 'EU Digital Safety Certified' },
  { icon: Award, label: 'ISO 27001 Certified' },
  { icon: CheckCircle, label: 'GDPR Compliant' }
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden border-t border-gray-200">
      {/* Subtle EU Color Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-eu-blue via-eu-gold to-eu-blue" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,51,153,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,51,153,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <Bot className="w-8 h-8 text-eu-blue" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">DigiSafe</h3>
                <p className="text-sm text-eu-gold-dark">Europe</p>
              </div>
            </motion.div>

            <p className="text-gray-600 text-sm">
              Leading the way in digital safety education and certification across Europe.
              Empowering the next generation with comprehensive online safety skills.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-eu-blue text-gray-600 hover:text-white flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-eu-blue transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-gray-600"
              >
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-eu-blue" />
                <span>
                  Innovationsstraße 123<br />
                  60313 Frankfurt am Main<br />
                  Germany
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 text-gray-600"
              >
                <Phone className="w-5 h-5 text-eu-blue" />
                <span>+49 (0) 69 1234567</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-gray-600"
              >
                <Mail className="w-5 h-5 text-eu-blue" />
                <a
                  href="mailto:info@digisafe-europe.eu"
                  className="hover:text-eu-blue transition-colors"
                >
                  info@digisafe-europe.eu
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <div className="w-10 h-10 rounded-full bg-eu-blue/10 flex items-center justify-center">
                    <cert.icon className="w-5 h-5 text-eu-blue" />
                  </div>
                  <span>{cert.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} DigiSafe Europe GmbH. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-eu-gold" />
              <span>in Frankfurt</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}