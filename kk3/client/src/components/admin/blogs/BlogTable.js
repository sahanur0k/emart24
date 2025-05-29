import React, { Fragment, useContext } from "react";
import { BlogContext } from "./index";
import moment from "moment";

const BlogTable = () => {
  const { data, dispatch } = useContext(BlogContext);

  const getStatusBadge = (status) => {
    const statusClasses = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || statusClasses.draft}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      Technology: "bg-blue-100 text-blue-800",
      Business: "bg-purple-100 text-purple-800",
      Lifestyle: "bg-pink-100 text-pink-800",
      Health: "bg-green-100 text-green-800",
      Travel: "bg-indigo-100 text-indigo-800",
      Food: "bg-orange-100 text-orange-800",
      Fashion: "bg-red-100 text-red-800",
      Sports: "bg-yellow-100 text-yellow-800",
      Entertainment: "bg-purple-100 text-purple-800",
      Education: "bg-blue-100 text-blue-800",
      News: "bg-gray-100 text-gray-800",
      Other: "bg-gray-100 text-gray-800",
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[category] || categoryColors.Other}`}>
        {category}
      </span>
    );
  };

  const handleEdit = (blog) => {
    dispatch({
      type: "editBlogModalToggle",
      payload: true,
      blog: blog,
    });
  };

  const handleDelete = (blog) => {
    dispatch({
      type: "deleteModalToggle",
      payload: true,
      blog: blog,
    });
  };

  const handlePageChange = (newPage) => {
    dispatch({ type: "setCurrentPage", payload: newPage });
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  if (data.loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          <span className="ml-3 text-gray-600">Loading blogs...</span>
        </div>
      </div>
    );
  }

  if (!data.blogs || data.blogs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blogs Found</h3>
          <p className="text-gray-500 mb-4">
            {data.searchTerm || data.statusFilter || data.categoryFilter || data.featuredFilter
              ? "No blogs match your current filters. Try adjusting your search criteria."
              : "You haven't created any blogs yet. Click the 'Add New Blog' button to get started."}
          </p>
          <button
            onClick={() => dispatch({ type: "addBlogModalToggle", payload: true })}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Create Your First Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      {blog.featuredImage && (
                        <img
                          src={`http://localhost:8000${blog.featuredImage}`}
                          alt={blog.title}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">{blog.title}</h3>
                          {blog.featured && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{truncateText(blog.excerpt)}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-400">
                          <span>By {blog.author?.name || 'Unknown'}</span>
                          <span className="mx-2">•</span>
                          <span>{blog.readingTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {getCategoryBadge(blog.category)}
                      {getStatusBadge(blog.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {blog.views || 0} views
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {blog.likes || 0} likes
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      <div>Created: {moment(blog.createdAt).format('MMM DD, YYYY')}</div>
                      {blog.publishedAt && (
                        <div>Published: {moment(blog.publishedAt).format('MMM DD, YYYY')}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                        title="Edit Blog"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(blog)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete Blog"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(data.currentPage - 1)}
                  disabled={data.currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(data.currentPage + 1)}
                  disabled={data.currentPage === data.totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{data.currentPage}</span> of{' '}
                    <span className="font-medium">{data.totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => handlePageChange(data.currentPage - 1)}
                      disabled={data.currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {[...Array(data.totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === data.currentPage
                              ? 'z-10 bg-gray-800 border-gray-800 text-white'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handlePageChange(data.currentPage + 1)}
                      disabled={data.currentPage === data.totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BlogTable;
