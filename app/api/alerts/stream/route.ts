import { NextRequest } from 'next/server'
// Ensure this API route is always server-side and never statically generated
export const dynamic = "force-dynamic"
import { subscribe, type AlertPayload } from '@/lib/alerts'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
	const stream = new ReadableStream({
		start(controller) {
			const encoder = new TextEncoder()
			const send = (data: AlertPayload) => {
				controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
			}
			const unsub = subscribe(send)
			// Send a welcome event
			send({ title: 'Connected', message: 'Listening for alerts...', level: 'info' })
			// Close on client abort
			const signal = req.signal
			signal.addEventListener('abort', () => {
				unsub()
				controller.close()
			})
		}
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache, no-transform',
			'Connection': 'keep-alive',
		},
	})
}
