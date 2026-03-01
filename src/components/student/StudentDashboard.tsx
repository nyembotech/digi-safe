import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Bot,
  Sun,
  Moon,
  Heart,
  Activity,
  Clock,
  Music,
  Map,
  Bell,
  X,
  Check,
  ArrowLeft,
  Settings,
  BookOpen,
  Brain,
  Star,
  Gamepad,
  Award,
  Shield,
  Sparkles,
  Users,
  Trophy
} from 'lucide-react';
import { EuropeanFAB, EuropeanProgress, EuropeanCertificate } from '../EuropeanFab';
import { useAuth } from '../../context/AuthContext';

// Task board data
const initialColumns = {
  todo: {
    title: 'To Do',
    items: [
      {
        id: 't1',
        title: 'Complete Privacy Quiz',
        course: 'Digital Safety',
        dueDate: 'Tomorrow'
      },
      {
        id: 't2',
        title: 'AI Ethics Worksheet',
        course: 'AI for Kids',
        dueDate: 'Next Week'
      }
    ]
  },
  inProgress: {
    title: 'In Progress',
    items: [
      {
        id: 'p1',
        title: 'Online Safety Project',
        course: 'Digital Safety',
        dueDate: 'Friday'
      }
    ]
  },
  blocked: {
    title: 'Blocked',
    items: [
      {
        id: 'b1',
        title: 'Machine Learning Exercise',
        course: 'AI for Kids',
        dueDate: 'Pending Help'
      }
    ]
  },
  done: {
    title: 'Done',
    items: [
      {
        id: 'd1',
        title: 'Password Security Task',
        course: 'Digital Safety',
        dueDate: 'Completed'
      }
    ]
  }
};

// Activity data
const activities = [
  {
    id: 'steps',
    title: 'Steps',
    value: '1,784',
    icon: Activity,
    color: 'bg-blue-100 text-blue-500'
  },
  {
    id: 'sleep',
    title: 'Study Time',
    value: '7h 26min',
    icon: Moon,
    color: 'bg-indigo-100 text-indigo-500'
  },
  {
    id: 'focus',
    title: 'Focus Score',
    value: '82%',
    icon: Brain,
    color: 'bg-purple-100 text-purple-500'
  }
];

// Reminders data
const reminders = [
  {
    id: 'r1',
    title: 'Complete Quiz',
    icon: BookOpen,
    action: true
  },
  {
    id: 'r2',
    title: 'Take a Break',
    icon: Gamepad,
    action: true
  }
];

const Card = ({ 
  children, 
  className = '', 
  variant = 'default' 
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'default' | 'glass' | 'premium';
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotateX: -10 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    whileHover={{ 
      y: -4, 
      rotateX: 2, 
      rotateY: 2,
      transition: { duration: 0.3 }
    }}
    className={`
      ${variant === 'glass' 
        ? 'glass-eu-card' 
        : variant === 'premium'
        ? 'bg-gradient-to-br from-white to-eu-blue-50 border-2 border-eu-yellow-600/20'
        : 'bg-white/90 backdrop-blur-sm'
      }
      rounded-3xl p-6 shadow-eu-card hover:shadow-eu-hover 
      transition-all duration-500 card-3d relative overflow-hidden
      ${className}
    `}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* EU Stars decoration for premium cards */}
    {variant === 'premium' && (
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6 text-eu-yellow-600/40 eu-star" />
        </motion.div>
      </div>
    )}
    
    {/* Glassmorphism shimmer for glass variant */}
    {variant === 'glass' && (
      <div className="absolute inset-0 glass-shimmer opacity-30" />
    )}
    
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

export function StudentDashboard() {
  const { user } = useAuth();
  const [columns, setColumns] = useState(initialColumns);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(columns[source.droppableId].items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items
        }
      });
    } else {
      const sourceItems = Array.from(columns[source.droppableId].items);
      const destItems = Array.from(columns[destination.droppableId].items);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: sourceItems
        },
        [destination.droppableId]: {
          ...columns[destination.droppableId],
          items: destItems
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eu-blue-50 via-eu-yellow-50 to-eu-blue-100 p-8 relative overflow-hidden">
      {/* European Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* EU Stars Background Pattern */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`
            }}
          >
            <Star className="w-8 h-8 text-eu-yellow-600/20 eu-star" />
          </motion.div>
        ))}
        
        {/* Floating EU symbols */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-eu-blue-700/10 to-eu-yellow-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-gradient-to-br from-eu-yellow-600/10 to-eu-blue-700/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Header with European Badge */}
      <motion.div 
        className="relative z-10 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <EuropeanCertificate isVerified={true} />
          <motion.div
            className="text-4xl font-bold text-eu-gradient"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255, 215, 0, 0.3)",
                "0 0 40px rgba(255, 215, 0, 0.6)",
                "0 0 20px rgba(255, 215, 0, 0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Welcome, {user?.firstName}!
          </motion.div>
        </div>
        <p className="text-eu-blue-700 text-lg">Your European Digital Safety Journey</p>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* European Clock Card */}
        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ x: -5 }}
              className="text-eu-blue-700 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
            <h2 className="text-lg font-semibold text-eu-blue-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-eu-yellow-600" />
              European Time
            </h2>
            <div className="w-6" />
          </div>
          <div className="flex flex-col items-center">
            <motion.div 
              className="text-5xl font-bold mb-2 text-eu-gradient"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(255, 215, 0, 0.2)",
                  "0 0 20px rgba(255, 215, 0, 0.4)",
                  "0 0 10px rgba(255, 215, 0, 0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </motion.div>
            <div className="text-eu-blue-700 font-medium">{currentDay}</div>
            <motion.div 
              className="mt-4 flex items-center gap-2 bg-eu-yellow-600/20 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sun className="w-6 h-6 text-eu-yellow-600" />
              </motion.div>
              <span className="text-eu-blue-800 font-medium">European Sunny</span>
            </motion.div>
          </div>
        </Card>

        {/* European Activities Card */}
        <Card variant="premium">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ x: -5 }}
              className="text-eu-blue-700 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
            <h2 className="text-lg font-semibold text-eu-blue-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-eu-yellow-600" />
              EU Progress
            </h2>
            <div className="w-6" />
          </div>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.id} 
                className="glass-eu p-4 rounded-2xl border border-eu-blue-700/20 relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    className="p-2 rounded-full bg-gradient-to-br from-eu-blue-700 to-eu-blue-800"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <activity.icon className="w-5 h-5 text-eu-yellow-600" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-sm text-eu-blue-700 font-medium">{activity.title}</div>
                    <motion.div 
                      className="text-xl font-bold text-eu-gradient"
                      animate={{ 
                        textShadow: [
                          "0 0 5px rgba(255, 215, 0, 0.2)",
                          "0 0 15px rgba(255, 215, 0, 0.4)",
                          "0 0 5px rgba(255, 215, 0, 0.2)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {activity.value}
                    </motion.div>
                  </div>
                  <Star className="w-4 h-4 text-eu-yellow-600 eu-star" />
                </div>
                {/* Progress indicator */}
                <EuropeanProgress 
                  progress={75 + index * 5} 
                  className="mt-3"
                />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* European Profile Card */}
        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ x: -5 }}
              className="text-eu-blue-700 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
            <h2 className="text-lg font-semibold text-eu-blue-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-eu-yellow-600" />
              EU Profile
            </h2>
            <motion.div
              whileHover={{ rotate: 15 }}
              className="text-eu-blue-700 cursor-pointer"
            >
              <Settings className="w-6 h-6" />
            </motion.div>
          </div>
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-eu-blue-700 to-eu-blue-800 flex items-center justify-center text-white text-2xl font-bold mb-4 relative shadow-eu-card"
              whileHover={{ scale: 1.1, rotateY: 10 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-eu-yellow-600/20 to-transparent" />
              <span className="relative z-10">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
              {/* EU Stars around avatar */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3"
                  style={{
                    top: `${10 + 80 * Math.sin(2 * Math.PI * i / 6)}%`,
                    left: `${10 + 80 * Math.cos(2 * Math.PI * i / 6)}%`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, delay: i * 0.5 }}
                >
                  <Star className="w-full h-full text-eu-yellow-600/60" />
                </motion.div>
              ))}
            </motion.div>
            <h3 className="text-xl font-bold mb-1 text-eu-gradient">
              {user?.firstName} {user?.lastName}
            </h3>
            <div className="text-eu-blue-700 text-sm font-medium mb-2">EU Digital Safety Student</div>
            <EuropeanCertificate isVerified={true} className="mb-4" />
            <div className="flex gap-4">
              <motion.button 
                className="btn-eu-secondary p-3 rounded-2xl"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <motion.button 
                className="btn-eu-primary p-3 rounded-2xl"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Check className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </Card>

        {/* European Reminders Card */}
        <Card variant="premium">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ x: -5 }}
              className="text-eu-blue-700 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
            <h2 className="text-lg font-semibold text-eu-blue-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-eu-yellow-600" />
              EU Alerts
            </h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-eu-yellow-600"
            >
              <Bell className="w-6 h-6" />
            </motion.div>
          </div>
          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <motion.div 
                key={reminder.id} 
                className="glass-eu p-4 rounded-2xl border border-eu-yellow-600/20 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.3 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    className="p-2 rounded-full bg-gradient-to-br from-eu-yellow-600 to-eu-yellow-700"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <reminder.icon className="w-5 h-5 text-eu-blue-800" />
                  </motion.div>
                  <span className="flex-1 text-eu-blue-800 font-medium">{reminder.title}</span>
                  {reminder.action && (
                    <div className="flex gap-2">
                      <motion.button 
                        className="btn-eu-secondary p-2 rounded-xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                      <motion.button 
                        className="btn-eu-primary p-2 rounded-xl"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}
                </div>
                {/* EU Star indicator */}
                <div className="absolute top-2 right-2">
                  <Star className="w-3 h-3 text-eu-yellow-600/50 eu-star" />
                </div>
              </motion.div>
            ))}
            
            {/* Add European safety tip */}
            <motion.div
              className="glass-eu p-4 rounded-2xl border border-eu-blue-700/20 bg-gradient-to-r from-eu-blue-50 to-eu-yellow-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-eu-blue-700" />
                <span className="text-sm text-eu-blue-800 font-medium">
                  🇪🇺 EU Digital Safety Tip: Always verify your sources!
                </span>
              </div>
            </motion.div>
          </div>
        </Card>

        {/* European Task Board */}
        <Card className="lg:col-span-4" variant="glass">
          <div className="flex items-center justify-between mb-6">
            <motion.h2 
              className="text-2xl font-bold text-eu-gradient flex items-center gap-3"
              animate={{ 
                textShadow: [
                  "0 0 15px rgba(255, 215, 0, 0.3)",
                  "0 0 30px rgba(255, 215, 0, 0.6)",
                  "0 0 15px rgba(255, 215, 0, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Shield className="w-6 h-6 text-eu-blue-700" />
              EU Learning Tasks
            </motion.h2>
            <div className="flex gap-3">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Award className="w-6 h-6 text-eu-yellow-600 eu-star" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-eu-yellow-600 eu-star" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                transition={{ duration: 12, repeat: Infinity }}
              >
                <Brain className="w-6 h-6 text-eu-blue-700" />
              </motion.div>
              <EuropeanCertificate isVerified={true} />
            </div>
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Object.entries(columns).map(([columnId, column], colIndex) => (
                <motion.div 
                  key={columnId} 
                  className="glass-eu rounded-2xl p-4 border border-eu-blue-700/20 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: colIndex * 0.2 }}
                >
                  {/* Column header with European theming */}
                  <motion.h3 
                    className="font-semibold mb-4 text-eu-blue-800 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Star className="w-4 h-4 text-eu-yellow-600 eu-star" />
                    {column.title}
                    <span className="ml-auto bg-eu-yellow-600 text-eu-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                      {column.items.length}
                    </span>
                  </motion.h3>
                  
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[200px] transition-all duration-300 ${
                          snapshot.isDraggingOver ? 'bg-eu-yellow-600/10 rounded-xl' : ''
                        }`}
                      >
                        {column.items.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`
                                  glass-eu-card p-4 rounded-xl shadow-eu-card border border-eu-yellow-600/20 
                                  relative overflow-hidden transition-all duration-300
                                  ${snapshot.isDragging ? 'shadow-eu-hover scale-105 rotate-2' : 'hover:shadow-eu-hover'}
                                `}
                                whileHover={{ y: -2, scale: 1.02 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                {/* EU flag accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eu-blue-700 to-eu-yellow-600" />
                                
                                <div className="relative z-10">
                                  <h4 className="font-semibold mb-2 text-eu-blue-800">{task.title}</h4>
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-eu-blue-700 font-medium bg-eu-blue-50 px-2 py-1 rounded-full">
                                      {task.course}
                                    </span>
                                    <div className="flex items-center gap-1 text-eu-blue-600">
                                      <Clock className="w-4 h-4" />
                                      <span className="font-medium">{task.dueDate}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* EU Star decoration */}
                                <div className="absolute top-2 right-2">
                                  <Star className="w-3 h-3 text-eu-yellow-600/30 eu-star" />
                                </div>
                                
                                {/* Progress bar for tasks */}
                                <EuropeanProgress 
                                  progress={Math.random() * 100} 
                                  className="mt-3 h-2"
                                />
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </motion.div>
              ))}
            </div>
          </DragDropContext>
          
          {/* European Action Buttons */}
          <motion.div 
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <EuropeanFAB
              onClick={() => console.log('Add task')}
              icon={<Users className="w-5 h-5" />}
              label="Add EU Task"
              variant="primary"
            />
            <EuropeanFAB
              onClick={() => console.log('Generate report')}
              icon={<Trophy className="w-5 h-5" />}
              label="Progress Report"
              variant="secondary"
            />
          </motion.div>
        </Card>
      </div>
    </div>
  );
}

export default StudentDashboard;
