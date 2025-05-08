import React, { useEffect, useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogs } from "../../redux/slices/blogSlice";
import type { RootState } from "../../redux/store";

const BlogList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawBlogs, loading, error } = useAppSelector((state: RootState) => state.blogs);

  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const blogs = useMemo(() => rawBlogs.map((b) => ({
    id: b.id,
    title: b.title,
    content: b.content,
    photoUrl: b.photo,
    authorId: b.staff_id,
    status: "chua co trong api data ",
    date: new Date(b.date_added).toLocaleDateString(),
  })), [rawBlogs]);

  const loadMoreBlogs = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleBlogs((prev) => prev + 3);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.slice(0, visibleBlogs).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {blogs.length > 6 && visibleBlogs < blogs.length && (
        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 border border-neutral-300 rounded-md ${
              isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={loadMoreBlogs}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
