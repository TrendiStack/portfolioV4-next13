import { join } from 'path';
import { NextResponse } from 'next/server';
import fs from 'fs';
import matter from 'gray-matter';

export async function GET(req) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const postsDirectory = join(process.cwd(), 'app/_posts');
      const slugs = fs.readdirSync(postsDirectory);
      const posts = slugs.map(slug => {
        const realSlug = slug.replace(/\.md$/, '');
        const fullPath = join(postsDirectory, `${realSlug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug: realSlug,
          title: data.title,
          image: data.image,
          preview: data.preview,
          author: data.author,
          date: data.date,
          content,
        };
      });

      return NextResponse.json(posts);
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
