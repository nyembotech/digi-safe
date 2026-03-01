import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Key, Globe, CreditCard, Bot, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../Card';

export function InstallationGuide() {
  const steps = [
    {
      icon: Terminal,
      title: 'Initial Setup',
      content: `
        1. Clone repository: git clone https://github.com/your-username/digisafe-europe.git
        2. Install dependencies: npm install
        3. Create .env file with required environment variables
      `
    },
    {
      icon: Database,
      title: 'Firebase Setup',
      content: `
        1. Create Firebase project
        2. Enable Authentication (Email/Password)
        3. Create Firestore database
        4. Set up Storage
        5. Update security rules
        6. Enable Firebase Hosting
      `
    },
    {
      icon: Key,
      title: 'Environment Configuration',
      content: `
        Add the following to .env:
        - VITE_FIREBASE_API_KEY
        - VITE_FIREBASE_AUTH_DOMAIN
        - VITE_FIREBASE_PROJECT_ID
        - VITE_FIREBASE_STORAGE_BUCKET
        - VITE_FIREBASE_MESSAGING_SENDER_ID
        - VITE_FIREBASE_APP_ID
      `
    },
    {
      icon: Globe,
      title: 'Google Services',
      content: `
        1. Enable Google Maps API
        2. Create API key with restrictions
        3. Add key to .env file
        4. Configure allowed domains
      `
    },
    {
      icon: CreditCard,
      title: 'Payment Integration',
      content: `
        1. Set up Stripe account
        2. Configure PayPal business account
        3. Add payment keys to .env:
        - VITE_STRIPE_PUBLIC_KEY
        - VITE_PAYPAL_CLIENT_ID
      `
    }
  ];

  const deploymentSteps = [
    'Run build command: npm run build',
    'Initialize Firebase: firebase init',
    'Deploy to Firebase: firebase deploy',
    'Configure custom domain (optional)',
    'Set up SSL certificates',
    'Configure Firebase security rules'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Installation Guide</h1>
        <p className="text-gray-600">
          Follow these steps to set up your DigiSafe Europe platform
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <step.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <pre className="whitespace-pre-wrap text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                      {step.content}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: steps.length * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Globe className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Deployment Steps</h3>
                  <div className="space-y-2">
                    {deploymentSteps.map((step, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Important Notes</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Always keep your API keys and sensitive data secure</li>
            <li>Regularly update dependencies for security patches</li>
            <li>Set up proper backup systems for your data</li>
            <li>Configure proper CORS and security headers</li>
            <li>Implement rate limiting for API endpoints</li>
            <li>Set up monitoring and error tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}