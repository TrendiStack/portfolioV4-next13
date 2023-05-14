import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getRandomImage } from '@/utils/getRandomImage';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const postsfolder = join(process.cwd(), `app/_posts/${uuidv4()}.md`);
      const data = matter.stringify('# New Blog', {
        date: new Date().toISOString(),
        title: 'New Blog',
        tagline: 'Amazing New Blog',
        preview:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: getRandomImage(),
      });
      fs.writeFileSync(postsfolder, data, err => console.error(err));
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
