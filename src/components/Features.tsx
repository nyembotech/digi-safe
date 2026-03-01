import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Trophy, 
  Brain, 
  Clock, 
  Video,
  Bot, 
  Sparkles,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Lock,
  ShieldCheck,
  Eye,
  MessageSquare
} from 'lucide-react';

const DeviceFeatureCard = ({ icon: Icon, title, description, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.03, y: -8 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-eu-blue/5 to-eu-gold/5 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />

    <div className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-eu-blue/20">
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        className="w-14 h-14 rounded-xl bg-gradient-to-br from-eu-blue to-eu-blue-dark p-3 mb-6 shadow-sm"
      >
        <Icon className="w-full h-full text-white" />
      </motion.div>

      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>

      <motion.div
        className="absolute top-2 right-2 text-eu-gold/20"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
    </div>
  </motion.div>
);

export function Features() {
  const deviceFeatures = [
    {
      icon: Smartphone,
      title: "Smartphone Safety",
      description: "Comprehensive protection for mobile devices with age-appropriate content filtering and usage monitoring."
    },
    {
      icon: Tablet,
      title: "Tablet Security",
      description: "Safe browsing environment and educational app management for tablet devices."
    },
    {
      icon: Laptop,
      title: "Laptop Protection",
      description: "Advanced security measures for laptops including safe browsing and privacy protection."
    },
    {
      icon: Monitor,
      title: "Desktop Safety",
      description: "Complete digital safety solution for desktop computers with parental controls."
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Access Control",
      description: "Smart device access management with time limits and content restrictions."
    },
    {
      icon: ShieldCheck,
      title: "Real-time Protection",
      description: "Continuous monitoring and threat protection across all devices."
    },
    {
      icon: Eye,
      title: "Activity Monitoring",
      description: "Age-appropriate activity tracking and usage reports for parents."
    },
    {
      icon: MessageSquare,
      title: "Safe Communication",
      description: "Monitored messaging and social media safety features."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Bot className="w-8 h-8 text-primary-600" />
            <h2 className="text-4xl font-bold text-gray-900">
              Complete Device Protection
            </h2>
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Comprehensive digital safety across all devices, ensuring a secure online experience for children
          </motion.p>
        </motion.div>

        {/* Device Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {deviceFeatures.map((feature, index) => (
            <DeviceFeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <DeviceFeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>
    </section>
  );
}