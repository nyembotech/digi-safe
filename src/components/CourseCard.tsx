import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Award, MapPin, Sparkles, ArrowUpRight, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './Dialog';
import { Button } from './Button';
import { CourseRegistration } from './CourseRegistration';
import { Separator } from './Separator';
import { formatPrice, formatDate, formatTime, getAvailableSeats, cn } from '../lib/utils';
import type { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    setSelectedSession(null);
    setIsDialogOpen(false);
  };

  const selectedSessionData = course.nextSessions.find(s => s.id === selectedSession);
  const primaryCountry = course.nextSessions.find(session => session.location?.country)?.location?.country;

  const formatLocation = (session: Course['nextSessions'][0]) => {
    if (!session.location) return 'TBA';
    const { address, city } = session.location;
    if (!address && !city) return 'TBA';
    if (!address) return city;
    if (!city) return address;
    return `${address}, ${city}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8, 
        rotateX: 5, 
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative group h-full card-3d"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* European Stars Background */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-full h-full text-eu-yellow-600/30 eu-star" />
      </motion.div>
      
      {/* Card Content */}
      <div className="theme-card relative flex h-full flex-col overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-eu-hover">
        {/* EU Flag Gradient Border on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-eu-blue via-eu-gold to-eu-blue p-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-full w-full rounded-2xl bg-[var(--surface-card)]" />
        </div>

        {/* Subtle Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-eu-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="flex gap-6 relative z-10">
          {/* Course Image/Icon */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-eu-blue to-eu-blue-light flex items-center justify-center shadow-md relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-eu-gold/10 to-transparent rounded-2xl" />
            <motion.div
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative z-10"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
            {/* EU Stars around the icon */}
            <div className="absolute inset-0">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2"
                  style={{
                    top: `${20 + 60 * Math.sin(2 * Math.PI * i / 4)}%`,
                    left: `${20 + 60 * Math.cos(2 * Math.PI * i / 4)}%`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
                >
                  <Star className="w-full h-full text-eu-yellow-600/50" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Course Content */}
          <div className="flex-1 min-w-0">
            {/* Course Title and Badges */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <motion.h3
              className="text-xl font-bold text-theme-primary line-clamp-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                {course.title}
              </motion.h3>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <motion.span
                  className="bg-gradient-to-r from-eu-blue to-eu-blue-dark text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {course.level}
                </motion.span>
                <motion.span
                  className="bg-gradient-to-r from-eu-gold-dark to-eu-gold text-eu-blue-dark px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                  {course.rating}/5
                </motion.span>
              </div>
            </div>

            {/* Course Description */}
            <motion.p 
              className="mb-4 text-sm text-theme-secondary line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {course.description}
            </motion.p>

            {primaryCountry && (
              <motion.span
                className="theme-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <MapPin className="h-3.5 w-3.5" />
                {primaryCountry}
              </motion.span>
            )}

            {/* Course Stats */}
            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <motion.div
                className="theme-chip flex items-center gap-2 rounded-full px-3 py-2"
                whileHover={{ scale: 1.05, y: -2, backgroundColor: 'var(--chip-bg)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Clock className="w-4 h-4 text-eu-blue" />
                <span className="font-medium text-theme-secondary">{course.duration}</span>
              </motion.div>
              <motion.div
                className="theme-chip flex items-center gap-2 rounded-full px-3 py-2"
                whileHover={{ scale: 1.05, y: -2, backgroundColor: 'var(--chip-bg)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Users className="w-4 h-4 text-eu-blue" />
                <span className="font-medium text-theme-secondary">{course.enrollments} enrolled</span>
              </motion.div>
              <motion.div
                className="theme-chip flex items-center gap-2 rounded-full px-3 py-2"
                whileHover={{ scale: 1.05, y: -2, backgroundColor: 'var(--chip-bg)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Award className="w-4 h-4 text-eu-gold-dark" />
                <span className="font-medium text-theme-secondary">{course.language}</span>
              </motion.div>
            </div>

            {/* Price Section */}
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-baseline gap-2">
                <motion.span 
                  className="text-2xl font-bold text-eu-gradient"
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(255, 215, 0, 0.3)",
                      "0 0 20px rgba(255, 215, 0, 0.6)",
                      "0 0 10px rgba(255, 215, 0, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {formatPrice(course.subsidizedPrice.min)}
                </motion.span>
                <span className="text-sm text-theme-muted line-through">
                  {formatPrice(course.price)}
                </span>
              </div>
              <motion.span
                className="bg-gradient-to-r from-eu-gold-dark to-eu-gold text-white px-4 py-2 rounded-full text-sm font-bold shadow-md relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring", bounce: 0.3 }}
              >
                <span className="relative z-10">
                  Save {Math.round(((course.price - course.subsidizedPrice.min) / course.price) * 100)}%
                </span>
                <div
                  className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.15), rgba(255,215,0,0.2))' }}
                />
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Sessions Preview */}
        <div className="mt-auto space-y-3">
          <Separator className="my-4" />
          
          {/* Show first two sessions */}
          {course.nextSessions.slice(0, 2).map((session) => {
            const availableSeats = getAvailableSeats(session.seatsTotal, session.seatsBooked);
            const isFull = availableSeats <= 0;
            
            return (
              <motion.div 
                key={session.id} 
                className={cn(
                  'rounded-xl border p-4 transition-all',
                  isFull
                    ? 'cursor-not-allowed border-red-300/40 bg-red-50/20 opacity-70'
                    : 'cursor-pointer border-[var(--chip-border)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] hover:shadow-eu-card'
                )}
                whileHover={isFull ? undefined : { scale: 1.02 }}
                onClick={() => {
                  setSelectedSession(session.id);
                  setIsDialogOpen(true);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">
                      {formatDate(session.date)}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-sm font-medium',
                      isFull
                        ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-100'
                        : availableSeats <= 5
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-100'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100'
                    )}
                  >
                    {isFull 
                      ? 'Full' 
                      : `${availableSeats} seats left`}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-theme-muted">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {formatTime(session.time)}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {formatLocation(session)}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* European-themed Action Button */}
          <div className="flex justify-end pt-4 relative z-10">
            <motion.button
              onClick={() => setIsDialogOpen(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-eu-blue to-eu-blue-dark text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -4
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-eu-gold/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

              <span className="relative z-10 font-semibold">Available Sessions</span>
              <motion.div
                className="relative z-10"
                animate={{
                  x: [0, 2, 0],
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </div>
        </div>

        {/* Sessions Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-3xl">
            {!showRegistration ? (
              <>
                <DialogHeader>
                  <DialogTitle>Available Sessions for {course.title}</DialogTitle>
                  <DialogDescription>
                    Select a session date and time to begin registration
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {course.nextSessions.map((session) => {
                    const availableSeats = getAvailableSeats(session.seatsTotal, session.seatsBooked);
                    const isFull = availableSeats <= 0;
                    
                    return (
                      <motion.div
                        key={session.id}
                        whileHover={isFull ? undefined : { scale: 1.02 }}
                        className={cn(
                          'rounded-xl border p-4 transition-all',
                          isFull
                            ? 'cursor-not-allowed border-red-300/40 bg-red-50/20 opacity-60'
                            : selectedSession === session.id
                            ? 'cursor-pointer border-[var(--accent-primary)] bg-[var(--chip-bg)] shadow-eu-hover'
                            : 'cursor-pointer border-[var(--chip-border)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)]'
                        )}
                        onClick={() => !isFull && setSelectedSession(session.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium mb-2">{formatDate(session.date)}</h3>
                            <div className="flex items-center gap-6 text-sm text-theme-muted">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {formatTime(session.time)}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {formatLocation(session)}
                              </div>
                            </div>
                          </div>
                          <span
                            className={cn(
                              'rounded-full px-3 py-1 text-sm font-medium',
                              isFull
                                ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-100'
                                : availableSeats <= 5
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-100'
                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100'
                            )}
                          >
                            {isFull 
                              ? 'Fully Booked'
                              : `${availableSeats} seats available`}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (selectedSession && selectedSessionData) {
                          setShowRegistration(true);
                        }
                      }}
                      disabled={!selectedSession}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500"
                    >
                      Continue Registration
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Course Registration</DialogTitle>
                  <DialogDescription>
                    Complete your registration for {course.title}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {selectedSessionData && (
                    <CourseRegistration
                      course={course}
                      selectedSession={selectedSessionData}
                      onSuccess={handleRegistrationSuccess}
                      onCancel={() => {
                        setShowRegistration(false);
                        setSelectedSession(null);
                      }}
                    />
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
