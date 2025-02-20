import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function testDatabaseImport() {
  // Read sample question
  const sampleQuestion = JSON.parse(
    fs.readFileSync('./sample_parsed_question.json', 'utf-8')
  )

  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected')

    // Import sample question
    const result = await prisma.question.create({
      data: {
        title: sampleQuestion.content.substring(0, 100),
        content: sampleQuestion.content,
        choices: sampleQuestion.choices || [],  // Ensure it's an array
        correctAnswer: sampleQuestion.correctAnswer || "",
        solution: sampleQuestion.solution || "",
        difficulty: sampleQuestion.difficulty || "Medium",
        category: sampleQuestion.category || "General",
        subject: "mathematics",
        images: sampleQuestion.images || []
      }
    })
    console.log('✅ Sample question imported:', result.id)

    // Test retrieval
    const retrieved = await prisma.question.findFirst({
      where: { id: result.id }
    })
    console.log('✅ Question retrieved successfully')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseImport() 