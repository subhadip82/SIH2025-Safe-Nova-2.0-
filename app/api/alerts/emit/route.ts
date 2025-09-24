import { NextResponse } from 'next/server'
import { publish } from '@/lib/alerts'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		if (!body?.title || !body?.message) {
			return NextResponse.json({ success: false, error: 'title and message are required' }, { status: 400 })
		}
		publish({ title: body.title, message: body.message, level: body.level })
		return NextResponse.json({ success: true })
	} catch (e) {
		return NextResponse.json({ success: false, error: 'failed to emit alert' }, { status: 500 })
	}
}
