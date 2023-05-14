import fs from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  try {
    const portfolioData = join(process.cwd(), '/data/portfolio.json');
    if (process.env.NODE_ENV === 'development') {
      fs.writeFileSync(portfolioData, JSON.stringify(body), 'utf-8', err =>
        console.log(err)
      );
    } else {
      return NextResponse.json({
        name: 'This route works in development mode only',
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'ERROR' });
  }
}
