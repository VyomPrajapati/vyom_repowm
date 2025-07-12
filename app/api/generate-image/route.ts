import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

const ENDPOINT: Record<string, string> = {
  "Stable Diffusion 3.5 Large": `${API_BASE}/generate`,
  "Stable Diffusion 3.5 Medium": `${API_BASE}/medium`,
  "Flux.1 Dev": `${API_BASE}/fluxdev`,
  "Stable Turbo": `${API_BASE}/turbo`,
  "Flux.1 Schnell": `${API_BASE}/fluxschnell`,
  "Stable XL": `${API_BASE}/xl`,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, width, height, num_images, model } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const endpoint = ENDPOINT[model] || ENDPOINT["Stable Diffusion 3.5 Large"]

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': 'wildmind_5879fcd4a8b94743b3a7c8c1a1b4',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        width,
        height,
        num_images,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.image_urls || data.image_urls.length === 0) {
      throw new Error('No image URLs in response')
    }

    return NextResponse.json({
      image_urls: data.image_urls,
      success: true
    })

  } catch (error) {
    console.error('Image generation failed:', error)
    
    // Return placeholder images for demo/fallback
    const placeholderImages = Array(1).fill("/placeholder.svg?height=400&width=400")
    
    return NextResponse.json({
      image_urls: placeholderImages,
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed'
    })
  }
} 