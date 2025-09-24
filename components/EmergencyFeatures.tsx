'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, 
  Camera, 
  MapPin, 
  Eye, 
  MessageCircle, 
  Share2,
  X,
  Download,
  Upload,
  AlertTriangle,
  Heart,
  Shield,
  Truck,
  Stethoscope,
  Users,
  Send,
  Image as ImageIcon,
  Map,
  Mic,
  MicOff
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const EmergencyFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [aiLabels, setAiLabels] = useState<{ name: string; confidence: number }[] | null>(null)
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! I\'m your emergency assistant. How can I help you?', isBot: true, timestamp: new Date() }
  ])
  const [sharePost, setSharePost] = useState('')
  const [shareImage, setShareImage] = useState<string | null>(null)
  
  const { t } = useLanguage()

  const recognitionRef = useRef<any>(null)

  const startListening = () => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.continuous = false
    recognition.onresult = (event: any) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setChatMessage((prev) => transcript)
    }
    recognition.onend = () => {
      setIsRecording(false)
    }
    recognition.onerror = () => {
      setIsRecording(false)
    }
    recognitionRef.current = recognition
    setIsRecording(true)
    recognition.start()
  }

  const stopListening = () => {
    try {
      recognitionRef.current?.stop()
    } catch {}
    setIsRecording(false)
  }

  const speak = (text: string) => {
    if (typeof window === 'undefined') return
    const synth = window.speechSynthesis
    if (!synth) return
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 1
    utter.pitch = 1
    synth.speak(utter)
  }

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: Shield, color: 'text-blue-600' },
    { name: 'Fire Department', number: '101', icon: AlertTriangle, color: 'text-red-600' },
    { name: 'Medical Emergency', number: '102', icon: Stethoscope, color: 'text-green-600' },
    { name: 'Disaster Management', number: '108', icon: Truck, color: 'text-orange-600' },
    { name: 'Women Helpline', number: '1091', icon: Heart, color: 'text-pink-600' },
    { name: 'Child Helpline', number: '1098', icon: Users, color: 'text-purple-600' }
  ]

  const safePlaces = [
    { name: 'Nearest Hospital', address: 'City General Hospital', distance: '2.5 km', type: 'Medical' },
    { name: 'Emergency Shelter', address: 'Community Center', distance: '1.2 km', type: 'Shelter' },
    { name: 'Police Station', address: 'Central Police Station', distance: '3.1 km', type: 'Safety' },
    { name: 'Fire Station', address: 'Fire Department HQ', distance: '4.2 km', type: 'Emergency' }
  ]

  const handleImageCapture = () => {
    setCapturedImage('https://images.unsplash.com/photo-1581578731548-c6a0c3f8f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result as string
        setUploadedImage(base64)
        try {
          const res = await fetch('/api/ai/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
          })
          const data = await res.json()
          if (data.success) {
            setAiAnalysis(data.data.description)
            setAiLabels(data.data.labels)
            speak(data.data.description)
          } else {
            const msg = 'AI analysis failed. Please try again later.'
            setAiAnalysis(msg)
            setAiLabels(null)
            speak(msg)
          }
        } catch (err) {
          const msg = 'AI analysis failed due to network error.'
          setAiAnalysis(msg)
          setAiLabels(null)
          speak(msg)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: chatMessage,
        isBot: false,
        timestamp: new Date()
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage('')
      
      setTimeout(() => {
        const text = 'Please stay calm and follow emergency protocols. Help is on the way.'
        const botResponse = {
          id: chatMessages.length + 2,
          text,
          isBot: true,
          timestamp: new Date()
        }
        setChatMessages(prev => [...prev, botResponse])
        speak(text)
      }, 1000)
    }
  }

  const handleShareImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setShareImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const features = [
    {
      id: 'emergency-contacts',
      title: t('features.emergency_contacts'),
      icon: Phone,
      color: 'bg-red-500',
      component: <EmergencyContacts contacts={emergencyContacts} />
    },
    {
      id: 'image-caption',
      title: t('features.image_caption'),
      icon: Camera,
      color: 'bg-blue-500',
      component: <ImageCaption onCapture={handleImageCapture} capturedImage={capturedImage} />
    },
    {
      id: 'safe-places',
      title: t('features.safe_places'),
      icon: MapPin,
      color: 'bg-green-500',
      component: <SafePlaces places={safePlaces} />
    },
    {
      id: 'image-recognition',
      title: t('features.image_recognition'),
      icon: Eye,
      color: 'bg-purple-500',
      component: <ImageRecognition onUpload={handleImageUpload} uploadedImage={uploadedImage} aiAnalysis={aiAnalysis} aiLabels={aiLabels} />
    },
    {
      id: 'chatbot',
      title: t('features.chatbot'),
      icon: MessageCircle,
      color: 'bg-orange-500',
      component: <Chatbot messages={chatMessages} message={chatMessage} onMessageChange={setChatMessage} onSend={handleChatSend} onMicToggle={() => (isRecording ? stopListening() : startListening())} isRecording={isRecording} />
    },
    {
      id: 'share',
      title: t('features.share'),
      icon: Share2,
      color: 'bg-pink-500',
      component: <ImageShare post={sharePost} onPostChange={setSharePost} onImageUpload={handleShareImage} shareImage={shareImage} />
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Emergency Response Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quick access to emergency services, AI-powered image analysis, and real-time communication tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.id === 'emergency-contacts' && 'Quick access to emergency numbers'}
                  {feature.id === 'image-caption' && 'Capture and analyze emergency situations'}
                  {feature.id === 'safe-places' && 'Find nearest safe locations and shelters'}
                  {feature.id === 'image-recognition' && 'AI-powered disaster image analysis (with voice read-out)'}
                  {feature.id === 'chatbot' && '24/7 emergency assistance and guidance with voice input'}
                  {feature.id === 'share' && 'Share disaster information and get community support'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Modal */}
        <AnimatePresence>
          {activeFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setActiveFeature(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {features.find(f => f.id === activeFeature)?.title}
                    </h3>
                    <button
                      onClick={() => setActiveFeature(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  {features.find(f => f.id === activeFeature)?.component}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Emergency Contacts Component
const EmergencyContacts: React.FC<{ contacts: any[] }> = ({ contacts }) => (
  <div className="space-y-4">
    {contacts.map((contact, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <contact.icon className={`w-6 h-6 ${contact.color}`} />
          <div>
            <h4 className="font-semibold text-gray-900">{contact.name}</h4>
            <p className="text-sm text-gray-600">Emergency Service</p>
          </div>
        </div>
        <a
          href={`tel:${contact.number}`}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="font-semibold">{contact.number}</span>
        </a>
      </motion.div>
    ))}
  </div>
)

// Image Caption Component
const ImageCaption: React.FC<{ onCapture: () => void; capturedImage: string | null }> = ({ onCapture, capturedImage }) => (
  <div className="space-y-4">
    <div className="text-center">
      <button
        onClick={onCapture}
        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
      >
        <Camera className="w-5 h-5" />
        <span>Capture Image</span>
      </button>
    </div>
    
    {capturedImage && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <img
          src={capturedImage}
          alt="Captured"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Image Analysis</h4>
          <p className="text-blue-800">
            This image appears to show an emergency situation. Please contact emergency services immediately if this is a real emergency.
          </p>
        </div>
      </motion.div>
    )}
  </div>
)

// Safe Places Component
const SafePlaces: React.FC<{ places: any[] }> = ({ places }) => (
  <div className="space-y-4">
    {places.map((place, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-gray-900">{place.name}</h4>
              <p className="text-sm text-gray-600">{place.address}</p>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                {place.type}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{place.distance}</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Get Directions
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)

// Image Recognition Component
const ImageRecognition: React.FC<{ 
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  uploadedImage: string | null
  aiAnalysis: string | null
  aiLabels: { name: string; confidence: number }[] | null
}> = ({ onUpload, uploadedImage, aiAnalysis, aiLabels }) => (
  <div className="space-y-4">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input type="file" accept="image/*" onChange={onUpload} className="hidden" id="image-upload" />
      <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center space-y-2">
        <Upload className="w-8 h-8 text-gray-400" />
        <span className="text-gray-600">Click to upload image for AI analysis</span>
      </label>
    </div>

    {uploadedImage && (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
        <img src={uploadedImage} alt="Uploaded" className="w-full h-64 object-cover rounded-lg" />
        {aiAnalysis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">AI Analysis</h4>
            <p className="text-purple-800 mb-3">{aiAnalysis}</p>
            {aiLabels && (
              <div className="space-y-2">
                {aiLabels.map(l => (
                  <div key={l.name} className="flex items-center justify-between text-sm">
                    <span className="text-purple-900">{l.name}</span>
                    <span className="text-purple-700 font-medium">{Math.round(l.confidence * 100)}%</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    )}
  </div>
)

const Chatbot: React.FC<{
  messages: any[]
  message: string
  onMessageChange: (message: string) => void
  onSend: () => void
  onMicToggle: () => void
  isRecording: boolean
}> = ({ messages, message, onMessageChange, onSend, onMicToggle, isRecording }) => (
  <div className="space-y-4">
    <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
      {messages.map((msg) => (
        <div key={msg.id} className={`mb-3 ${msg.isBot ? 'text-left' : 'text-right'}`}>
          <div className={`inline-block p-3 rounded-lg max-w-xs ${msg.isBot ? 'bg-white text-gray-900' : 'bg-blue-600 text-white'}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
    
    <div className="flex space-x-2 items-center">
      <button onClick={onMicToggle} className={`p-2 rounded-lg border ${isRecording ? 'border-red-500 text-red-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} title="Toggle voice input">
        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Type your message or use voice..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
      />
      <button onClick={onSend} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        <Send className="w-4 h-4" />
      </button>
    </div>
  </div>
)

// Image Share Component
const ImageShare: React.FC<{
  post: string
  onPostChange: (post: string) => void
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  shareImage: string | null
}> = ({ post, onPostChange, onImageUpload, shareImage }) => (
  <div className="space-y-4">
    <div className="border border-gray-200 rounded-lg p-4">
      <textarea
        value={post}
        onChange={(e) => onPostChange(e.target.value)}
        placeholder="Share your experience or ask for help..."
        className="w-full h-24 resize-none border-none focus:ring-0"
      />
      
      {shareImage && (
        <div className="mt-4">
          <img
            src={shareImage}
            alt="Shared"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            id="share-image"
          />
          <label
            htmlFor="share-image"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Add Image</span>
          </label>
        </div>
        
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Share Post
        </button>
      </div>
    </div>
  </div>
)

export default EmergencyFeatures