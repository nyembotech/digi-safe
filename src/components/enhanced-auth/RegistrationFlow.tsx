import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Users, User, Star, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { processFamilyRegistration, type StudentRegistrationData } from '../../lib/auth-utils';
import { useLanguage } from '../../context/LanguageContext';

interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const REGISTRATION_STEPS: RegistrationStep[] = [
  {
    id: 1,
    title: 'Course Selection',
    description: 'Choose the perfect digital safety course',
    icon: Star
  },
  {
    id: 2,
    title: 'Student Information',
    description: 'Tell us about your child',
    icon: User
  },
  {
    id: 3,
    title: 'Parent Details',
    description: 'Your contact information',
    icon: Users
  },
  {
    id: 4,
    title: 'Payment & Confirmation',
    description: 'Complete registration',
    icon: Shield
  }
];

const AVAILABLE_COURSES = [
  {
    id: 'digital-safety-fundamentals',
    name: 'Digital Safety Fundamentals',
    description: 'Essential online safety skills for children aged 8-12',
    price: '€49.99',
    duration: '4 weeks',
    ageRange: '8-12 years',
    features: ['Certified Program', 'Interactive Learning', 'Progress Tracking', 'Parent Dashboard']
  },
  {
    id: 'advanced-cyber-awareness',
    name: 'Advanced Cyber Awareness',
    description: 'Comprehensive cybersecurity education for teens',
    price: '€79.99',
    duration: '6 weeks',
    ageRange: '13-16 years',
    features: ['Advanced Topics', 'Real-world Scenarios', 'Certification', 'Career Guidance']
  },
  {
    id: 'family-digital-wellness',
    name: 'Family Digital Wellness',
    description: 'Complete family approach to digital safety',
    price: '€99.99',
    duration: '8 weeks',
    ageRange: 'All ages',
    features: ['Family Activities', 'Multiple Accounts', 'Expert Support', 'Lifetime Access']
  }
];

export function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<StudentRegistrationData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<any>(null);
  const { t } = useLanguage();

  const nextStep = () => {
    if (currentStep < REGISTRATION_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCourseSelect = (course: typeof AVAILABLE_COURSES[0]) => {
    setFormData({
      ...formData,
      courseId: course.id,
      courseName: course.name
    });
    nextStep();
  };

  const handleStudentInfo = (data: any) => {
    setFormData({
      ...formData,
      childName: data.childName,
      childAge: parseInt(data.childAge)
    });
    nextStep();
  };

  const handleParentInfo = (data: any) => {
    setFormData({
      ...formData,
      parentEmail: data.parentEmail,
      parentName: data.parentName
    });
    nextStep();
  };

  const handleRegistrationSubmit = async () => {
    setIsLoading(true);
    try {
      const credentials = await processFamilyRegistration(formData as StudentRegistrationData);
      setGeneratedCredentials(credentials);
      setRegistrationComplete(true);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationComplete) {
    return <RegistrationSuccess credentials={generatedCredentials} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eu-blue via-eu-blue-dark to-eu-blue bg-[length:400%_400%] animate-gradient-xy">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <Card variant="glass" className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">DigiSafe Registration</h1>
              <Badge variant="european">
                Step {currentStep} of {REGISTRATION_STEPS.length}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              {REGISTRATION_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-eu-gold bg-eu-gold text-eu-blue'
                          : isCompleted
                          ? 'border-green-400 bg-green-400 text-white'
                          : 'border-white/30 text-white/50'
                      }`}
                      whileScale={isActive ? 1.1 : 1}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </motion.div>
                    
                    {index < REGISTRATION_STEPS.length - 1 && (
                      <div
                        className={`h-0.5 w-16 mx-2 transition-all duration-300 ${
                          isCompleted ? 'bg-green-400' : 'bg-white/20'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && <CourseSelection onSelect={handleCourseSelect} />}
            {currentStep === 2 && <StudentInformation onSubmit={handleStudentInfo} onBack={prevStep} />}
            {currentStep === 3 && <ParentInformation onSubmit={handleParentInfo} onBack={prevStep} />}
            {currentStep === 4 && (
              <PaymentConfirmation 
                formData={formData} 
                onSubmit={handleRegistrationSubmit}
                onBack={prevStep}
                isLoading={isLoading}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CourseSelection({ onSelect }: { onSelect: (course: any) => void }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {AVAILABLE_COURSES.map((course) => (
        <Card key={course.id} variant="glass" className="hover:scale-105 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">{course.name}</CardTitle>
            <CardDescription className="text-white/80">{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-eu-gold">{course.price}</span>
                <Badge variant="glass">{course.ageRange}</Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-white/80">Duration: {course.duration}</p>
                <div className="flex flex-wrap gap-1">
                  {course.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => onSelect(course)}
                variant="european"
                className="w-full"
              >
                Select Course
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StudentInformation({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) {
  const [formData, setFormData] = useState({ childName: '', childAge: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card variant="glass" className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white">Student Information</CardTitle>
        <CardDescription className="text-white/80">
          Tell us about your child who will be taking the course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 mb-2">Child's Full Name</label>
            <Input
              type="text"
              value={formData.childName}
              onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              placeholder="Enter child's name"
              required
            />
          </div>
          
          <div>
            <label className="block text-white/90 mb-2">Child's Age</label>
            <Input
              type="number"
              min="6"
              max="18"
              value={formData.childAge}
              onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
              placeholder="Enter age"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onBack} variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button type="submit" variant="european" className="flex-1">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ParentInformation({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) {
  const [formData, setFormData] = useState({ parentName: '', parentEmail: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card variant="glass" className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white">Parent Information</CardTitle>
        <CardDescription className="text-white/80">
          Your contact details for account management and progress updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 mb-2">Parent/Guardian Name</label>
            <Input
              type="text"
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label className="block text-white/90 mb-2">Email Address</label>
            <Input
              type="email"
              value={formData.parentEmail}
              onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onBack} variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button type="submit" variant="european" className="flex-1">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function PaymentConfirmation({ 
  formData, 
  onSubmit, 
  onBack, 
  isLoading 
}: { 
  formData: any; 
  onSubmit: () => void; 
  onBack: () => void; 
  isLoading: boolean;
}) {
  const selectedCourse = AVAILABLE_COURSES.find(c => c.id === formData.courseId);

  return (
    <Card variant="glass" className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-white">Confirm Registration</CardTitle>
        <CardDescription className="text-white/80">
          Review your details and complete registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Course Details</h3>
            <p className="text-white/90">{selectedCourse?.name}</p>
            <p className="text-eu-gold font-bold text-xl">{selectedCourse?.price}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Student</h3>
            <p className="text-white/90">{formData.childName}, Age {formData.childAge}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Parent Contact</h3>
            <p className="text-white/90">{formData.parentName}</p>
            <p className="text-white/80">{formData.parentEmail}</p>
          </div>
          
          <div className="bg-eu-gold/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">What happens next?</h3>
            <ul className="text-white/90 space-y-1 text-sm">
              <li>• Auto-generated login credentials will be created</li>
              <li>• Welcome emails sent to both parent and student</li>
              <li>• Immediate access to course materials</li>
              <li>• 24/7 customer support available</li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={onBack} variant="outline" className="flex-1" disabled={isLoading}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={onSubmit} 
              variant="european" 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Complete Registration'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RegistrationSuccess({ credentials }: { credentials: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
      <Card variant="glass" className="max-w-2xl">
        <CardContent className="text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Registration Successful!</h1>
          <p className="text-white/80 mb-8">
            Welcome to DigiSafe! Auto-generated login credentials have been sent to your email.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Student Account</h3>
              <p className="text-white/90 text-sm">{credentials?.studentCredentials?.email}</p>
              <Badge variant="success" className="mt-2">Ready to Learn</Badge>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Parent Dashboard</h3>
              <p className="text-white/90 text-sm">{credentials?.parentCredentials?.email}</p>
              <Badge variant="success" className="mt-2">Monitor Progress</Badge>
            </div>
          </div>
          
          <Button variant="european" size="lg">
            Access Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}