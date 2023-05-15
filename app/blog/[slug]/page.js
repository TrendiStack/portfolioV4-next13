'use client';
import Image from 'next/image';

import Header from '../../components/Header';
import ContentSection from '../../components/ContentSection';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import BlogEditor from '../../components/BlogEditor';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useIsomorphicLayoutEffect } from '@/utils';
import data from '@/data/portfolio.json';
import { stagger } from '@/app/animations';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const { slug } = useParams();
  const textOne = useRef();
  const textTwo = useRef();
  const router = useRouter();

  const getPostBySlug = async slug => {
    try {
      const res = await axios.get('/api/blog/get_post', {
        params: { slug },
      });
      setPost(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostBySlug(slug);
  }, [slug, post]);

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  }, []);

  return (
    <>
      <div
        className={`container mx-auto mt-10 ${
          data.showCursor && 'cursor-none'
        }`}
      >
        <Header isBlog={true} />
        <div className="mt-10 flex flex-col">
          <Image
            className="w-full h-96 rounded-lg shadow-lg object-cover"
            src={post?.image}
            alt={post?.title}
            width={500}
            height={500}
          />
          <h1
            ref={textOne}
            className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
          >
            {post?.title}
          </h1>
          <h2
            ref={textTwo}
            className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
          >
            {post?.tagline}
          </h2>
        </div>
        <ContentSection content={post?.content}></ContentSection>
        <Footer />
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setShowEditor(true)} type={'primary'}>
            Edit this blog
          </Button>
        </div>
      )}

      {showEditor && (
        <BlogEditor
          post={post}
          close={() => setShowEditor(false)}
          refresh={() => router.refresh()}
        />
      )}
    </>
  );
};

export default BlogPost;
