import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Star } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function StudentProgress() {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Digital Safety',
        data: [65, 75, 80, 85],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      },
      {
        label: 'AI for Kids',
        data: [45, 55, 60, 70],
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const achievements = [
    { icon: Star, label: 'Perfect Attendance', date: '2 days ago' },
    { icon: Award, label: 'Quiz Master', date: 'Last week' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        My Progress
      </h2>

      <div className="mb-8">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3">
              <achievement.icon className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium">{achievement.label}</p>
                <p className="text-sm text-gray-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}