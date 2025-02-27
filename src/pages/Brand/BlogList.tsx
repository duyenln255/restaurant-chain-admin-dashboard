import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { BlogCardItem } from "../../types/BlogCardItem";

interface BlogListProps {
  blogPosts: BlogCardItem[];
}

const BlogList: React.FC<BlogListProps> = ({ blogPosts }) => {
  const [visibleBlogs, setVisibleBlogs] = useState(6); // ✅ Ban đầu hiển thị 6 blog
  const [isLoading, setIsLoading] = useState(false); // ✅ Trạng thái loading

  const loadMoreBlogs = () => {
    setIsLoading(true); // ✅ Bật trạng thái loading

    setTimeout(() => {
      setVisibleBlogs((prev) => prev + 3); // ✅ Hiển thị thêm 3 blog sau 1 giây
      setIsLoading(false); // ✅ Tắt trạng thái loading
    }, 1000); // ⏳ Giả lập thời gian chờ 1 giây
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.slice(0, visibleBlogs).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* ✅ Hiển thị nút "Load More" khi có hơn 6 blog */}
      {blogPosts.length > 6 && visibleBlogs < blogPosts.length && (
        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 border rounded-md ${
              isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={loadMoreBlogs}
            disabled={isLoading} // ✅ Không cho click khi đang tải
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
