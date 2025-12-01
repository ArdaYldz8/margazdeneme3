import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        console.log('Clearing Dealer table...');
        const { count } = await prisma.dealer.deleteMany({});
        console.log(`Deleted ${count} records.`);
    } catch (error) {
        console.error('Error clearing database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
