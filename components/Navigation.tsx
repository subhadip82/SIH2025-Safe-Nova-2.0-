'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Shield, 
  Users, 
  Globe, 
  LogIn, 
  UserPlus, 
  LogOut,
  LayoutDashboard,
  User,
  AlertTriangle,
  Truck,
  Stethoscope,
  Heart,
  Shield as PoliceShield,
  ClipboardCheck
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { UserRole } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  const { user, logout } = useAuth()
  const { currentLanguage, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '\ud83c\uddee🇳' },
    { code: 'bn', name: 'বাংলা', flag: '\ud83c\udde7🇩' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '\ud83c\uddee🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮\ud83c\uddf3' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
  ]

  const emergencyTeams = [
    { name: t('team.fire'), icon: Shield, color: 'text-red-500' },
    { name: t('team.earthquake'), icon: AlertTriangle, color: 'text-orange-500' },
    { name: t('team.flood'), icon: Truck, color: 'text-blue-500' },
    { name: t('team.medical'), icon: Stethoscope, color: 'text-green-500' },
    { name: t('team.police'), icon: PoliceShield, color: 'text-blue-600' },
    { name: t('team.rescue'), icon: Heart, color: 'text-pink-500' }
  ]

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Name */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Safe Nova Logo" className="w-12 h-12 rounded-full border-2 border-blue-500 bg-white shadow" />
                <span className="text-xl font-bold gradient-text">SafeNova</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {!user && pathname === '/' && (
                <>
                  <Link href="/emergency-plan" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-semibold">
                    <ClipboardCheck className="w-5 h-5 text-green-600" />
                    Emergency Plan
                  </Link>
                  <Link href="/about" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-semibold">
                    <Globe className="w-5 h-5 text-blue-600" />
                    About
                  </Link>
                </>
              )}
              <Link href="/post" className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 12v6m0 0l-3-3m3 3l3-3m-3-9v6" /></svg>
                Post
              </Link>
                {user?.role === 'student' && (
                  <Link href="/simulation" className="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Simulation Games</Link>
                )}
              {user?.role === 'student' && (
                <>
                  <Link href="/learning" className="text-gray-700 hover:text-blue-600 transition-colors">Learning</Link>
                  <Link href="/quizzes" className="text-gray-700 hover:text-blue-600 transition-colors">Quizzes</Link>
                </>
              )}
              {user?.role === 'teacher' && (
                <>
                  <Link href="/teacher/quizzes/new" className="text-gray-700 hover:text-blue-600 transition-colors">Create Quiz</Link>
                  <Link href="/teacher/students" className="text-gray-700 hover:text-blue-600 transition-colors">Students</Link>
                </>
              )}
              {/* Team Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>{t('nav.team')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isTeamDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                    >
                      {emergencyTeams.map((team, index) => (
                        <motion.div
                          key={team.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <team.icon className={`w-5 h-5 ${team.color}`} />
                          <span className="text-gray-700">{team.name}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{t('nav.language')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isLanguageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                    >
                      {languages.map((lang, index) => (
                        <motion.button
                          key={lang.code}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setLanguage(lang.code as any)
                            setIsLanguageDropdownOpen(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                            currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth Buttons */}
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Avatar dropdown */}
                  <div className="relative">
                    <button onClick={()=>setIsProfileOpen(v=>!v)} className="flex items-center space-x-2">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border p-2">
                          <Link href="/profile" onClick={()=>setIsProfileOpen(false)} className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50">
                            <User className="w-4 h-4 text-gray-600" />
                            <span>Profile</span>
                          </Link>
                          <Link href="/dashboard" onClick={()=>setIsProfileOpen(false)} className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50">
                            <LayoutDashboard className="w-4 h-4 text-gray-600" />
                            <span>Dashboard</span>
                          </Link>
                          <button onClick={()=>{setIsProfileOpen(false); logout()}} className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50">
                            <LogOut className="w-4 h-4 text-gray-600" />
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t('nav.login')}</span>
                  </button>
                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{t('nav.register')}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 py-4"
              >
                <div className="space-y-4">
                    <Link href="/emergency-plan" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-semibold">
                      <ClipboardCheck className="w-5 h-5 text-green-600" />
                      Emergency Plan
                    </Link>
                    {user?.role === 'student' && (
                      <Link href="/simulation" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 transition-colors font-semibold">Simulation Games</Link>
                    )}
                  {user ? (
                    <div className="flex items-center space-x-3 px-2">
                      <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`} alt="avatar" className="w-8 h-8 rounded-full object-cover border" />
                      <div className="text-gray-800 font-medium">{user.name}</div>
                    </div>
                  ) : null}

                  {user?.role === 'student' && (
                    <>
                      <Link href="/learning" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 transition-colors">Learning</Link>
                      <Link href="/quizzes" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 transition-colors">Quizzes</Link>
                    </>
                  )}
                  {user?.role === 'teacher' && (
                    <>
                      <Link href="/teacher/quizzes/new" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 transition-colors">Create Quiz</Link>
                      <Link href="/teacher/students" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 transition-colors">Students</Link>
                    </>
                  )}
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors w-full text-left">
                    <Users className="w-4 h-4" />
                    <span>{t('nav.team')}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors w-full text-left">
                    <Globe className="w-4 h-4" />
                    <span>{t('nav.language')}</span>
                  </button>

                  {user ? (
                    <div className="space-y-2">
                      <Link href="/profile" onClick={()=>setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-50">Profile</Link>
                      <Link href="/dashboard" onClick={()=>setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-50">Dashboard</Link>
                      <button onClick={()=>{setIsMenuOpen(false); logout()}} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Logout</button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors w-full text-left"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>{t('nav.login')}</span>
                      </button>
                      <button
                        onClick={() => setIsRegisterModalOpen(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>{t('nav.register')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginModal 
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onRegister={() => {
              setIsLoginModalOpen(false)
              setIsRegisterModalOpen(true)
            }}
          />
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <RegisterModal 
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
            onLogin={() => {
              setIsRegisterModalOpen(false)
              setIsLoginModalOpen(true)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// Login Modal Component
const LoginModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
}> = ({ isOpen, onClose, onRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const success = await login(email, password, role)
    if (success) {
      onClose()
    }
    
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Login to SafeNova</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role || 'student'}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

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

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <button
            onClick={onRegister}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Register here
          </button>
        </p>
      </motion.div>
    </motion.div>
  )
}

// Register Modal Component
const RegisterModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}> = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    onClose()
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Join SafeNova</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={formData.role || 'student'}
              onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            onClick={onLogin}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login here
          </button>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Navigation