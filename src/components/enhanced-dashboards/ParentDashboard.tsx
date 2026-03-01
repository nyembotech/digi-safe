import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Clock, 
  Shield, 
  Trophy, 
  Bell, 
  Settings,
  Eye,
  Calendar,
  BookOpen,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  course: string;
  progress: number;
  lastActivity: string;
  safetyScore: number;
  certificates: number;
  weeklyGoal: number;
  status: 'active' | 'away' | 'studying';
}

interface SafetyAlert {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  description: string;
  timestamp: string;
  action?: string;
}

interface WeeklyActivity {
  day: string;
  minutes: number;
  completed: boolean;
}

const SAMPLE_CHILD: ChildProfile = {
  id: '1',
  name: 'Emma Thompson',
  age: 12,
  course: 'Digital Safety Fundamentals',
  progress: 78,
  lastActivity: '2 hours ago',
  safetyScore: 9.2,
  certificates: 3,
  weeklyGoal: 120,
  status: 'studying'
};

const SAFETY_ALERTS: SafetyAlert[] = [
  {
    id: '1',
    type: 'success',
    title: 'Module Completed!',
    description: 'Emma completed the "Password Security" module with 95% score.',
    timestamp: '2 hours ago',
    action: 'View Certificate'
  },
  {
    id: '2',
    type: 'info',
    title: 'Weekly Progress Update',
    description: 'Emma is 78% towards her weekly learning goal.',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Safety Reminder',
    description: 'Remind Emma to use strong passwords on all her accounts.',
    timestamp: '2 days ago',
    action: 'Send Reminder'
  }
];

const WEEKLY_ACTIVITY: WeeklyActivity[] = [
  { day: 'Mon', minutes: 25, completed: true },
  { day: 'Tue', minutes: 30, completed: true },
  { day: 'Wed', minutes: 20, completed: true },
  { day: 'Thu', minutes: 35, completed: true },
  { day: 'Fri', minutes: 15, completed: false },
  { day: 'Sat', minutes: 0, completed: false },
  { day: 'Sun', minutes: 0, completed: false }
];

export function ParentDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');
  
  const totalWeeklyMinutes = WEEKLY_ACTIVITY.reduce((sum, day) => sum + day.minutes, 0);
  const weeklyProgress = (totalWeeklyMinutes / SAMPLE_CHILD.weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-eu-blue mb-2">Family Dashboard</h1>
              <p className="text-gray-600">Monitor your child's digital safety learning journey</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="european" className="px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Parent Portal
              </Badge>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="european">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Child Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="premium" className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Avatar size="xl" variant="european">
                    <AvatarFallback className="text-2xl">
                      {SAMPLE_CHILD.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-eu-blue">{SAMPLE_CHILD.name}</h2>
                      <Badge 
                        variant={SAMPLE_CHILD.status === 'studying' ? 'success' : 'secondary'}
                        className="capitalize"
                      >
                        {SAMPLE_CHILD.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-1">Age {SAMPLE_CHILD.age} • {SAMPLE_CHILD.course}</p>
                    <p className="text-sm text-gray-500">Last activity: {SAMPLE_CHILD.lastActivity}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-eu-blue">{SAMPLE_CHILD.progress}%</div>
                    <div className="text-sm text-gray-600">Course Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{SAMPLE_CHILD.safetyScore}/10</div>
                    <div className="text-sm text-gray-600">Safety Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-eu-gold">{SAMPLE_CHILD.certificates}</div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-eu-blue" />
                    Weekly Learning Progress
                  </CardTitle>
                  <CardDescription>
                    {totalWeeklyMinutes} minutes completed this week • Goal: {SAMPLE_CHILD.weeklyGoal} minutes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Progress 
                      value={weeklyProgress} 
                      variant="european" 
                      showStars={true}
                      starCount={7}
                    />
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {WEEKLY_ACTIVITY.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className={`text-center p-3 rounded-lg transition-all duration-300 ${
                          day.completed 
                            ? 'bg-eu-blue/10 border-2 border-eu-blue/20' 
                            : 'bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-600 mb-1">{day.day}</div>
                        <div className={`text-lg font-bold ${
                          day.completed ? 'text-eu-blue' : 'text-gray-400'
                        }`}>
                          {day.minutes}m
                        </div>
                        {day.completed && (
                          <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-eu-blue" />
                    Course Modules
                  </CardTitle>
                  <CardDescription>
                    Track progress through Digital Safety Fundamentals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Online Privacy Basics', progress: 100, status: 'completed', score: 95 },
                      { name: 'Password Security', progress: 100, status: 'completed', score: 87 },
                      { name: 'Safe Social Media', progress: 100, status: 'completed', score: 92 },
                      { name: 'Cyberbullying Prevention', progress: 65, status: 'in-progress', score: null },
                      { name: 'Digital Footprint', progress: 0, status: 'locked', score: null },
                      { name: 'Final Assessment', progress: 0, status: 'locked', score: null }
                    ].map((module, index) => (
                      <motion.div
                        key={module.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            module.status === 'completed' 
                              ? 'bg-green-100 text-green-600'
                              : module.status === 'in-progress'
                              ? 'bg-eu-blue/10 text-eu-blue'
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {module.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : module.status === 'in-progress' ? (
                              <Clock className="w-5 h-5" />
                            ) : (
                              <BookOpen className="w-5 h-5" />
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900">{module.name}</h4>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={module.progress} 
                                variant="european"
                                className="w-24"
                              />
                              <span className="text-sm text-gray-500">{module.progress}%</span>
                              {module.score && (
                                <Badge variant="success" className="ml-2">
                                  {module.score}% score
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant={module.status === 'locked' ? 'outline' : 'european'} 
                          size="sm"
                          disabled={module.status === 'locked'}
                        >
                          {module.status === 'completed' ? 'Review' : 
                           module.status === 'in-progress' ? 'Continue' : 'Locked'}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Alerts & Quick Actions */}
          <div className="space-y-8">
            {/* Safety Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-eu-blue" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Stay updated on Emma's learning progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {SAFETY_ALERTS.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.type === 'success' 
                            ? 'bg-green-50 border-green-400'
                            : alert.type === 'warning'
                            ? 'bg-yellow-50 border-yellow-400'
                            : 'bg-blue-50 border-blue-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {alert.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          ) : alert.type === 'warning' ? (
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                          )}
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{alert.timestamp}</span>
                              {alert.action && (
                                <Button variant="outline" size="sm">
                                  {alert.action}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-eu-blue" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="european" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      View Detailed Report
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Learning Time
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Trophy className="w-4 h-4 mr-2" />
                      View Certificates
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Safety Score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card variant="european">
                <CardContent className="p-6 text-center">
                  <Shield className="w-16 h-16 text-eu-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {SAMPLE_CHILD.safetyScore}/10
                  </h3>
                  <p className="text-white/90 mb-4">Digital Safety Score</p>
                  <Progress 
                    value={SAMPLE_CHILD.safetyScore * 10} 
                    variant="glass"
                    className="mb-4"
                  />
                  <Badge variant="glass">
                    <Star className="w-3 h-3 mr-1" />
                    Excellent
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}