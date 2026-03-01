import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Brain, 
  Shield, 
  Users, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Heart,
  Lock,
  MessageSquare,
  Clock,
  Target
} from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';

const ChallengeCard = ({ title, description, stats, icon: Icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#003399]/10 to-[#FFD700]/10 rounded-xl blur-lg transition-all duration-500 group-hover:blur-xl" />
    
    <Card className="relative bg-white/95 backdrop-blur-sm border border-white/20 hover:border-[#003399]/20 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003399] to-[#002868] p-3 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#FFD700]" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-[#003399] mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-[#003399]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const SolutionCard = ({ title, points, icon: Icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="relative group"
  >
    <Card className="bg-gradient-to-br from-[#003399]/5 to-[#FFD700]/5 hover:from-[#003399]/10 hover:to-[#FFD700]/10 transition-all duration-300">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-[#003399]/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-[#003399]" />
        </div>
        
        <h3 className="text-lg font-semibold text-[#003399] mb-4">{title}</h3>
        
        <ul className="space-y-3">
          {points.map((point: string, i: number) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <Sparkles className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
              {point}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </motion.div>
);

export function Struggle() {
  const challenges = [
    {
      icon: Brain,
      title: "Children's Digital Adaptation",
      description: "Young minds navigating the complex intersection of AI, technology, and daily life.",
      stats: [
        { value: '6+ hrs', label: 'Daily Screen Time' },
        { value: '73%', label: 'Feel Overwhelmed' }
      ]
    },
    {
      icon: Shield,
      title: "Parents' Safety Concerns",
      description: "Balancing technological engagement with protection in an AI-driven world.",
      stats: [
        { value: '89%', label: 'Express Worry' },
        { value: '64%', label: 'Need Guidance' }
      ]
    },
    {
      icon: Users,
      title: "Societal Impact",
      description: "Adapting educational and social systems to prepare the next generation.",
      stats: [
        { value: '2025', label: 'AI Integration' },
        { value: '47%', label: 'Jobs Transformed' }
      ]
    }
  ];

  const solutions = [
    {
      icon: Lock,
      title: "Comprehensive Safety Framework",
      points: [
        "AI-powered content filtering and monitoring",
        "Real-time threat detection and prevention",
        "Age-appropriate digital boundaries",
        "Secure learning environment"
      ]
    },
    {
      icon: Heart,
      title: "Emotional Intelligence & Wellbeing",
      points: [
        "Balance between screen time and physical activities",
        "Social skills development in digital age",
        "Stress management techniques",
        "Building healthy tech habits"
      ]
    },
    {
      icon: Target,
      title: "Future-Ready Skills",
      points: [
        "Critical thinking in AI era",
        "Ethical technology usage",
        "Digital citizenship training",
        "Creative problem-solving"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#003399_1px,transparent_1px),linear-gradient(to_bottom,#003399_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.03]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#003399]/5 backdrop-blur-sm mb-4"
          >
            <Bot className="w-5 h-5 text-[#003399]" />
            <span className="text-sm font-medium text-[#003399]">
              The Digital Transition Challenge
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#003399] to-[#002868] mb-4"
          >
            Navigating the AI & Robotics Era
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Understanding and addressing the challenges faced by children, parents, and society
            in this transformative digital age
          </motion.p>
        </div>

        {/* Challenges Section */}
        <div className="space-y-6 mb-16">
          {challenges.map((challenge, index) => (
            <ChallengeCard key={index} {...challenge} index={index} />
          ))}
        </div>

        {/* Alert Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-[#003399] to-[#002868] text-white">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-[#FFD700]" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Why Action is Needed Now</h3>
                  <p className="text-blue-100">
                    By 2025, AI and robotics will be integral to everyday life. Without proper guidance
                    and support, the digital divide could widen, affecting children's development and
                    future opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <Button
            variant="primary"
            className="bg-gradient-to-r from-[#003399] to-[#002868] text-white group"
          >
            <span className="flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}