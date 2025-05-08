import React from "react";
import type { BlogCardItem } from "../../types/BlogCardItem";

const BlogCard: React.FC<{ post: BlogCardItem }> = ({ post }) => {
  return (
    <div
      className={`flex flex-col bg-white rounded-xl shadow-md overflow-hidden w-full min-h-[500px] transition-transform duration-300 ${
        post.status === "inactive" ? "opacity-50" : "hover:scale-105"
      }`}
      onClick={() => console.log(`Editing blog: ${post.title}`)} // ✅ Vẫn có thể bấm để vào edit
    >
      {/* Hình ảnh với padding trên 16px, dưới 8px, border-radius 4px */}
      <div className="pt-4 px-4 pb-2">
        <img
          loading="lazy"
          src={post.imageUrl}
          alt="Blog post cover"
          className="w-full h-[200px] object-cover rounded-md"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
        <span className="text-sm text-gray-400 mt-2">Date: {post.date}</span>
        <div className="mt-auto flex justify-between items-center">
          <button
            className="text-blue-500 border border-blue-500 px-3 py-1 rounded-md hover:bg-blue-100"
          >
            READ MORE
          </button>
          <img
            src={post.authorImageUrl}
            alt="Author"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
