import fs from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const deleteFile = join(process.cwd(), `app/_posts/${slug}.md`);
  try {
    if (process.env.NODE_ENV === 'development') {
      fs.unlinkSync(deleteFile);
      return NextResponse.json({ status: 'DONE' });
    } else {
      return NextResponse.json({
        status: 'ERROR',
        message: 'This route works in production mode only',
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'ERROR' });
  }
}
