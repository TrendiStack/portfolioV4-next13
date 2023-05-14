import { ISOToDate } from '@/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '../Button';
import Image from 'next/image';

const Posts = ({ mounted, deleteBlog }) => {
  const [posts, setPosts] = useState(null);
  const router = useRouter();
  const getPosts = async () => {
    const res = await axios.get('/api/blog/get_posts');
    setPosts(res.data);
    console.log(res.data);
  };

  const handleRouter = slug => {
    window.scrollTo(0, 0);
    router.push(`/blog/${slug}`);
  };

  useEffect(() => {
    getPosts();
  }, [posts]);

  return (
    <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
      {posts &&
        posts.map(post => (
          <div
            className="cursor-pointer relative"
            key={post.slug}
            onClick={() => handleRouter(post.slug)}
          >
            <Image
              className="w-full h-60 rounded-lg shadow-lg object-cover"
              src={post.image}
              alt={post.title}
              width={500}
              height={500}
            />
            <h2 className="mt-5 text-4xl">{post.title}</h2>
            <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
            <span className="text-sm mt-5 opacity-25">
              {ISOToDate(post.date)}
            </span>
            {process.env.NODE_ENV === 'development' && mounted && (
              <div className="absolute top-0 right-0">
                <Button
                  onClick={e => {
                    deleteBlog(post.slug);
                    e.stopPropagation();
                  }}
                  type={'primary'}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Posts;
