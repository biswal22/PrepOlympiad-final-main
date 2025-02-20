const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // Attempt to connect to the database
    await prisma.$connect()
    console.log('✅ Successfully connected to the database')

    // Try a simple query
    const result = await prisma.$queryRaw`SELECT current_timestamp`
    console.log('✅ Successfully executed a test query:', result)

  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  }) 