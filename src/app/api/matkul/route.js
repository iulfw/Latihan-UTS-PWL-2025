import prisma from '@/lib/prisma';
export async function GET() {
    const data = await prisma.matkul.findMany({
    orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}