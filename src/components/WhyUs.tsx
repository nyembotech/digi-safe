import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Shield, Laptop, Brain } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const WhyUsCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="group"
  >
    <Card variant="glass" className="overflow-hidden border-none shadow-eu-card transition-all duration-500 group-hover:-translate-y-2">
      <div className="relative h-48">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003399]/80 to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-lg bg-white/20 p-2 backdrop-blur-sm">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <CardContent className="space-y-2">
        <h3 className="text-xl font-semibold text-theme-primary">{title}</h3>
        <p className="text-theme-secondary">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "Expert Guidance",
      description: "Industry-leading experts providing comprehensive digital safety education.",
    },
    {
      icon: Laptop,
      title: "Proven Methods",
      description: "Research-backed curriculum designed for maximum learning effectiveness.",
    },
    {
      icon: Brain,
      title: "Community Focus",
      description: "Building a safer digital environment through collaborative learning.",
    },
  ];

  return (
    <section className="py-24 theme-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Bot className="h-8 w-8 text-[var(--accent-primary)]" />
            <h2 className="bg-gradient-to-r from-eu-blue to-eu-blue-light bg-clip-text text-4xl font-bold text-transparent">
              Why Choose Us
            </h2>
          </div>
          <p className="mx-auto max-w-3xl text-xl text-theme-secondary">
            Leading the way in digital safety education with proven expertise
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <WhyUsCard key={index} {...feature} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
}
