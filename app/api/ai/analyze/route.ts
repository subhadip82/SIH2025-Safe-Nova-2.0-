import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

async function analyzeWithGoogle(base64: string, apiKey: string) {
	const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`
	const payload = {
		requests: [
			{
				image: { content: base64.split(',')[1] || base64 },
				features: [
					{ type: 'LABEL_DETECTION', maxResults: 10 },
					{ type: 'SAFE_SEARCH_DETECTION' }
				]
			}
		]
	}
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})
	if (!res.ok) throw new Error('Google Vision request failed')
	const json = await res.json()
	const labels = (json?.responses?.[0]?.labelAnnotations || []).map((l: any) => ({ name: l.description, confidence: l.score }))
	const safe = json?.responses?.[0]?.safeSearchAnnotation
	const description = `Detected ${labels.slice(0,3).map((l:any)=>l.name).join(', ') || 'no major objects'}. Safety: ${safe ? JSON.stringify(safe) : 'n/a'}`
	return { labels, description }
}

async function analyzeWithOpenAI(base64: string, apiKey: string) {
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: 'Identify key objects and hazards. Return JSON with labels[{name,confidence}], description.' },
						{ type: 'image_url', image_url: { url: base64 } }
					]
				}
			],
			temperature: 0.2
		})
	})
	if (!res.ok) throw new Error('OpenAI request failed')
	const json = await res.json()
	const content = json?.choices?.[0]?.message?.content || '{}'
	let parsed: any
	try { parsed = JSON.parse(content) } catch { parsed = {} }
	const labels = parsed.labels || []
	const description = parsed.description || 'No description available.'
	return { labels, description }
}

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { image } = body as { image?: string }
		if (!image) {
			return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 })
		}

		const provider = process.env.AI_PROVIDER || 'mock'
		let result: { labels: { name: string; confidence: number }[]; description: string }

		if (provider === 'google' && process.env.GOOGLE_VISION_API_KEY) {
			result = await analyzeWithGoogle(image, process.env.GOOGLE_VISION_API_KEY)
		} else if (provider === 'openai' && process.env.OPENAI_API_KEY) {
			result = await analyzeWithOpenAI(image, process.env.OPENAI_API_KEY)
		} else {
			// Fallback mock
			result = {
				labels: [
					{ name: 'Debris', confidence: 0.92 },
					{ name: 'Damaged Building', confidence: 0.88 },
					{ name: 'Emergency Scene', confidence: 0.86 }
				],
				description: 'Mock analysis: possible disaster scene. Configure AI_PROVIDER to use a real API.'
			}
		}

		return NextResponse.json({ success: true, data: result })
	} catch (e: any) {
		return NextResponse.json({ success: false, error: e?.message || 'Failed to analyze image' }, { status: 500 })
	}
}
