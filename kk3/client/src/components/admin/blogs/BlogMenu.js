import React, { Fragment, useContext } from "react";
import { BlogContext } from "./index";

const BlogMenu = () => {
  const { data, dispatch } = useContext(BlogContext);

  const handleSearchChange = (e) => {
    dispatch({ type: "setSearchTerm", payload: e.target.value });
  };

  const handleStatusFilter = (e) => {
    dispatch({ type: "setStatusFilter", payload: e.target.value });
  };

  const handleCategoryFilter = (e) => {
    dispatch({ type: "setCategoryFilter", payload: e.target.value });
  };

  const handleFeaturedFilter = (e) => {
    dispatch({ type: "setFeaturedFilter", payload: e.target.value });
  };

  const clearFilters = () => {
    dispatch({ type: "setSearchTerm", payload: "" });
    dispatch({ type: "setStatusFilter", payload: "" });
    dispatch({ type: "setCategoryFilter", payload: "" });
    dispatch({ type: "setFeaturedFilter", payload: "" });
  };

  return (
    <Fragment>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b">
          <div className="flex items-center mb-4 md:mb-0">
            <svg
              className="w-8 h-8 text-gray-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
              <p className="text-gray-600">Create and manage blog posts</p>
            </div>
          </div>
          <button
            onClick={() => dispatch({ type: "addBlogModalToggle", payload: true })}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Blog
          </button>
        </div>

        {/* Filters Section */}
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Blogs
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by title, content, or tags..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={data.statusFilter}
                onChange={handleStatusFilter}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={data.categoryFilter}
                onChange={handleCategoryFilter}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fashion">Fashion</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="News">News</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Featured Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured
              </label>
              <select
                value={data.featuredFilter}
                onChange={handleFeaturedFilter}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">All Blogs</option>
                <option value="true">Featured Only</option>
                <option value="false">Non-Featured</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(data.searchTerm || data.statusFilter || data.categoryFilter || data.featuredFilter) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Statistics */}
        {data.statistics && (
          <div className="p-4 border-t bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{data.statistics.totalBlogs}</div>
                <div className="text-sm text-gray-600">Total Blogs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.statistics.publishedBlogs}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{data.statistics.draftBlogs}</div>
                <div className="text-sm text-gray-600">Drafts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.statistics.featuredBlogs}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BlogMenu;
