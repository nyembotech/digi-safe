import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Shield, 
  TrendingUp, 
  Eye, 
  Mail, 
  Settings,
  Download,
  Bell,
  Search,
  Filter,
  Star,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SAMPLE_CREDENTIALS } from '../../lib/auth-utils';

interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
}

interface UserCredential {
  id: string;
  email: string;
  role: 'student' | 'parent';
  name: string;
  password: string;
  status: 'active' | 'pending' | 'suspended';
  lastLogin: string;
  courseName?: string;
  childName?: string;
}

const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    title: 'Total Students',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: Users
  },
  {
    title: 'Active Courses',
    value: '156',
    change: '+8%',
    trend: 'up',
    icon: BookOpen
  },
  {
    title: 'Completion Rate',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp
  },
  {
    title: 'Safety Score',
    value: '9.8/10',
    change: '+0.3',
    trend: 'up',
    icon: Shield
  }
];

const SAMPLE_USER_CREDENTIALS: UserCredential[] = [
  {
    id: '1',
    email: 'emma.thompson@digisafe.eu',
    role: 'student',
    name: 'Emma Thompson',
    password: 'Student2024!',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    courseName: 'Digital Safety Fundamentals'
  },
  {
    id: '2',
    email: 'sarah.thompson@email.com',
    role: 'parent',
    name: 'Sarah Thompson',
    password: 'Parent2024!',
    status: 'active',
    lastLogin: '2024-01-15 09:15',
    childName: 'Emma Thompson'
  },
  {
    id: '3',
    email: 'lucas.martin@digisafe.eu',
    role: 'student',
    name: 'Lucas Martin',
    password: 'SafeKid789!',
    status: 'active',
    lastLogin: '2024-01-14 16:45',
    courseName: 'Advanced Cyber Awareness'
  },
  {
    id: '4',
    email: 'marie.martin@email.com',
    role: 'parent',
    name: 'Marie Martin',
    password: 'ParentSafe456!',
    status: 'pending',
    lastLogin: 'Never',
    childName: 'Lucas Martin'
  }
];

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'student' | 'parent'>('all');
  const [showPasswords, setShowPasswords] = useState(false);

  const filteredCredentials = SAMPLE_USER_CREDENTIALS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-eu-blue mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage DigiSafe European Digital Safety Platform</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="european" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                EU Compliant
              </Badge>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="european">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {DASHBOARD_METRICS.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="premium" className="hover:shadow-eu-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-eu-blue/10 rounded-xl">
                        <Icon className="w-6 h-6 text-eu-blue" />
                      </div>
                      <Badge 
                        variant={metric.trend === 'up' ? 'success' : 'secondary'}
                        className="text-xs"
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-eu-blue mb-1">{metric.value}</h3>
                    <p className="text-gray-600 text-sm">{metric.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* User Credentials Management */}
        <Card variant="premium" className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-eu-blue" />
                  User Credentials Management
                </CardTitle>
                <CardDescription>
                  View and manage auto-generated student and parent login credentials
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant={showPasswords ? 'secondary' : 'outline'}
                  onClick={() => setShowPasswords(!showPasswords)}
                  size="sm"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {showPasswords ? 'Hide' : 'Show'} Passwords
                </Button>
                
                <Button variant="european" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Credentials
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Search and Filter */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                {['all', 'student', 'parent'].map((role) => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? 'european' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole(role as any)}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                    {role !== 'all' && (
                      <Badge variant="secondary" className="ml-2">
                        {SAMPLE_USER_CREDENTIALS.filter(u => u.role === role).length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Credentials Table */}
            <div className="space-y-4">
              {filteredCredentials.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-eu-card hover:shadow-eu-hover transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar variant="european">
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-eu-blue">{user.name}</h4>
                          <Badge 
                            variant={user.role === 'student' ? 'european' : 'secondary'}
                            className="text-xs"
                          >
                            {user.role}
                          </Badge>
                          <Badge 
                            variant={user.status === 'active' ? 'success' : 'warning'}
                            className="text-xs"
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                        {user.courseName && (
                          <p className="text-eu-blue text-xs">Course: {user.courseName}</p>
                        )}
                        {user.childName && (
                          <p className="text-eu-blue text-xs">Child: {user.childName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Password</p>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                          {showPasswords ? user.password : '••••••••••'}
                        </code>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Last Login</p>
                        <p className="text-xs text-gray-500">{user.lastLogin}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-eu-blue mx-auto mb-4" />
              <h3 className="font-semibold text-eu-blue mb-2">User Management</h3>
              <p className="text-gray-600 text-sm mb-4">Manage all platform users and permissions</p>
              <Button variant="european" className="w-full">
                Manage Users
              </Button>
            </CardContent>
          </Card>
          
          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-eu-blue mx-auto mb-4" />
              <h3 className="font-semibold text-eu-blue mb-2">Course Content</h3>
              <p className="text-gray-600 text-sm mb-4">Create and edit educational materials</p>
              <Button variant="european" className="w-full">
                Edit Courses
              </Button>
            </CardContent>
          </Card>
          
          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-eu-blue mx-auto mb-4" />
              <h3 className="font-semibold text-eu-blue mb-2">Compliance</h3>
              <p className="text-gray-600 text-sm mb-4">Monitor GDPR and DSA compliance</p>
              <Button variant="european" className="w-full">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sample Login Information */}
        <Card variant="premium" className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-eu-gold" />
              Sample Login Credentials
            </CardTitle>
            <CardDescription>
              Use these credentials to test different user roles and dashboards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-eu-blue/5 rounded-lg p-4">
                <h4 className="font-semibold text-eu-blue mb-2">Admin Access</h4>
                <p className="text-sm text-gray-600 mb-2">Full platform administration</p>
                <code className="block text-xs bg-white p-2 rounded mb-1">
                  {SAMPLE_CREDENTIALS.admin.email}
                </code>
                <code className="block text-xs bg-white p-2 rounded">
                  {SAMPLE_CREDENTIALS.admin.password}
                </code>
              </div>
              
              <div className="bg-eu-gold/5 rounded-lg p-4">
                <h4 className="font-semibold text-eu-blue mb-2">Parent Access</h4>
                <p className="text-sm text-gray-600 mb-2">Monitor child progress</p>
                <code className="block text-xs bg-white p-2 rounded mb-1">
                  {SAMPLE_CREDENTIALS.parent.email}
                </code>
                <code className="block text-xs bg-white p-2 rounded">
                  {SAMPLE_CREDENTIALS.parent.password}
                </code>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-eu-blue mb-2">Student Access</h4>
                <p className="text-sm text-gray-600 mb-2">Course learning interface</p>
                <code className="block text-xs bg-white p-2 rounded mb-1">
                  {SAMPLE_CREDENTIALS.student.email}
                </code>
                <code className="block text-xs bg-white p-2 rounded">
                  {SAMPLE_CREDENTIALS.student.password}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}