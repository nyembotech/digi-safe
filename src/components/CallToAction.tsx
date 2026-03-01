import React from 'react';
import { Bot, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './Button';

export function CallToAction() {
  const benefits = [
    "Access to all courses and workshops",
    "Live interactive sessions",
    "Personal progress tracking",
    "Certificate of completion",
    "24/7 support access"
  ];

  return (
    <section className="py-24 bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="w-8 h-8 text-white" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Start Your Journey Today
            </h2>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of families who trust SafeSpark to prepare their children for the digital future
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-blue-200" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex gap-4">
              <Button variant="secondary" className="group">
                <span className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80"
              alt="Children learning digital skills"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
              <p className="text-3xl font-bold text-blue-500">2,500+</p>
              <p className="text-gray-600">Students Enrolled</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}