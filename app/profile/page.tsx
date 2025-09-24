'use client'

import React, { useRef, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Camera, Save, User, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to manage your profile.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Go Home</Link>
        </div>
      </div>
    )
  }

  const onPick = () => fileRef.current?.click()

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const onSave = () => {
    const updates: any = { ...form }
    if (preview) updates.avatar = preview
    updateProfile(updates)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <button onClick={onSave} className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 border">
                <img src={preview || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`} alt="avatar" className="w-full h-full object-cover" />
                <button onClick={onPick} className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow border">
                  <Camera className="w-4 h-4 text-gray-700" />
                </button>
                <input type="file" accept="image/*" ref={fileRef} onChange={onFile} className="hidden" />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="flex-1 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <input value={form.email} readOnly className="flex-1 outline-none bg-transparent text-gray-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <input value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className="flex-1 outline-none" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <div className="flex items-start border rounded-lg px-3 py-2">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                  <textarea value={form.address} onChange={(e)=>setForm({...form, address: e.target.value})} className="flex-1 outline-none resize-none h-20" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

