import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Download,
  Settings,
  Sun,
  Moon,
  QrCode,
  Users,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from './Button';

const events = [
  {
    id: 'XR-38',
    model: 'DigiSafe Pro X9',
    dimensions: {
      height: '8 hours',
      capacity: '25 students'
    },
    design: {
      philosophy: 'Interactive learning',
      approach: 'Hands-on practice'
    },
    colorScheme: 'EU Standard',
    illumination: 'Expert-guided sessions',
    appearance: 'Customizable curriculum',
    price: 299,
    originalPrice: 350,
    image: "https://replicate.delivery/pbxt/IJPpXNGGuIGqZe1w8Rlj6FYt5YVDPLz9jP5SykscVcUw77VIA/out-0.png",
    progress: 54,
    features: [
      "Digital Safety Certification",
      "AI Ethics Training",
      "Parent Dashboard Access",
      "Real-time Progress Tracking"
    ]
  }
];

export function EventDetails() {
  const [activeEvent, setActiveEvent] = React.useState(events[0]);
  const [lightingMode, setLightingMode] = React.useState<'day' | 'night'>('day');

  return (
    <section className="py-24 bg-[#001B44] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #FFD700 1px, transparent 1px), linear-gradient(to bottom, #FFD700 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* QR Code and Model */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <QrCode className="w-12 h-12 text-[#FFD700]" />
                <div>
                  <div className="text-sm text-gray-400">Model:</div>
                  <div className="text-xl font-bold">{activeEvent.model}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[#FFD700]">***</div>
                <Users className="w-6 h-6" />
                <button className="text-sm underline">view all</button>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <div className="text-lg font-semibold mb-2">Dimensions</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Duration:</div>
                  <div>{activeEvent.dimensions.height}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Class Size:</div>
                  <div>{activeEvent.dimensions.capacity}</div>
                </div>
              </div>
            </div>

            {/* Design Philosophy */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-sm text-gray-400">Learning Approach</div>
                <div className="text-sm mt-1">{activeEvent.design.philosophy}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Teaching Method</div>
                <div className="text-sm mt-1">{activeEvent.design.approach}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Certification</div>
                <div className="text-sm mt-1">{activeEvent.colorScheme}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Format</div>
                <div className="text-sm mt-1">{activeEvent.illumination}</div>
              </div>
            </div>

            {/* Buy Button and Price */}
            <div className="flex items-center justify-between">
              <Button 
                variant="primary"
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900"
              >
                /// Enroll Now ///
              </Button>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">€{activeEvent.price}</span>
                <span className="text-gray-400 line-through">€{activeEvent.originalPrice}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Main Image Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <div className="w-5 h-5 rounded-full bg-[#FFD700]" />
                </div>
                <Button
                  variant="outlined"
                  className="flex items-center gap-2 text-sm border border-gray-600 px-4 py-2 rounded-full"
                >
                  <Download className="w-4 h-4" />
                  GET IN APP
                </Button>
              </div>

              <img
                src={activeEvent.image}
                alt={activeEvent.model}
                className="w-full rounded-xl mb-6"
              />

              {/* Progress Control */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    <ArrowLeft className="w-4 h-4" />
                    PROGRESS
                    <ArrowRight className="w-4 h-4" />
                    <Sun className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold">{activeEvent.progress}%</div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
                    initial={{ width: 0 }}
                    animate={{ width: `${activeEvent.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {activeEvent.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}