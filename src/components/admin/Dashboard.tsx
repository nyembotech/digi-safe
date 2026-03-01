import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Bot, TrendingUp, Users, Trophy, Brain, Clock, Video, Search, Bell, Settings, FileText, Shield, Layout, ChevronDown, BookOpen, Globe, ArrowUpRight, ArrowDownRight, MoreHorizontal, CreditCard, UserPlus, GraduationCap as Graduation, ListChecks, MessageSquare, BarChart3, CalendarDays } from 'lucide-react';
import { Card, CardContent } from '../Card';
import { Separator } from '../Separator';
import { CourseManagement } from './CourseManagement';
import { BlogManagement } from './BlogManagement';
import { ContentEditor } from './ContentEditor';
import { PaymentSettings } from './PaymentSettings';
import { PDFSettings } from './PdfSettings';
import { FAQManagement } from './FaqManagement';
import { BookingManagement } from './BookingManagement';
import { UserManagement } from './UserManagement';
import { useAuth } from '../../context/AuthContext';

const stats = [
  {
    title: 'Total Revenue',
    value: '€521,234',
    change: '+12.5%',
    trend: 'up',
    description: 'Revenue All Country'
  },
  {
    title: 'Active Students',
    value: '2,345',
    change: '+27.7%',
    trend: 'up',
    description: 'New Enrollments'
  },
  {
    title: 'Course Completion',
    value: '89.4%',
    change: '-3.2%',
    trend: 'down',
    description: 'Average Rate'
  },
  {
    title: 'Global Reach',
    value: '27',
    change: '+5',
    trend: 'up',
    description: 'Countries Active'
  }
];

const countryData = [
  { country: 'Germany', flag: '🇩🇪', visitors: '500,000', orders: '1,500', rate: '1.23%' },
  { country: 'France', flag: '🇫🇷', visitors: '400,000', orders: '2,400', rate: '1.86%' },
  { country: 'Italy', flag: '🇮🇹', visitors: '300,000', orders: '4,200', rate: '2.26%' },
  { country: 'Spain', flag: '🇪🇸', visitors: '700,000', orders: '6,500', rate: '5.26%' },
  { country: 'Netherlands', flag: '🇳🇱', visitors: '300,000', orders: '2,100', rate: '1.26%' }
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Revenue',
      data: [30000, 45000, 42000, 50000, 48000, 55000, 52000],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Students',
      data: [1200, 1400, 1350, 1600, 1550, 1800, 1750],
      borderColor: '#EC4899',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

export function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const sidebarItems = [
    { id: 'overview', icon: TrendingUp, label: 'Overview' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'bookings', icon: CalendarDays, label: 'Bookings' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'students', icon: Graduation, label: 'Students' },
    { id: 'registrations', icon: ListChecks, label: 'Registrations' },
    { id: 'blog', icon: FileText, label: 'Blog Posts' },
    { id: 'content', icon: Layout, label: 'Content' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'payment', icon: CreditCard, label: 'Payment' },
    { id: 'faqs', icon: FileText, label: 'FAQs' },
    { id: 'pdf-settings', icon: FileText, label: 'PDF Settings' },
    { id: 'security', icon: Shield, label: 'Security' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">{stat.title}</span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-end gap-3 mb-2">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <div className={`flex items-center gap-1 text-sm ${
                          stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stat.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {stat.change}
                        </div>
                      </div>
                      
                      <span className="text-sm text-gray-500">{stat.description}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts and Tables */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Performance Chart */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Performance Overview</h2>
                      <select className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                      </select>
                    </div>
                    
                    <Line 
                      ref={(element) => {
                        if (element) {
                          chartRef.current = element;
                        }
                      }}
                      data={chartData} 
                      options={chartOptions} 
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Country Performance */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Country Performance</h2>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {countryData.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{item.flag}</span>
                              <span className="font-medium">{item.country}</span>
                            </div>
                            <span className="text-sm font-medium">{item.rate}</span>
                          </div>
                          
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: item.rate }}
                            />
                          </div>
                          
                          {index < countryData.length - 1 && (
                            <Separator className="my-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'courses':
        return <CourseManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'users':
      case 'students':
        return <UserManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'content':
        return (
          <ContentEditor
            content={selectedPage}
            onSave={() => {
              // Handle content save
            }}
          />
        );
      case 'payment':
        return <PaymentSettings />;
      case 'faqs':
        return <FAQManagement />;
      case 'pdf-settings':
        return <PDFSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Bot className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">{user?.email}</span>
                  <span className="text-gray-400">|</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    Administrator
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
