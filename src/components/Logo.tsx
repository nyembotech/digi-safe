import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Shield, Star } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [30, -30]);
  const rotateY = useTransform(mouseX, [-100, 100], [-30, 30]);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const sizes = {
    sm: {
      container: 'w-8 h-8',
      icon: 'w-5 h-5',
      star: 'w-2 h-2',
      text: 'text-lg',
      subtext: 'text-xs'
    },
    md: {
      container: 'w-12 h-12',
      icon: 'w-8 h-8',
      star: 'w-3 h-3',
      text: 'text-xl',
      subtext: 'text-xs'
    },
    lg: {
      container: 'w-16 h-16',
      icon: 'w-10 h-10',
      star: 'w-4 h-4',
      text: 'text-2xl',
      subtext: 'text-sm'
    }
  };

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`relative ${sizes[size].container}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
      >
        {/* 3D Shield Container */}
        <motion.div
          className="w-full h-full relative"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Base Shield Layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#003399] to-[#002868] rounded-lg"
            style={{ transform: "translateZ(-4px)" }}
          />

          {/* Middle Shield Layer */}
          <motion.div
            className="absolute inset-0.5 bg-gradient-to-br from-[#003399]/90 to-[#002868]/90 rounded-lg"
            style={{ transform: "translateZ(-2px)" }}
          />

          {/* Top Shield Layer with Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateZ(0px)" }}
          >
            <Shield className={`${sizes[size].icon} text-[#FFD700]`} />
          </motion.div>

          {/* Animated Stars */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                left: `${50 + 35 * Math.cos(2 * Math.PI * i / 12)}%`,
                top: `${50 + 35 * Math.sin(2 * Math.PI * i / 12)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Star className={`${sizes[size].star} text-[#FFD700]`} />
            </motion.div>
          ))}

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 215, 0, 0.2)",
                "0 0 40px rgba(255, 215, 0, 0.4)",
                "0 0 20px rgba(255, 215, 0, 0.2)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className={`${sizes[size].text} font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#003399] to-[#002868]`}>
          DigiSafe
        </span>
        <span className={`${sizes[size].subtext} font-medium text-[#003399]/80`}>
          Europe
        </span>
      </motion.div>
    </div>
  );
}