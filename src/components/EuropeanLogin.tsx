import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Star, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Users,
  Globe
} from 'lucide-react';
import { EuropeanFAB, EuropeanCertificate } from './EuropeanFab';

export function EuropeanLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eu-blue-900 via-eu-blue-800 to-eu-blue-700 relative overflow-hidden">
      {/* European Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* EU Stars Background Pattern */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15,
              delay: i * 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${5 + (i % 4) * 25}%`,
              top: `${5 + Math.floor(i / 4) * 30}%`
            }}
          >
            <Star className="w-12 h-12 text-eu-yellow-600/30 eu-star" />
          </motion.div>
        ))}
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-eu-yellow-600/20 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-eu-blue-600/20 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-eu-yellow-600 to-eu-yellow-700 flex items-center justify-center shadow-eu-glow">
                  <Shield className="w-10 h-10 text-eu-blue-800" />
                </div>
                {/* Orbiting EU stars */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3"
                    style={{
                      top: `${10 + 80 * Math.sin(2 * Math.PI * i / 6)}%`,
                      left: `${10 + 80 * Math.cos(2 * Math.PI * i / 6)}%`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <Star className="w-full h-full text-eu-yellow-600/80" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold text-white mb-2"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.4)",
                  "0 0 40px rgba(255, 215, 0, 0.7)",
                  "0 0 20px rgba(255, 215, 0, 0.4)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              DigiSafe Europe
            </motion.h1>
            <p className="text-eu-yellow-100 text-lg">Secure European Digital Learning</p>
            
            <div className="flex justify-center mt-4">
              <EuropeanCertificate isVerified={true} />
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="glass-eu-card rounded-3xl p-8 shadow-eu-hover border border-eu-yellow-600/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* EU Flag gradient border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-eu-blue-700 via-eu-yellow-600 to-eu-blue-700 opacity-60">
              <div className="w-full h-full rounded-3xl bg-transparent" />
            </div>

            {/* Glassmorphism shimmer */}
            <div className="absolute inset-0 glass-shimmer opacity-20" />

            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-eu-blue-800 mb-2">Welcome Back</h2>
                <p className="text-eu-blue-700">Sign in to your European learning account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-eu-blue-800 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <Mail className="w-5 h-5 text-eu-blue-600" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass-eu w-full pl-12 pr-4 py-4 rounded-xl border border-eu-blue-700/30 focus:border-eu-yellow-600 focus:ring-2 focus:ring-eu-yellow-600/20 text-eu-blue-800 placeholder-eu-blue-600/60 transition-all duration-300"
                      placeholder="your@email.eu"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-eu-blue-800 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <Lock className="w-5 h-5 text-eu-blue-600" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="glass-eu w-full pl-12 pr-12 py-4 rounded-xl border border-eu-blue-700/30 focus:border-eu-yellow-600 focus:ring-2 focus:ring-eu-yellow-600/20 text-eu-blue-800 placeholder-eu-blue-600/60 transition-all duration-300"
                      placeholder="Your secure password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-eu-blue-600 hover:text-eu-blue-800 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* Security Features */}
                <motion.div
                  className="glass-eu p-4 rounded-xl border border-eu-yellow-600/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-3 text-sm text-eu-blue-700">
                    <CheckCircle className="w-5 h-5 text-eu-yellow-600" />
                    <span>GDPR Compliant • EU Data Protection</span>
                    <Shield className="w-4 h-4 text-eu-blue-700" />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <EuropeanFAB
                    onClick={() => {}}
                    icon={isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    label={isLoading ? "Securing Connection..." : "Sign In Securely"}
                    variant="primary"
                    className="w-full justify-center"
                  />
                </motion.div>

                {/* Footer Links */}
                <motion.div
                  className="text-center pt-4 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex justify-center gap-6 text-sm text-eu-blue-700">
                    <a href="#" className="hover:text-eu-yellow-600 transition-colors flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Create Account
                    </a>
                    <a href="#" className="hover:text-eu-yellow-600 transition-colors">
                      Forgot Password?
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-eu-blue-600">
                    <Globe className="w-4 h-4" />
                    <span>Available in 24 EU Languages</span>
                    <div className="flex gap-1">
                      {['🇪🇺', '🇩🇪', '🇫🇷', '🇪🇸'].map((flag, i) => (
                        <span key={i} className="text-lg">{flag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </form>
            </div>

            {/* Decorative EU stars */}
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 text-eu-yellow-600/30 eu-star" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-eu-yellow-600/20 eu-star" />
              </motion.div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex justify-center items-center gap-4 text-eu-yellow-100 text-sm">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>SSL Encrypted</span>
              </div>
              <div className="w-1 h-1 bg-eu-yellow-600 rounded-full" />
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>EU Verified</span>
              </div>
              <div className="w-1 h-1 bg-eu-yellow-600 rounded-full" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
