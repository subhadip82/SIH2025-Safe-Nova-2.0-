'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Play, 
  Trophy, 
  Star, 
  Users, 
  Award,
  ChevronRight,
  Clock,
  CheckCircle,
  Target,
  Zap,
  Brain,
  Gamepad2,
  BarChart3
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

const StudentDashboard: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Points Earned', value: '2,450', icon: Star, color: 'text-yellow-500' },
    { label: 'Quizzes Completed', value: '12', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Current Streak', value: '7 days', icon: Zap, color: 'text-blue-500' },
    { label: 'Rank', value: '#15', icon: Trophy, color: 'text-purple-500' }
  ]

  const recentQuizzes = [
    { title: 'Earthquake Safety Basics', score: 85, status: 'completed', date: '2 days ago' },
    { title: 'Fire Emergency Response', score: 92, status: 'completed', date: '1 week ago' },
    { title: 'Flood Preparedness', score: 78, status: 'completed', date: '2 weeks ago' },
    { title: 'First Aid Fundamentals', score: null, status: 'available', date: 'Available now' }
  ]

  const learningModules = [
    { title: 'Emergency Response Basics', progress: 100, type: 'video', duration: '15 min' },
    { title: 'Fire Safety Procedures', progress: 80, type: 'interactive', duration: '20 min' },
    { title: 'Earthquake Preparedness', progress: 60, type: 'simulation', duration: '25 min' },
    { title: 'First Aid Training', progress: 0, type: 'video', duration: '30 min' }
  ]

  const leaderboard = [
    { rank: 1, name: 'Alex Johnson', points: 3450, avatar: 'AJ' },
    { rank: 2, name: 'Sarah Wilson', points: 3200, avatar: 'SW' },
    { rank: 3, name: 'Mike Chen', points: 3100, avatar: 'MC' },
    { rank: 4, name: 'Emma Davis', points: 2950, avatar: 'ED' },
    { rank: 5, name: 'You', points: 2450, avatar: 'YO' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/learning" className="hidden sm:inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span>Learning</span>
              </Link>
              <Link href="/quizzes" className="hidden sm:inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <CheckCircle className="w-4 h-4" />
                <span>Quizzes</span>
              </Link>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-500">Current Points</p>
                <p className="text-2xl font-bold text-yellow-500">2,450</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{user?.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
          {/* Mobile quick links */}
          <div className="mt-4 flex sm:hidden items-center gap-3">
            <Link href="/learning" className="flex-1 inline-flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>Learning</span>
            </Link>
            <Link href="/quizzes" className="flex-1 inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <CheckCircle className="w-4 h-4" />
              <span>Quizzes</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Learning Modules</h2>
                <Link href="/learning" className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {learningModules.map((module, index) => (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      <span className="text-sm text-gray-500">{module.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{module.progress}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {module.type}
                      </span>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium">
                        <Play className="w-4 h-4" />
                        <span>Continue</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Quizzes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Quizzes</h3>
                <Link href="/quizzes" className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</Link>
              </div>
              <div className="space-y-3">
                {recentQuizzes.map((quiz, index) => (
                  <div key={quiz.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{quiz.title}</p>
                      <p className="text-sm text-gray-500">{quiz.date}</p>
                    </div>
                    {quiz.score ? (
                      <div className="text-right">
                        <p className="font-bold text-green-600">{quiz.score}%</p>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    ) : (
                      <Link href="/quizzes" className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Start
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Leaderboard</h3>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div key={player.name} className={`flex items-center justify-between p-3 rounded-lg ${
                    player.name === 'You' ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank <= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {player.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{player.name}</p>
                        <p className="text-sm text-gray-500">{player.points} pts</p>
                      </div>
                    </div>
                    {player.rank <= 3 && (
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/quizzes" className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Go to Quizzes</span>
                </Link>
                <Link href="/learning" className="w-full flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Go to Learning</span>
                </Link>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Play className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Watch Tutorial</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <Gamepad2 className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-900">Play Game</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
