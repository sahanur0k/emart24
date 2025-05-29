import React, { Fragment, useContext, useEffect } from "react";
import { BlogsContext } from "./BlogsContext";
import { getAllBlogs } from "./FetchApi";
import BlogCard from "./BlogCard";
import LoadingSpinner from "../partials/LoadingSpinner";

const AllBlogs = () => {
  const { data, dispatch } = useContext(BlogsContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      const response = await getAllBlogs();
      if (response.error) {
        dispatch({ type: "setError", payload: response.error });
      } else {
        dispatch({ type: "setBlogs", payload: response.blogs || [] });
      }
    } catch (error) {
      dispatch({ type: "setError", payload: "Failed to fetch blogs" });
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              EMART24 Blog
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Stay updated with the latest news, tips, and insights from EMART24
            </p>
          </div>

          {/* Loading State */}
          {data.loading && (
            <div className="flex justify-center items-center py-16 sm:py-20">
              <LoadingSpinner size="large" text="Loading blogs..." />
            </div>
          )}

          {/* Error State */}
          {data.error && (
            <div className="text-center py-16 sm:py-20">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
                {data.error}
              </div>
            </div>
          )}

          {/* Blogs Grid */}
          {!data.loading && !data.error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {data.blogs && data.blogs.length > 0 ? (
                data.blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))
              ) : (
                <div className="col-span-full text-center py-16 sm:py-20">
                  <div className="text-gray-500 text-base sm:text-lg">
                    No blogs available at the moment.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AllBlogs;
