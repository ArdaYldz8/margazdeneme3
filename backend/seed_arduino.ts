import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const arduinoDealer = await prisma.dealer.upsert({
        where: { licenseNo: 'ARDUINO_001' },
        update: {},
        create: {
            licenseNo: 'ARDUINO_001',
            title: 'Arduino Tank',
            city: 'Ofis',
            district: 'Laboratuvar',
            address: 'USB Bağlantısı',
            status: 'Aktif',
            tankLevel: 0,
        },
    });

    console.log('Arduino Tank created/verified:', arduinoDealer);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
