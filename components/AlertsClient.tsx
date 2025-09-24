'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function AlertsClient() {
	useEffect(() => {
		const es = new EventSource('/api/alerts/stream')
		es.onmessage = (ev) => {
			try {
				const data = JSON.parse(ev.data)
				const style = data.level === 'danger' ? { icon: '🚨' } : data.level === 'warning' ? { icon: '⚠️' } : { icon: 'ℹ️' }
				toast(`${data.title}: ${data.message}`, { icon: (style as any).icon })
			} catch {}
		}
		return () => es.close()
	}, [])
	return null
}
