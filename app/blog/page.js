'use client';

import { useIsomorphicLayoutEffect } from '@/utils';
import { stagger } from '../animations';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

import data from '@/data/portfolio.json';
import Header from '../components/Header';
import Posts from '../components/Posts';
import axios from 'axios';

const Blog = () => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: 'scale(0.95) skew(10deg)' },
      { y: 0, x: 0, transform: 'scale(1)' }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push('/');
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createBlog = () => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const res = axios.post('/api/blog/add_post');

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('This thing only works in development mode.');
    }
  };

  const deleteBlog = async slug => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const res = await axios.delete(`/api/blog/delete_post?slug=${slug}`);

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('This thing only works in development mode.');
    }
  };
  return (
    showBlog.current && (
      <>
        <div
          className={`container mx-auto mb-10 ${
            data.showCursor && 'cursor-none'
          }`}
        >
          <Header isBlog={true} />
          <div className="mt-10">
            <h1
              ref={text}
              className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
            >
              Blog.
            </h1>
            <Posts mounted={mounted} deleteBlog={deleteBlog} />
          </div>
        </div>
        {process.env.NODE_ENV === 'development' && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createBlog} type={'primary'}>
              Add New Post +{' '}
            </Button>
          </div>
        )}
      </>
    )
  );
};
export default Blog;
