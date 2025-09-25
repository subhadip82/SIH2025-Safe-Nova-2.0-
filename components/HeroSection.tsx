'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  GraduationCap, 
  Shield, 
  ArrowRight,
  Play,
  BookOpen,
  Trophy,
  Star
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin' | null>(null)
  
  const { user, login } = useAuth()
  const { t } = useLanguage()

  const heroImages = [
    {
      src: 'https://i.postimg.cc/Jhg0c1n6/Gemini-Generated-Image-rkev5wrkev5wrkev.png',
      title: 'Emergency Response Training',
      description: 'Learn life-saving techniques through interactive simulations'
    },
    {
      src: 'https://akm-img-a-in.tosshub.com/indiatoday/styles/medium_crop_simple/public/2024-08/whatsapp_image_2024-08-10_at_3.42.50_pm_2.jpeg?VersionId=18M0xUgaNFM2oxItZmg0.Rj6SOVcxiEo&size=750:*',
      title: 'Disaster Preparedness',
      description: 'Comprehensive training for natural disasters and emergencies'
    },
    {
      src: 'https://indianpsu.com/wp-content/uploads/2025/09/Photo-02-dt.-11-September-2025-1024x704.jpeg?x27332',
      title: 'Safety First',
      description: 'Building a culture of safety in educational institutions'
    },
    {
      src: 'https://cdn1.i-scmp.com/sites/default/files/styles/1020x680/public/images/methode/2015/12/04/b585948c-9a72-11e5-9aa0-28ea742fb738_1280x720.jpg?itok=gR3t7kCl',
      title: 'Community Resilience',
      description: 'Strengthening communities through education and preparedness'
    }
  ]



const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % heroImages.length);
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
};

  const handleRoleLogin = async (role: 'student' | 'teacher' | 'admin') => {
    setSelectedRole(role)
    setIsLoginModalOpen(true)
  }

  const handleLogin = async (email: string, password: string) => {
    if (selectedRole) {
      const success = await login(email, password, selectedRole)
      if (success) {
        setIsLoginModalOpen(false)
        setSelectedRole(null)
      }
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{ zIndex: 0 }}
          >
            <img
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].title}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 pointer-events-auto"
        style={{ zIndex: 20 }}
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 pointer-events-auto"
        style={{ zIndex: 20 }}
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl mb-8 text-gray-200"
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* Login Options */}
              {!user ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRoleLogin('teacher')}
                      className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4 hover:bg-white/30 transition-all duration-300"
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-medium">{t('hero.teacher_login')}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRoleLogin('student')}
                      className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4 hover:bg-white/30 transition-all duration-300"
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span className="font-medium">{t('hero.student_login')}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRoleLogin('admin')}
                      className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4 hover:bg-white/30 transition-all duration-300"
                    >
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">{t('hero.admin_login')}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/dashboard'}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-300"
                  >
                    <span className="font-medium">{t('hero.continue_dashboard')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Right Content - Features Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white"
                >
                  <Play className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
                  <p className="text-sm text-gray-200">Engaging video modules and simulations</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white"
                >
                  <BookOpen className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Comprehensive Training</h3>
                  <p className="text-sm text-gray-200">Complete disaster preparedness curriculum</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white"
                >
                  <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Gamification</h3>
                  <p className="text-sm text-gray-200">Points, badges, and leaderboards</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white"
                >
                  <Star className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Real-time Alerts</h3>
                  <p className="text-sm text-gray-200">Instant emergency notifications</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => {
              setIsLoginModalOpen(false)
              setSelectedRole(null)
            }}
            onLogin={handleLogin}
            role={selectedRole}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// Login Modal Component
const LoginModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
  role: 'student' | 'teacher' | 'admin' | null
}> = ({ isOpen, onClose, onLogin, role }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onLogin(email, password)
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Login as {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default HeroSection