import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const COUNTRY_NAME = [
    "Danmark",
    "Deutschland",
    "Sverige",
    "UK",
    "Français",
    "Norway",
];

const GENDER = [
    "Male",
    "Female",
    "Other"
]




async function main() {
    Promise.all(COUNTRY_NAME.map(n => prisma.country.create({ data: { contry_name: n } })));
    Promise.all(GENDER.map(n => prisma.gender.create({ data: { gender_name: n } })));
    console.log("Done seeding database");
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
