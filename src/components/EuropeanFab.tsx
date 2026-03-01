import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield } from 'lucide-react';

interface EuropeanFABProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function EuropeanFAB({ 
  onClick, 
  icon, 
  label, 
  variant = 'primary',
  className = '' 
}: EuropeanFABProps) {
  const isSecondary = variant === 'secondary';

  return (
    <motion.button
      onClick={onClick}
      className={`
        group relative inline-flex items-center gap-3 px-6 py-4 rounded-2xl
        shadow-floating hover:shadow-eu-hover transition-all duration-500 overflow-hidden
        ${isSecondary ? 'btn-eu-secondary' : 'btn-eu-primary'}
        ${className}
      `}
      whileHover={{ 
        scale: 1.05, 
        y: -6,
        rotateX: 5,
        rotateY: isSecondary ? 5 : -5
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* EU Flag background effect */}
      <motion.div 
        className={`
          absolute inset-0 bg-gradient-to-r 
          ${isSecondary 
            ? 'from-eu-yellow-600/20 via-eu-blue-700/20 to-eu-yellow-600/20' 
            : 'from-eu-blue-700/20 via-eu-yellow-600/20 to-eu-blue-700/20'
          }
          translate-y-full group-hover:translate-y-0 transition-transform duration-300
        `}
      />
      
      {/* EU Stars decoration */}
      <div className="absolute -top-2 -right-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star className={`w-4 h-4 ${isSecondary ? 'text-eu-blue-700/50' : 'text-eu-yellow-600/50'}`} />
        </motion.div>
      </div>
      
      {/* Icon */}
      {icon && (
        <motion.div
          className="relative z-10"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      )}
      
      {/* Label */}
      <span className="relative z-10 font-semibold">{label}</span>
      
      {/* European Certificate Badge */}
      <motion.div
        className="relative z-10 flex items-center gap-1 text-xs opacity-70"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Shield className="w-3 h-3" />
        <span>EU</span>
      </motion.div>
      
      {/* Shimmer effect */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-1000
        `} 
      />
      
      {/* 3D depth effect */}
      <div 
        className={`
          absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${isSecondary 
            ? 'border-eu-blue-700/30' 
            : 'border-eu-yellow-600/30'
          }
        `} 
      />
    </motion.button>
  );
}

// Progress indicator with EU stars
export function EuropeanProgress({ 
  progress, 
  className = '' 
}: { 
  progress: number; 
  className?: string; 
}) {
  return (
    <div className={`relative w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="progress-eu h-full relative"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* EU Stars on progress bar */}
        {[...Array(Math.floor(progress / 20))].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ left: `${(i + 1) * 20 - 10}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: "spring", bounce: 0.5 }}
          >
            <Star className="w-2 h-2 text-white eu-star" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// European Certificate Badge
export function EuropeanCertificate({ 
  isVerified = false,
  className = '' 
}: { 
  isVerified?: boolean;
  className?: string; 
}) {
  return (
    <motion.div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        ${isVerified 
          ? 'bg-gradient-to-r from-eu-yellow-600 to-eu-yellow-700 text-eu-blue-800' 
          : 'bg-gray-100 text-gray-500'
        }
        shadow-eu-card border border-eu-blue-700/20 ${className}
      `}
      whileHover={{ scale: 1.05, y: -2 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        animate={isVerified ? { rotate: 360 } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Star className={`w-4 h-4 ${isVerified ? 'text-eu-blue-800' : 'text-gray-400'}`} />
      </motion.div>
      <span className="text-sm font-semibold">
        {isVerified ? 'Verified' : 'Pending Verification'}
      </span>
      {isVerified && (
        <Shield className="w-4 h-4 text-eu-blue-800" />
      )}
    </motion.div>
  );
}