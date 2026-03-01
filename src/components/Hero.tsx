import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Lock, Sparkles, Star } from 'lucide-react';
import { Button } from './Button';
import { getDashboardStats } from '../firebase/dashboard';
import { useLanguage } from '../context/LanguageContext';
import type { DashboardStats } from '../types/dashboard';

const FloatingIcon = ({ icon: Icon, delay, x, y }: { icon: React.ElementType; delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute text-eu-blue/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      y: [y, y - 20, y],
      x: [x, x + 10, x]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    <Icon className="w-12 h-12" />
  </motion.div>
);

const GlowingCircle = ({ delay, size, x, y }: { delay: number, size: number, x: number, y: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-eu-blue/5 to-eu-gold/5"
    style={{ width: size, height: size }}
    initial={{ opacity: 0.1, scale: 0.8 }}
    animate={{
      opacity: [0.05, 0.15, 0.05],
      scale: [0.8, 1, 0.8],
      x: [x, x + 20, x],
      y: [y, y - 20, y]
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  />
);

const EUStar = ({ index }: { index: number }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 1, 0.3],
      scale: [1, 1.2, 1],
      rotate: [0, 360]
    }}
    transition={{
      duration: 4,
      delay: index * 0.2,
      repeat: Infinity,
      repeatType: "reverse"
    }}
    style={{
      left: `${50 + 35 * Math.cos(2 * Math.PI * index / 12)}%`,
      top: `${30 + 35 * Math.sin(2 * Math.PI * index / 12)}%`
    }}
  >
    <Star className="w-4 h-4 text-eu-gold filter blur-[0.5px]" />
  </motion.div>
);

export function Hero() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadStats = async () => {
      const dashboardStats = await getDashboardStats();
      setStats(dashboardStats);
    };
    loadStats();
  }, []);

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[var(--surface-primary)] pt-16 pb-12 lg:pb-20">
      {/* Clean Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,51,153,0.03) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0,51,153,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </div>

      {/* Subtle EU Color Accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-eu-blue via-eu-gold to-eu-blue"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {[Bot, Lock].map((Icon, index) => (
        <FloatingIcon 
          key={index}
          icon={Icon}
          delay={index * 0.5}
          x={100 + index * 200}
          y={100 + index * 100}
        />
      ))}

      {[...Array(5)].map((_, index) => (
        <GlowingCircle
          key={index}
          delay={index * 0.3}
          size={100 + index * 50}
          x={200 + index * 100}
          y={150 + index * 80}
        />
      ))}

      {[...Array(12)].map((_, index) => (
        <EUStar key={index} index={index} />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative z-10 space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-eu-blue/10 to-eu-gold/10 backdrop-blur-sm border border-eu-blue/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-5 h-5 text-eu-blue"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles />
              </motion.div>
              <span className="text-sm font-medium text-eu-blue">Digital Safety Excellence</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight">
                <motion.span
                  className="text-theme-primary block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t('hero.title')}
                </motion.span>
              </h1>

              <motion.p
                className="text-theme-secondary text-xl leading-relaxed max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('hero.subtitle')}
              </motion.p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="primary" 
                className="group bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFE44D] hover:to-[#FFD700] text-[#001B44] text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/25"
              >
                <motion.span 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {t('hero.cta')}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { 
                  value: stats ? `${stats.totalRegistrations}+` : '0',
                  label: t('hero.stats.licensed')
                },
                { 
                  value: stats ? `${stats.completionRate}%` : '0%',
                  label: t('hero.stats.passRate')
                },
                { 
                  value: "100%",
                  label: t('hero.stats.recognition')
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-4xl font-extrabold text-theme-primary"
                    animate={{ 
                      textShadow: ["0 0 10px rgba(255,215,0,0.15)", "0 0 20px rgba(255,215,0,0.3)", "0 0 10px rgba(255,215,0,0.15)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="mt-1 text-sm text-theme-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 via-transparent to-[#FFD700]/10"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative p-8">
                <motion.div 
                  className="aspect-[4/3] rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80"
                    alt="European Smartphone License"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div 
                  className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#001B44] via-[#001B44]/90 to-transparent"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div 
                      className="flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'var(--accent-contrast)',
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="h-4 w-4 text-[#FFD700]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock />
                      </motion.div>
                      <span className="text-sm">Official EU Certificate</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'var(--accent-contrast)',
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="h-4 w-4 text-[#FFD700]" />
                      <span className="text-sm">Digital Safety Verified</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFD700]/20 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
