'use client'
import { useEffect, useState } from 'react';
import client; // Adjust the import path as necessary
import Link from 'next/link';
import Markdown from 'react-markdown';
import { GoArrowUpRight } from 'react-icons/go';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Interface for the blog post fields
interface BlogPostFields {
  title: string;
  category: string;
  category_2: string;
  category_3: string;
  description: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

interface BlogPost {
  sys: {
    id: string;
  };
  fields: BlogPostFields;
}

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostComponent = ({ post }: BlogPostProps) => {
  return (
    <div className="rounded-lg p-5 relative bg-gray-100">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={
            post?.fields?.image?.fields?.file?.url || '/placeholder-image.jpg'
          }
          alt={post?.fields?.title || 'No title available'}
          className="rounded-lg h-60 w-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/40 backdrop-brightness-100"></div>
      </div>

      <h3 className="text-xl flex justify-between h-10 py-1 line-clamp-2 my-2 mb-2 font-semibold">
        {post.fields.title}
        <GoArrowUpRight className="my-2" />
      </h3>

      <Markdown className="line-clamp-4 h-24 mb-8 text-gray-600">
        {post.fields.description}
      </Markdown>

      <div className="space-x-2 flex items-center">
        {post.fields.category && (
          <h3 className="font-bold border border-black inline-flex items-center justify-center px-2 py-1 rounded-full h-7 text-sm text-gray-900 bg-green-200">
            {post.fields.category}
          </h3>
        )}
        {post.fields.category_2 && (
          <h3 className="font-bold border border-black inline-flex items-center justify-center px-2 py-1 rounded-full h-7 text-sm text-gray-900 bg-green-200">
            {post.fields.category_2}
          </h3>
        )}
        {post.fields.category_3 && (
          <h3 className="font-bold border border-black inline-flex items-center justify-center px-2 py-1 rounded-full h-7 text-sm text-gray-900 bg-green-200">
            {post.fields.category_3}
          </h3>
        )}
      </div>
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const postsPerPage = 6;

  const categories = ['Nature', 'Adventure', 'All']; // Add more categories as needed

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await client.getEntries({ content_type: 'blogPost' });
        setPosts(res.items as unknown as BlogPost[]);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter posts by search term and selected category
  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.fields.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === 'All' || // Show all if 'All' is selected
      [post.fields.category, post.fields.category_2, post.fields.category_3]
        .map((cat) => cat?.toLowerCase())
        .includes(selectedCategory.toLowerCase());
    return titleMatch && categoryMatch;
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 px-20 w-full pt-0 h-[1100px] justify-end">
      {/* Search and Category Filter */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-80"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[980px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <Link
                key={post.sys.id}
                href={`./dashboard/cms/contentful/${post.sys.id}`}
              >
                <BlogPostComponent post={post} />
              </Link>
            ))
          ) : (
            <div>No posts found matching your criteria.</div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center space-x-2 w-full justify-between mt-10 mx-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 flex items-center rounded-full ${
              currentPage === 1
                ? 'bg-gray-0 cursor-not-allowed'
                : 'bg-gray-00 text-gray-600'
            }`}
          >
            <FaArrowLeft className="mr-2 text-sm" /> Before
          </button>

          <div className="flex justify-center w-full mt-0">
            <span className="px-4 py-2 text-green-900/80">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 flex items-center rounded-full ${
              currentPage === totalPages
                ? 'bg-gray-00 cursor-not-allowed'
                : 'bg-gray-00 text-gray-600'
            }`}
          >
            After <FaArrowRight className="ml-2 text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
