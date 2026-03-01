import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Trophy, 
  Star, 
  Play, 
  Lock, 
  CheckCircle,
  Clock,
  Target,
  Zap,
  Gift,
  Users,
  Medal,
  Sparkles,
  Flag,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface StudentProfile {
  name: string;
  age: number;
  course: string;
  level: number;
  totalStars: number;
  streak: number;
  completedModules: number;
  totalModules: number;
  safetyScore: number;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  stars: number;
  status: 'completed' | 'current' | 'locked';
  progress: number;
  type: 'video' | 'interactive' | 'quiz' | 'game';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const STUDENT_PROFILE: StudentProfile = {
  name: 'Emma Thompson',
  age: 12,
  course: 'Digital Safety Fundamentals',
  level: 8,
  totalStars: 147,
  streak: 5,
  completedModules: 4,
  totalModules: 6,
  safetyScore: 9.2
};

const COURSE_MODULES: CourseModule[] = [
  {
    id: '1',
    title: 'Online Privacy Heroes',
    description: 'Learn to protect your personal information like a superhero!',
    difficulty: 'beginner',
    duration: '15 min',
    stars: 3,
    status: 'completed',
    progress: 100,
    type: 'interactive'
  },
  {
    id: '2',
    title: 'Password Power-Up',
    description: 'Create unbreakable passwords that keep your accounts safe.',
    difficulty: 'beginner',
    duration: '20 min',
    stars: 3,
    status: 'completed',
    progress: 100,
    type: 'game'
  },
  {
    id: '3',
    title: 'Social Media Safety Squad',
    description: 'Navigate social media safely and make smart choices.',
    difficulty: 'intermediate',
    duration: '25 min',
    stars: 3,
    status: 'completed',
    progress: 100,
    type: 'video'
  },
  {
    id: '4',
    title: 'Cyberbully Defenders',
    description: 'Stand up to cyberbullying and help create a safer internet.',
    difficulty: 'intermediate',
    duration: '30 min',
    stars: 2,
    status: 'current',
    progress: 65,
    type: 'interactive'
  },
  {
    id: '5',
    title: 'Digital Footprint Detective',
    description: 'Discover what trail you leave online and how to manage it.',
    difficulty: 'advanced',
    duration: '25 min',
    stars: 0,
    status: 'locked',
    progress: 0,
    type: 'quiz'
  },
  {
    id: '6',
    title: 'Safety Champion Challenge',
    description: 'Put all your skills to the test in the final challenge!',
    difficulty: 'advanced',
    duration: '35 min',
    stars: 0,
    status: 'locked',
    progress: 0,
    type: 'game'
  }
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first module',
    icon: Star,
    earned: true,
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Speed Learner',
    description: 'Complete 3 modules in one day',
    icon: Zap,
    earned: true,
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: Trophy,
    earned: true,
    rarity: 'epic'
  },
  {
    id: '4',
    title: 'Streak Master',
    description: 'Study for 7 days in a row',
    icon: Target,
    earned: false,
    progress: 5,
    maxProgress: 7,
    rarity: 'legendary'
  },
  {
    id: '5',
    title: 'Safety Expert',
    description: 'Complete all modules with 90%+ score',
    icon: Medal,
    earned: false,
    progress: 3,
    maxProgress: 6,
    rarity: 'legendary'
  }
];

export function StudentDashboard() {
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-600 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-600 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-600 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-600 border-yellow-300';
    }
  };

  const getDifficultyColor = (difficulty: CourseModule['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-600';
      case 'intermediate': return 'bg-yellow-100 text-yellow-600';
      case 'advanced': return 'bg-red-100 text-red-600';
    }
  };

  const getModuleIcon = (type: CourseModule['type']) => {
    switch (type) {
      case 'video': return Play;
      case 'interactive': return Sparkles;
      case 'quiz': return Target;
      case 'game': return Gift;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Avatar size="xl" variant="european">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-eu-blue to-eu-gold text-white">
                  {STUDENT_PROFILE.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-4xl font-bold text-eu-blue mb-2">
                  Welcome back, {STUDENT_PROFILE.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-600 mb-2">Ready to continue your digital safety adventure?</p>
                <div className="flex items-center gap-4">
                  <Badge variant="european" className="px-3 py-1">
                    Level {STUDENT_PROFILE.level}
                  </Badge>
                  <Badge variant="glass" className="px-3 py-1">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {STUDENT_PROFILE.totalStars} Stars
                  </Badge>
                  <Badge variant="success" className="px-3 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    {STUDENT_PROFILE.streak} Day Streak
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-eu-blue mb-1">
                {STUDENT_PROFILE.safetyScore}/10
              </div>
              <div className="text-sm text-gray-600">Safety Score</div>
              <div className="flex items-center justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(STUDENT_PROFILE.safetyScore / 2) 
                        ? 'text-eu-gold fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-eu-blue" />
                    {STUDENT_PROFILE.course}
                  </CardTitle>
                  <CardDescription>
                    {STUDENT_PROFILE.completedModules} of {STUDENT_PROFILE.totalModules} modules completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={(STUDENT_PROFILE.completedModules / STUDENT_PROFILE.totalModules) * 100}
                    variant="european"
                    showStars={true}
                    starCount={STUDENT_PROFILE.totalModules}
                    className="mb-6"
                  />
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-eu-blue mb-2">
                      {Math.round((STUDENT_PROFILE.completedModules / STUDENT_PROFILE.totalModules) * 100)}% Complete
                    </p>
                    <p className="text-gray-600">
                      You're doing amazing! Keep up the great work! 🌟
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Modules */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-eu-blue" />
                    Learning Modules
                  </CardTitle>
                  <CardDescription>
                    Complete modules to earn stars and unlock new challenges!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {COURSE_MODULES.map((module, index) => {
                      const Icon = getModuleIcon(module.type);
                      return (
                        <motion.div
                          key={module.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            module.status === 'completed'
                              ? 'bg-green-50 border-green-200 hover:border-green-300'
                              : module.status === 'current'
                              ? 'bg-eu-blue/5 border-eu-blue/30 hover:border-eu-blue/50 ring-2 ring-eu-blue/20'
                              : 'bg-gray-50 border-gray-200 opacity-75'
                          }`}
                          whileHover={module.status !== 'locked' ? { scale: 1.02 } : {}}
                          onClick={() => module.status !== 'locked' && setSelectedModule(module)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                module.status === 'completed'
                                  ? 'bg-green-500 text-white'
                                  : module.status === 'current'
                                  ? 'bg-eu-blue text-white'
                                  : 'bg-gray-300 text-gray-500'
                              }`}>
                                {module.status === 'completed' ? (
                                  <CheckCircle className="w-6 h-6" />
                                ) : module.status === 'locked' ? (
                                  <Lock className="w-6 h-6" />
                                ) : (
                                  <Icon className="w-6 h-6" />
                                )}
                              </div>
                              
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${getDifficultyColor(module.difficulty)}`}
                                  >
                                    {module.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {module.duration}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(3)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < module.stars 
                                        ? 'text-eu-gold fill-current' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              
                              {module.status !== 'locked' && (
                                <div className="w-20">
                                  <Progress value={module.progress} className="h-2" />
                                  <div className="text-xs text-gray-500 mt-1">{module.progress}%</div>
                                </div>
                              )}
                              
                              <Button
                                variant={
                                  module.status === 'completed' ? 'outline' :
                                  module.status === 'current' ? 'european' : 'outline'
                                }
                                size="sm"
                                className="mt-2"
                                disabled={module.status === 'locked'}
                              >
                                {module.status === 'completed' ? 'Review' :
                                 module.status === 'current' ? 'Continue' : 'Locked'}
                              </Button>
                            </div>
                          </div>
                          
                          {module.status === 'current' && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-6 h-6 bg-eu-gold rounded-full flex items-center justify-center"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Sparkles className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Achievements & Stats */}
          <div className="space-y-8">
            {/* Daily Goal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="european">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-eu-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Daily Goal</h3>
                  <p className="text-white/90 mb-4">15 minutes of learning</p>
                  <Progress value={80} variant="glass" className="mb-4" />
                  <p className="text-white/80 text-sm">12 minutes completed</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-eu-blue" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Unlock badges as you progress!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ACHIEVEMENTS.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            achievement.earned
                              ? getRarityColor(achievement.rarity)
                              : 'bg-gray-50 border-gray-200 opacity-75'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.earned
                                ? 'bg-current text-white opacity-90'
                                : 'bg-gray-300 text-gray-500'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.title}</h4>
                              <p className="text-xs opacity-75">{achievement.description}</p>
                              
                              {!achievement.earned && achievement.progress !== undefined && (
                                <div className="mt-2">
                                  <Progress 
                                    value={(achievement.progress / achievement.maxProgress!) * 100}
                                    className="h-1"
                                  />
                                  <p className="text-xs mt-1 opacity-75">
                                    {achievement.progress}/{achievement.maxProgress}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            {achievement.earned && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="glass">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-eu-blue mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Your Stats
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Study Time</span>
                      <span className="font-semibold text-eu-blue">4h 32m</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Quizzes Passed</span>
                      <span className="font-semibold text-eu-blue">8/10</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Best Streak</span>
                      <span className="font-semibold text-eu-blue">12 days</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Safety Level</span>
                      <Badge variant="success">Expert</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="premium">
                <CardContent className="p-6 text-center">
                  <Gift className="w-12 h-12 text-eu-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-eu-blue mb-2">Ready to Learn?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Continue your current module or start a new challenge!
                  </p>
                  <Button variant="european" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-eu-blue mb-2">{selectedModule.title}</h3>
              <p className="text-gray-600 mb-4">{selectedModule.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline">{selectedModule.difficulty}</Badge>
                <Badge variant="outline">{selectedModule.duration}</Badge>
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < selectedModule.stars 
                          ? 'text-eu-gold fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedModule(null)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="european" className="flex-1">
                  {selectedModule.status === 'completed' ? 'Review' : 'Start'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}