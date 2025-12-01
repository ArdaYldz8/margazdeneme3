import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearData() {
    await prisma.dealer.deleteMany({});
    console.log('All dealers deleted.');
}

clearData()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
