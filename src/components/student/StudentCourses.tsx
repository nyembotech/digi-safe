import React from 'react';
import { motion } from 'framer-motion';
import { Book, ArrowRight } from 'lucide-react';

export function StudentCourses() {
  const courses = [
    {
      id: 1,
      name: 'Digital Safety Fundamentals',
      progress: 80,
      nextLesson: 'Online Privacy',
      date: 'Today, 3:00 PM'
    },
    {
      id: 2,
      name: 'AI for Kids',
      progress: 60,
      nextLesson: 'Machine Learning Basics',
      date: 'Tomorrow, 2:00 PM'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Book className="w-5 h-5 text-blue-500" />
        My Courses
      </h2>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium">{course.name}</h3>
              <span className="text-sm text-blue-500">{course.progress}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 rounded-full h-2"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Next: {course.nextLesson}</span>
              <span>{course.date}</span>
            </div>

            <button className="mt-4 text-blue-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Continue Learning
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}