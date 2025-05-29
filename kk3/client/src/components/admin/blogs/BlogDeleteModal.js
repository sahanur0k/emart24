import React, { Fragment, useContext, useState } from "react";
import { BlogContext } from "./index";
import { deleteExistingBlog } from "./Action";

const BlogDeleteModal = () => {
  const { data, dispatch } = useContext(BlogContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!data.blogToDelete) return;

    setLoading(true);
    try {
      const result = await deleteExistingBlog(dispatch, data.blogToDelete._id);
      
      if (result.success) {
        // You can add a success notification here
        console.log(result.message);
      } else {
        // You can add an error notification here
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    dispatch({ type: "deleteModalToggle", payload: false });
  };

  if (!data.deleteModal || !data.blogToDelete) {
    return null;
  }

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Delete Blog Post</h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete the blog post{" "}
                <span className="font-semibold">"{data.blogToDelete.title}"</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This will permanently remove the blog post and all associated data including
                any featured images.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "Deleting..." : "Delete Blog"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogDeleteModal;
