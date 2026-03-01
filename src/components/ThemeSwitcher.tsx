import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isCanvas = theme === 'canvas';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative flex h-10 w-20 items-center rounded-full p-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eu-gold focus-visible:ring-offset-2',
        'backdrop-blur-lg border shadow-lg'
      )}
      style={{
        background: isCanvas
          ? 'linear-gradient(135deg, rgba(0, 51, 153, 0.1) 0%, rgba(255, 215, 0, 0.15) 100%)'
          : 'linear-gradient(135deg, rgba(76, 126, 255, 0.3) 0%, rgba(19, 64, 197, 0.4) 100%)',
        borderColor: isCanvas
          ? 'var(--chip-border)'
          : 'rgba(76, 126, 255, 0.4)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isCanvas ? 'Europa Blue' : 'Canvas Glow'} theme`}
      aria-pressed={!isCanvas}
    >
      {/* Sliding background */}
      <motion.div
        className={cn(
          'absolute inset-1 rounded-full shadow-md',
          isCanvas
            ? 'bg-gradient-to-br from-amber-100 to-amber-200'
            : 'bg-gradient-to-br from-blue-600 to-indigo-700'
        )}
        animate={{
          x: isCanvas ? 0 : 36,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        style={{
          width: '32px',
          height: '32px',
        }}
      />

      {/* Icons */}
      <div className="relative z-10 flex w-full items-center justify-between px-1">
        <motion.div
          animate={{
            scale: isCanvas ? 1 : 0.7,
            opacity: isCanvas ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun
            className={cn(
              'h-5 w-5 transition-colors',
              isCanvas ? 'text-amber-700' : 'text-amber-300/60'
            )}
          />
        </motion.div>
        <motion.div
          animate={{
            scale: isCanvas ? 0.7 : 1,
            opacity: isCanvas ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon
            className={cn(
              'h-5 w-5 transition-colors',
              isCanvas ? 'text-blue-400/60' : 'text-blue-100'
            )}
          />
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          background: isCanvas
            ? 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(76, 126, 255, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
}
