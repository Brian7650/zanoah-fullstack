import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className=''>
      <div className='flex flex-col items-center justify-center gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Zanoah</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you will find a variety of articles on Gaming, Tech, Arts, Comics and other related topics.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-sky-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      

      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 item-center justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-sky-500 hover:underline text-center'
            >
              View all posts 
            </Link>
            <ScrollToTop/>
          </div>
        )}
       
      </div>
    </div>
  );
}
