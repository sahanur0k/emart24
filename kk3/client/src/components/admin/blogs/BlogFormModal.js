import React, { Fragment, useContext, useState, useEffect } from "react";
import { BlogContext } from "./index";
import { createNewBlog, updateExistingBlog } from "./Action";

const BlogFormModal = () => {
  const { data, dispatch } = useContext(BlogContext);
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const isEditMode = data.editBlogModal && data.blogToEdit;

  useEffect(() => {
    if (isEditMode && data.blogToEdit) {
      // Set image preview for existing blog
      if (data.blogToEdit.featuredImage) {
        setImagePreview(`http://localhost:8000${data.blogToEdit.featuredImage}`);
      }
    } else {
      setImagePreview(null);
      setFeaturedImage(null);
    }
  }, [isEditMode, data.blogToEdit]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: "setBlogFormData",
      name: name,
      value: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
    document.getElementById('featuredImage').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        ...data.blogFormData,
        featuredImage: featuredImage,
      };

      let result;
      if (isEditMode) {
        result = await updateExistingBlog(dispatch, data.blogToEdit._id, formData);
      } else {
        result = await createNewBlog(dispatch, formData);
      }

      if (result.success) {
        closeModal();
        // You can add a success notification here
        console.log(result.message);
      } else {
        // You can add an error notification here
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (isEditMode) {
      dispatch({ type: "editBlogModalToggle", payload: false });
    } else {
      dispatch({ type: "addBlogModalToggle", payload: false });
    }
    dispatch({ type: "resetBlogFormData" });
    setFeaturedImage(null);
    setImagePreview(null);
  };

  if (!data.addBlogModal && !data.editBlogModal) {
    return null;
  }

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={data.blogFormData.title || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    name="excerpt"
                    value={data.blogFormData.excerpt || ""}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Brief description of the blog post"
                  />
                </div>

                {/* Category and Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={data.blogFormData.category || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={data.blogFormData.status || "draft"}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={data.blogFormData.tags || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  {imagePreview && (
                    <div className="mt-3 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={data.blogFormData.featured || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                      Mark as featured blog
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowComments"
                      name="allowComments"
                      checked={data.blogFormData.allowComments !== false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowComments" className="ml-2 block text-sm text-gray-700">
                      Allow comments
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={data.blogFormData.content || ""}
                    onChange={handleInputChange}
                    required
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Write your blog content here..."
                  />
                </div>

                {/* SEO Meta */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">SEO Settings</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={data.blogFormData.metaTitle || ""}
                      onChange={handleInputChange}
                      maxLength={60}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="SEO title (max 60 characters)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={data.blogFormData.metaDescription || ""}
                      onChange={handleInputChange}
                      maxLength={160}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="SEO description (max 160 characters)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? "Saving..." : (isEditMode ? "Update Blog" : "Create Blog")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogFormModal;
