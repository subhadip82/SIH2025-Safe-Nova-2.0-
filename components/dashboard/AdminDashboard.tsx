'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Building, 
  BarChart3, 
  Settings, 
  Shield,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Bell,
  Award
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Users', value: '1,245', icon: Users, color: 'text-blue-500', change: '+12%' },
    { label: 'Active Schools', value: '45', icon: Building, color: 'text-green-500', change: '+3%' },
    { label: 'Emergency Alerts', value: '8', icon: AlertTriangle, color: 'text-red-500', change: '-25%' },
    { label: 'System Health', value: '99.9%', icon: Shield, color: 'text-purple-500', change: '+0.1%' }
  ]

  const recentActivity = [
    { type: 'user_registration', message: 'New teacher registered: Sarah Wilson', time: '2 hours ago', status: 'success' },
    { type: 'emergency_alert', message: 'Emergency drill completed at Central High', time: '4 hours ago', status: 'info' },
    { type: 'system_update', message: 'System maintenance completed successfully', time: '6 hours ago', status: 'success' },
    { type: 'user_activity', message: 'High activity detected in District A', time: '8 hours ago', status: 'warning' }
  ]

  const schools = [
    { name: 'Central High School', students: 1250, teachers: 45, status: 'active', lastActivity: '2 hours ago' },
    { name: 'Westside Elementary', students: 680, teachers: 28, status: 'active', lastActivity: '1 hour ago' },
    { name: 'Eastside Middle School', students: 890, teachers: 35, status: 'active', lastActivity: '3 hours ago' },
    { name: 'Northside Academy', students: 450, teachers: 22, status: 'maintenance', lastActivity: '1 day ago' }
  ]

  const emergencyAlerts = [
    { id: 1, type: 'Fire Drill', school: 'Central High School', status: 'completed', time: '10:30 AM', participants: 1250 },
    { id: 2, type: 'Earthquake Drill', school: 'Westside Elementary', status: 'scheduled', time: '2:00 PM', participants: 680 },
    { id: 3, type: 'Flood Preparedness', school: 'Eastside Middle School', status: 'in_progress', time: '11:15 AM', participants: 890 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">System overview and management, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                <AlertTriangle className="w-4 h-4" />
                <span>Send Alert</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add School</span>
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
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 
                  stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Schools Management */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">School Management</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search schools..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">School</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Students</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Teachers</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.map((school, index) => (
                      <motion.tr
                        key={school.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{school.name}</p>
                            <p className="text-sm text-gray-500">Last active: {school.lastActivity}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-900">{school.students.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-900">{school.teachers}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            school.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {school.status === 'active' ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Maintenance
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Emergency Alerts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Emergency Alerts</h2>
                <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Create Alert</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {emergencyAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 ${
                      alert.status === 'completed' ? 'border-green-200 bg-green-50' :
                      alert.status === 'in_progress' ? 'border-yellow-200 bg-yellow-50' :
                      'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{alert.type}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'completed' ? 'bg-green-100 text-green-800' :
                        alert.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">School</p>
                        <p className="font-medium text-gray-900">{alert.school}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium text-gray-900">{alert.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{alert.participants} participants</span>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Server Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">API Response</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Fast</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="text-gray-900 font-medium">99.9%</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
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
                <button className="w-full flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-900">Send Emergency Alert</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Add New School</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">View Analytics</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">System Settings</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
