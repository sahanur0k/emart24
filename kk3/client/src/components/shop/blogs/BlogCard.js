import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const BlogCard = ({ blog }) => {
  const formatDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Blog Image */}
      {blog.featuredImage && (
        <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden flex-shrink-0">
          <img
            src={`http://localhost:8000${blog.featuredImage}`}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        {/* Date and Category */}
        <div className="flex flex-wrap items-center justify-between mb-2 text-xs sm:text-sm text-gray-500">
          <span>{formatDate(blog.createdAt)}</span>
          {blog.category && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
              {blog.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 line-clamp-2 flex-shrink-0">
          {blog.title}
        </h3>

        {/* Content Preview */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-grow">
          {blog.excerpt || truncateContent(blog.content)}
        </p>

        {/* Author and Read More */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mt-auto">
          {blog.author && blog.author.name && (
            <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              By {blog.author.name}
            </div>
          )}

          {/* Read More Button */}
          <Link
            to={`/blog/${blog._id}`}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-3 sm:px-4 rounded transition-colors duration-200 text-sm sm:text-base text-center order-1 sm:order-2"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
