'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'student' | 'teacher' | 'admin' | null

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('safenova_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (email && password && role) {
      const baseName = email.split('@')[0]
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: baseName,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(baseName)}&background=3b82f6&color=fff`,
        phone: '',
        address: ''
      }
      setUser(newUser)
      localStorage.setItem('safenova_user', JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('safenova_user')
  }

  const updateProfile = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...updates }
      localStorage.setItem('safenova_user', JSON.stringify(next))
      return next
    })
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}