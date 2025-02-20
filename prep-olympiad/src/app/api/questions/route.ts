import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subject = searchParams.get('subject')
  const category = searchParams.get('category')
  const difficulty = searchParams.get('difficulty')

  const questions = await prisma.question.findMany({
    where: {
      ...(subject && { subject: subject.toLowerCase() }),
      ...(category && { category }),
      ...(difficulty && { difficulty }),
    },
    take: 1, // Get one random question
    orderBy: {
      // Random ordering
      id: 'asc',
    },
  })

  return NextResponse.json(questions[0] || null)
} 