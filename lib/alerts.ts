type AlertPayload = {
	title: string
	message: string
	level?: 'info' | 'warning' | 'danger'
	timestamp?: string
}

type Subscriber = (data: AlertPayload) => void

const subscribers = new Set<Subscriber>()

export function subscribe(sub: Subscriber) {
	subscribers.add(sub)
	return () => subscribers.delete(sub)
}

export function publish(alert: AlertPayload) {
	const payload = {
		...alert,
		timestamp: alert.timestamp || new Date().toISOString(),
	}
	subscribers.forEach((fn) => {
		try { fn(payload) } catch {}
	})
}

export type { AlertPayload }
