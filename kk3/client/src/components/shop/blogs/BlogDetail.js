import React, { Fragment, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../layout";
import { LayoutContext } from "../layout";
import { BlogsContext } from "./BlogsContext";
import { blogsState, blogsReducer } from "./BlogsContext";
import { getBlogById } from "./FetchApi";
import LoadingSpinner from "../partials/LoadingSpinner";
import moment from "moment";

const BlogDetailComponent = () => {
  const { id } = useParams();
  const { data, dispatch } = useContext(BlogsContext);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      const response = await getBlogById(id);
      if (response.error) {
        dispatch({ type: "setError", payload: response.error });
      } else {
        dispatch({ type: "setBlog", payload: response.blog });
      }
    } catch (error) {
      dispatch({ type: "setError", payload: "Failed to fetch blog" });
    }
  };

  const formatDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Layout>
        <div className="flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Back Button */}
            <div className="mb-4 sm:mb-6">
              <Link
                to="/blog"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm sm:text-base"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blogs
              </Link>
            </div>

            {/* Loading State */}
            {data.loading && (
              <div className="flex justify-center items-center py-16 sm:py-20">
                <LoadingSpinner size="large" text="Loading blog..." />
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

            {/* Blog Content */}
            {!data.loading && !data.error && data.selectedBlog && (
              <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Blog Header */}
                <header className="p-4 sm:p-6 lg:p-8 border-b border-gray-200">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                    {data.selectedBlog.title}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-xs sm:text-sm space-y-2 sm:space-y-0 sm:space-x-4">
                    <span>{formatDate(data.selectedBlog.createdAt)}</span>
                    {data.selectedBlog.author && data.selectedBlog.author.name && (
                      <span>By {data.selectedBlog.author.name}</span>
                    )}
                    {data.selectedBlog.category && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        {data.selectedBlog.category}
                      </span>
                    )}
                  </div>
                </header>

                {/* Blog Image */}
                {data.selectedBlog.featuredImage && (
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${data.selectedBlog.featuredImage}`}
                      alt={data.selectedBlog.title}
                      className="w-full h-48 sm:h-64 lg:h-96 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base lg:text-lg">
                      {data.selectedBlog.content}
                    </div>
                  </div>
                </div>

                {/* Blog Footer */}
                <footer className="p-4 sm:p-6 lg:p-8 pt-6 sm:pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <Link
                      to="/blog"
                      className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded transition-colors duration-200 text-sm sm:text-base"
                    >
                      View More Blogs
                    </Link>
                  </div>
                </footer>
              </article>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

const BlogDetail = () => {
  const { data: layoutData } = useContext(LayoutContext);
  const [data, dispatch] = React.useReducer(blogsReducer, blogsState);

  return (
    <Fragment>
      <BlogsContext.Provider value={{ data, dispatch }}>
        <BlogDetailComponent />
      </BlogsContext.Provider>
    </Fragment>
  );
};

export default BlogDetail;
