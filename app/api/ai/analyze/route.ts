import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { image } = body as { image?: string }

		if (!image) {
			return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 })
		}

		// Mock AI analysis
		const analysis = {
			labels: [
				{ name: 'Debris', confidence: 0.92 },
				{ name: 'Damaged Building', confidence: 0.88 },
				{ name: 'Emergency Scene', confidence: 0.86 }
			],
			description: 'The image likely depicts a disaster scene with structural damage. Consider contacting emergency services and keeping a safe distance.'
		}

		return NextResponse.json({ success: true, data: analysis })
	} catch (e) {
		return NextResponse.json({ success: false, error: 'Failed to analyze image' }, { status: 500 })
	}
}
