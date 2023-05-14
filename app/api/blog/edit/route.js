import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const postsfolder = join(process.cwd(), `app/_posts/`);
  try {
    if (process.env.NODE_ENV === 'development') {
      const { slug, content } = body;
      const { date, title, tagline, preview, image } = body.variables;
      fs.writeFile(
        postsfolder + slug + '.md',
        matter.stringify(content, {
          date,
          title,
          tagline,
          preview,
          image,
        }),
        'utf-8',
        err => console.log(err)
      );
      return NextResponse.json({ status: 'DONE' });
    } else {
      return NextResponse.json({
        status: 'ERROR',
        message: 'This route works in development mode only',
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'ERROR' });
  }
}
