import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User } from 'lucide-react';

export function StudentMessages() {
  const messages = [
    {
      id: 1,
      from: 'Dr. Sarah Miller',
      subject: 'Great progress in Digital Safety!',
      preview: 'Your recent quiz results show excellent understanding...',
      date: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Prof. Michael Chen',
      subject: 'AI Workshop Next Week',
      preview: "Don't forget to prepare for our special AI workshop...",
      date: 'Yesterday',
      unread: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        Messages from Facilitators
      </h2>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg transition-colors ${
              message.unread
                ? 'bg-blue-50 border border-blue-100'
                : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-full border">
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{message.from}</h3>
                    <p className="text-sm text-gray-600">{message.subject}</p>
                  </div>
                  <span className="text-xs text-gray-500">{message.date}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{message.preview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}