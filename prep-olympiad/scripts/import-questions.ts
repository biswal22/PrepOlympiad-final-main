import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  const rawData = fs.readFileSync(
    path.join(__dirname, '../parsed_questions.json'),
    'utf-8'
  )
  const { questions } = JSON.parse(rawData)

  console.log(`Importing ${questions.length} questions...`)

  for (const question of questions) {
    await prisma.question.create({
      data: {
        title: question.content.substring(0, 100),
        content: question.content,
        choices: question.choices || [],
        correctAnswer: question.correctAnswer || "",
        solution: question.solution || "",
        difficulty: question.difficulty || "Medium",
        category: question.category || "General",
        subject: question.subject || "mathematics",
        images: question.images || []
      },
    })
  }

  console.log('Import complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 