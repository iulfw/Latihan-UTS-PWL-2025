import prisma from '@/lib/prisma';
export async function GET() {
    const data = await prisma.matkul.findMany({
    orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { kode, nama } = await request.json();
    if (!kode || !nama) {
        return new Response(JSON.stringify({ error: 'All Fields Are Required' }), {
            status: 400,
        });
    }
    const matkul = await prisma.matkul.create({
        data: { kode, nama },
    });
    return new Response(JSON.stringify(matkul), { status: 201 });
}

export async function PUT(request) {
    const { id, kode, nama } = await request.json();
    if (!id || !kode || !nama) return Response.json({ error: 'Field is Empty' }, { 
        status: 400 });
    const matkul = await prisma.matkul.update({
        where: { id },
        data: { kode, nama },
    });
    return Response.json(matkul);
}  