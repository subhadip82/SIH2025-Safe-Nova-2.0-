import { NextResponse } from 'next/server'

export async function GET() {
  const emergencyContacts = [
    { name: 'Police', number: '100', type: 'emergency' },
    { name: 'Fire Department', number: '101', type: 'emergency' },
    { name: 'Medical Emergency', number: '102', type: 'emergency' },
    { name: 'Disaster Management', number: '108', type: 'emergency' },
    { name: 'Women Helpline', number: '1091', type: 'helpline' },
    { name: 'Child Helpline', number: '1098', type: 'helpline' }
  ]

  return NextResponse.json({
    success: true,
    data: emergencyContacts,
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Simulate emergency alert processing
    const alert = {
      id: Math.random().toString(36).substr(2, 9),
      type: body.type || 'general',
      message: body.message || 'Emergency alert',
      timestamp: new Date().toISOString(),
      status: 'sent'
    }

    return NextResponse.json({
      success: true,
      data: alert,
      message: 'Emergency alert sent successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process emergency alert' },
      { status: 500 }
    )
  }
}
