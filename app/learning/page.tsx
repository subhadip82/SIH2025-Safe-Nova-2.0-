"use client"

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Filter, Play, Search, Star, Clock, Layers, Video, Activity, Cpu } from 'lucide-react'

const categories = [
	{ id: 'all', name: 'All' },
	{ id: 'earthquake', name: 'Earthquake' },
	{ id: 'fire', name: 'Fire' },
	{ id: 'flood', name: 'Flood' },
	{ id: 'first-aid', name: 'First Aid' }
]

const allModules = [
	{ id: 'm1', title: 'Emergency Response Basics', category: 'first-aid', type: 'video', duration: 15, rating: 4.8, progress: 100 },
	{ id: 'm2', title: 'Fire Safety Procedures', category: 'fire', type: 'interactive', duration: 20, rating: 4.6, progress: 80 },
	{ id: 'm3', title: 'Earthquake Preparedness', category: 'earthquake', type: 'simulation', duration: 25, rating: 4.7, progress: 60 },
	{ id: 'm4', title: 'Flood Preparedness', category: 'flood', type: 'video', duration: 18, rating: 4.5, progress: 35 },
	{ id: 'm5', title: 'CPR and First Aid', category: 'first-aid', type: 'video', duration: 30, rating: 4.9, progress: 0 },
	{ id: 'm6', title: 'Campus Evacuation Drill', category: 'fire', type: 'interactive', duration: 22, rating: 4.4, progress: 10 },
]

export default function LearningPage() {
	const [activeCategory, setActiveCategory] = useState<string>('all')
	const [query, setQuery] = useState('')
	const [onlyInProgress, setOnlyInProgress] = useState(false)

	const filtered = useMemo(() => {
		return allModules.filter(m => {
			const matchesCategory = activeCategory === 'all' || m.category === activeCategory
			const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase())
			const matchesProgress = !onlyInProgress || (m.progress > 0 && m.progress < 100)
			return matchesCategory && matchesQuery && matchesProgress
		})
	}, [activeCategory, query, onlyInProgress])

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			<div className="bg-white/80 backdrop-blur border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
								<BookOpen className="w-5 h-5 text-white" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">Learning Modules</h1>
								<p className="text-gray-600">Interactive training for disaster preparedness</p>
							</div>
						</div>
						<div className="hidden md:flex items-center space-x-2">
							<div className="relative">
								<Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
								<input
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search modules..."
									className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<button
								onClick={() => setOnlyInProgress(v => !v)}
								className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${onlyInProgress ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
							>
								<Filter className="w-4 h-4" />
								<span>In progress</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Categories */}
				<div className="flex items-center gap-3 flex-wrap mb-6">
					{categories.map((c) => (
						<button
							key={c.id}
							onClick={() => setActiveCategory(c.id)}
							className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${activeCategory === c.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
						>
							{c.name}
						</button>
					))}
				</div>

				{/* Modules Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((m, index) => (
						<motion.div
							key={m.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow"
						>
							<div className="flex items-start justify-between mb-3">
								<h3 className="font-semibold text-gray-900">{m.title}</h3>
								<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
									{m.category.replace('-', ' ')}
								</span>
							</div>

							<div className="flex items-center justify-between text-sm text-gray-600 mb-3">
								<span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {m.duration} min</span>
								<span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> {m.rating}</span>
							</div>

							<div className="flex items-center gap-3 mb-4">
								<div className="flex-1 bg-gray-200 rounded-full h-2">
									<div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${m.progress}%` }} />
								</div>
								<span className="text-sm text-gray-600">{m.progress}%</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 capitalize">
									{m.type}
								</span>
								<button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
									<Play className="w-4 h-4" />
									<span>{m.progress > 0 ? 'Continue' : 'Start'}</span>
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}

