'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Plus, 
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Video,
  FileText,
  Settings,
  Bell,
  TrendingUp,
  Award
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Students', value: '156', icon: Users, color: 'text-blue-500' },
    { label: 'Active Quizzes', value: '8', icon: BookOpen, color: 'text-green-500' },
    { label: 'Scheduled Meetings', value: '3', icon: Calendar, color: 'text-purple-500' },
    { label: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'text-orange-500' }
  ]

  const students = [
    { name: 'Alex Johnson', email: 'alex@school.edu', progress: 85, lastActive: '2 hours ago', status: 'active' },
    { name: 'Sarah Wilson', email: 'sarah@school.edu', progress: 92, lastActive: '1 hour ago', status: 'active' },
    { name: 'Mike Chen', email: 'mike@school.edu', progress: 78, lastActive: '3 hours ago', status: 'active' },
    { name: 'Emma Davis', email: 'emma@school.edu', progress: 95, lastActive: '30 min ago', status: 'active' },
    { name: 'John Smith', email: 'john@school.edu', progress: 45, lastActive: '1 day ago', status: 'inactive' }
  ]

  const quizzes = [
    { title: 'Earthquake Safety Basics', students: 45, completed: 38, status: 'active', dueDate: '2024-01-15' },
    { title: 'Fire Emergency Response', students: 42, completed: 42, status: 'completed', dueDate: '2024-01-10' },
    { title: 'Flood Preparedness', students: 48, completed: 35, status: 'active', dueDate: '2024-01-20' },
    { title: 'First Aid Fundamentals', students: 0, completed: 0, status: 'draft', dueDate: '2024-01-25' }
  ]

  const meetings = [
    { title: 'Emergency Drill Planning', date: '2024-01-12', time: '10:00 AM', attendees: 8, status: 'scheduled' },
    { title: 'Safety Protocol Review', date: '2024-01-15', time: '2:00 PM', attendees: 12, status: 'scheduled' },
    { title: 'Disaster Response Training', date: '2024-01-18', time: '9:00 AM', attendees: 15, status: 'scheduled' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600">Manage your classes and students, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create Quiz</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Meeting</span>
              </button>
            </div>
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Students Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Student Details</h2>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                  <UserPlus className="w-4 h-4" />
                  <span>Add Student</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Active</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <motion.tr
                        key={student.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{student.lastActive}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.status === 'active' ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quizzes Management */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quiz Management</h2>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Create Quiz</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {quizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        quiz.status === 'active' ? 'bg-green-100 text-green-800' :
                        quiz.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {quiz.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Students</p>
                        <p className="font-semibold text-gray-900">{quiz.students}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="font-semibold text-gray-900">{quiz.completed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Due Date</p>
                        <p className="font-semibold text-gray-900">{quiz.dueDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                          View Results
                        </button>
                      </div>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Settings
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scheduled Meetings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Scheduled Meetings</h3>
              <div className="space-y-4">
                {meetings.map((meeting, index) => (
                  <div key={meeting.title} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{meeting.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{meeting.attendees} attendees</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Join Meeting
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Create Quiz</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Video className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Schedule Meeting</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">View Analytics</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <Settings className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-900">Settings</span>
                </button>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quiz Completed</p>
                    <p className="text-xs text-gray-600">Alex Johnson completed Fire Safety quiz</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Student</p>
                    <p className="text-xs text-gray-600">Emma Davis joined your class</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Achievement</p>
                    <p className="text-xs text-gray-600">Class completed 100% of safety modules</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
