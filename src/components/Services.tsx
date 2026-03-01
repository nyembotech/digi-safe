import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Shield, 
  Sparkles, 
  Brain, 
  Users, 
  Star,
  GraduationCap,
  Award
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  euCountries: string[];
  stats: {
    value: string;
    label: string;
  };
}

const services: Service[] = [
  {
    icon: Shield,
    title: "EU Digital Safety Certificate",
    description: "The official European standard for youth digital safety certification, recognized across the EU",
    features: [
      "Official EU Recognition",
      "Cross-Border Validity",
      "Age-Appropriate Content",
      "Multi-Language Support"
    ],
    euCountries: ["🇩🇪", "🇫🇷", "🇮🇹", "🇪🇸", "🇳🇱"],
    stats: {
      value: "27",
      label: "EU Countries"
    }
  },
  {
    icon: Brain,
    title: "AI Safety Education",
    description: "Pioneering AI education program designed specifically for European youth",
    features: [
      "Ethics-First Approach",
      "Hands-on Projects",
      "Safety Guidelines",
      "Future Readiness"
    ],
    euCountries: ["🇸🇪", "🇫🇮", "🇩🇰", "🇦🇹", "🇧🇪"],
    stats: {
      value: "50K+",
      label: "Students Trained"
    }
  },
  {
    icon: GraduationCap,
    title: "Digital Citizenship Program",
    description: "Comprehensive European digital citizenship education for the next generation",
    features: [
      "Online Rights Education",
      "Digital Responsibility",
      "Privacy Protection",
      "Cyber Safety Skills"
    ],
    euCountries: ["🇵🇹", "🇮🇪", "🇬🇷", "🇵🇱", "🇭🇺"],
    stats: {
      value: "95%",
      label: "Success Rate"
    }
  },
  {
    icon: Users,
    title: "Family Safety Hub",
    description: "Collaborative platform connecting European families for safer digital experiences",
    features: [
      "Parent-Child Activities",
      "Community Support",
      "Expert Guidance",
      "Regular Workshops"
    ],
    euCountries: ["🇨🇿", "🇸🇰", "🇷🇴", "🇧🇬", "🇭🇷"],
    stats: {
      value: "10K+",
      label: "Active Families"
    }
  }
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      {/* EU Flag-inspired design with stars */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${50 + 35 * Math.cos(2 * Math.PI * i / 12)}%`,
              top: `${50 + 35 * Math.sin(2 * Math.PI * i / 12)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Star className="w-3 h-3 text-[#FFD700] filter blur-[0.5px]" />
          </motion.div>
        ))}
      </div>

      <Card
        variant="european"
        className="relative overflow-hidden border-2 border-transparent transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-eu-hover"
      >
        <CardContent className="relative space-y-5 p-8">
          <div className="absolute inset-0 opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle at top, rgba(0,51,153,0.5), transparent 55%)' }} />
          <motion.div
            className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#003399] to-[#002868] text-[#FFD700] shadow-eu-card"
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Icon className="h-8 w-8" />
          </motion.div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold text-theme-primary">{service.title}</h3>
            <p className="text-theme-secondary">{service.description}</p>

            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-theme-secondary"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx }}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-eu-gold" />
                  {feature}
                </motion.li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2">
              {service.euCountries.map((flag, idx) => (
                <motion.span
                  key={idx}
                  className="text-2xl"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                >
                  {flag}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--chip-border)] pt-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[var(--accent-primary)]">
                  {service.stats.value}
                </span>
                <span className="text-sm text-theme-muted">
                  {service.stats.label}
                </span>
              </div>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,51,153,0.35), transparent)'
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function Services() {
  return (
    <section className="relative overflow-hidden py-24 theme-section">
      {/* EU-inspired background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:20px_20px] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-eu-blue/5 to-transparent opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--chip-bg)] px-4 py-2 text-theme-secondary backdrop-blur-sm"
          >
            <Sparkles className="h-5 w-5 text-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-theme-primary">
              EU Digital Safety Initiative
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <Bot className="h-8 w-8 text-[var(--accent-primary)]" />
            <h2 className="text-4xl font-bold text-theme-primary">
              Our European Services
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-xl text-theme-secondary"
          >
            Empowering European youth with comprehensive digital safety education and certification
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
