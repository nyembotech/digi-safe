import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Save } from 'lucide-react';
import { Button } from '../Button';

export function StudentJournal() {
  const [selectedCourse, setSelectedCourse] = useState('digital-safety');
  const [journalEntry, setJournalEntry] = useState('');

  const courses = [
    { id: 'digital-safety', name: 'Digital Safety Fundamentals' },
    { id: 'ai-kids', name: 'AI for Kids' }
  ];

  const handleSave = () => {
    // TODO: Implement journal entry saving
    console.log('Saving journal entry:', { course: selectedCourse, entry: journalEntry });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Book className="w-5 h-5 text-blue-500" />
        My Learning Journal
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you feel about your progress?
          </label>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your thoughts, challenges, and achievements..."
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Entry
          </Button>
        </div>
      </div>
    </motion.div>
  );
}