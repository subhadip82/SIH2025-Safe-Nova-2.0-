"use client"

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ListChecks, Filter, Search, Calendar, CheckCircle, Clock, SortAsc, PlayCircle, Award, BarChart3 } from 'lucide-react'

const allQuizzes = [
	{ id: 'q1', title: 'Earthquake Safety Basics', due: '2025-10-10', total: 20, completed: true, score: 85, category: 'earthquake', difficulty: 'easy' },
	{ id: 'q2', title: 'Fire Emergency Response', due: '2025-10-05', total: 25, completed: true, score: 92, category: 'fire', difficulty: 'medium' },
	{ id: 'q3', title: 'Flood Preparedness', due: '2025-10-18', total: 15, completed: false, score: null, category: 'flood', difficulty: 'easy' },
	{ id: 'q4', title: 'First Aid Fundamentals', due: '2025-10-22', total: 30, completed: false, score: null, category: 'first-aid', difficulty: 'hard' },
	{ id: 'q5', title: 'Evacuation Procedures', due: '2025-10-12', total: 10, completed: true, score: 78, category: 'fire', difficulty: 'easy' }
]

const categories = [
	{ id: 'all', name: 'All' },
	{ id: 'earthquake', name: 'Earthquake' },
	{ id: 'fire', name: 'Fire' },
	{ id: 'flood', name: 'Flood' },
	{ id: 'first-aid', name: 'First Aid' }
]

const difficulties = [
	{ id: 'all', name: 'All' },
	{ id: 'easy', name: 'Easy' },
	{ id: 'medium', name: 'Medium' },
	{ id: 'hard', name: 'Hard' }
]

export default function QuizzesPage() {
	const [activeCategory, setActiveCategory] = useState<string>('all')
	const [activeDifficulty, setActiveDifficulty] = useState<string>('all')
	const [query, setQuery] = useState('')
	const [sortBy, setSortBy] = useState<'due' | 'title' | 'score'>('due')

	const filtered = useMemo(() => {
		let items = allQuizzes.filter(q => {
			const matchesCategory = activeCategory === 'all' || q.category === activeCategory
			const matchesDifficulty = activeDifficulty === 'all' || q.difficulty === activeDifficulty
			const matchesQuery = q.title.toLowerCase().includes(query.toLowerCase())
			return matchesCategory && matchesDifficulty && matchesQuery
		})

		items.sort((a, b) => {
			if (sortBy === 'due') return a.due.localeCompare(b.due)
			if (sortBy === 'title') return a.title.localeCompare(b.title)
			return (b.score || 0) - (a.score || 0)
		})

		return items
	}, [activeCategory, activeDifficulty, query, sortBy])

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			<div className="bg-white/80 backdrop-blur border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
								<ListChecks className="w-5 h-5 text-white" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">All Quizzes</h1>
								<p className="text-gray-600">Practice and test your knowledge</p>
							</div>
						</div>
						<div className="hidden md:flex items-center space-x-2">
							<div className="relative">
								<Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
								<input
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search quizzes..."
									className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<button
								onClick={() => setSortBy('due')}
								className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${sortBy === 'due' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
							>
								<Calendar className="w-4 h-4" />
								<span>Sort by due</span>
							</button>
							<button
								onClick={() => setSortBy('title')}
								className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${sortBy === 'title' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
							>
								<SortAsc className="w-4 h-4" />
								<span>Sort by title</span>
							</button>
							<button
								onClick={() => setSortBy('score')}
								className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${sortBy === 'score' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
							>
								<BarChart3 className="w-4 h-4" />
								<span>Sort by score</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Filters */}
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

					<div className="ml-auto flex items-center gap-2">
						{difficulties.map((d) => (
							<button
								key={d.id}
								onClick={() => setActiveDifficulty(d.id)}
								className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${activeDifficulty === d.id ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
							>
								{d.name}
							</button>
						))}
					</div>
				</div>

				{/* Quiz Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((q, index) => (
						<motion.div
							key={q.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow"
						>
							<div className="flex items-start justify-between mb-3">
								<h3 className="font-semibold text-gray-900">{q.title}</h3>
								<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${q.completed ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
									{q.completed ? 'Completed' : 'Available'}
								</span>
							</div>

							<div className="flex items-center justify-between text-sm text-gray-600 mb-3">
								<span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> Due {q.due}</span>
								<span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {q.total} questions</span>
							</div>

							{q.completed && (
								<div className="flex items-center justify-between text-sm mb-3">
									<div className="inline-flex items-center gap-2 text-green-700">
										<CheckCircle className="w-4 h-4" />
										<span>Score: <span className="font-semibold">{q.score}%</span></span>
									</div>
									<Award className="w-4 h-4 text-yellow-500" />
								</div>
							)}

							<div className="flex items-center justify-between">
								<button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
									<PlayCircle className="w-4 h-4" />
									<span>{q.completed ? 'Retake Quiz' : 'Start Quiz'}</span>
								</button>
								<button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
									View Details
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}

