import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
    const count = await prisma.dealer.count();
    console.log(`Total dealers found: ${count}`);

    if (count > 0) {
        const sample = await prisma.dealer.findFirst();
        console.log('Sample dealer:', sample);
    }
}

checkData()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
