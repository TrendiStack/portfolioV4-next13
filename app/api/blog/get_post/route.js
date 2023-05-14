import { NextResponse } from 'next/server';
import { join } from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  try {
    if (process.env.NODE_ENV === 'development') {
      const postPath = join(process.cwd(), 'app', '_posts', `${slug}.md`);
      const fileContents = fs.readFileSync(postPath, 'utf8');
      const { data, content } = matter(fileContents);

      const post = {
        slug,
        ...data,
        content,
      };
      return NextResponse.json({ message: 'success', post });
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
