// app/api/convert/route.js
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('image');
  const format = formData.get('format');

  if (!file || !format) {
    return NextResponse.json({ error: 'Missing file or format' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const convertedBuffer = await sharp(buffer).toFormat(format).toBuffer();

    return new NextResponse(convertedBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${format}`,
        'Content-Disposition': `attachment; filename=converted.${format}`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}
