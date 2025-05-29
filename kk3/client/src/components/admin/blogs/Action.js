import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogStatistics,
} from "./FetchApi";

// Fetch all blogs with filters
export const fetchAllBlogs = async (dispatch, page = 1, search = '', status = '', category = '', featured = '') => {
  dispatch({ type: "setLoading", payload: true });
  try {
    const responseData = await getAllBlogs(page, 10, search, status, category, featured);
    if (responseData && responseData.success) {
      dispatch({
        type: "setBlogs",
        payload: {
          blogs: responseData.blogs,
          currentPage: parseInt(responseData.currentPage),
          totalPages: responseData.totalPages,
        },
      });
    } else {
      console.error("Failed to fetch blogs:", responseData.error);
      dispatch({ type: "setLoading", payload: false });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    dispatch({ type: "setLoading", payload: false });
  }
};

// Fetch blog statistics
export const fetchBlogStatistics = async (dispatch) => {
  try {
    const responseData = await getBlogStatistics();
    if (responseData && responseData.success) {
      dispatch({ type: "setStatistics", payload: responseData.statistics });
    } else {
      console.error("Failed to fetch blog statistics:", responseData.error);
    }
  } catch (error) {
    console.error("Error fetching blog statistics:", error);
  }
};

// Create new blog
export const createNewBlog = async (dispatch, blogData) => {
  try {
    const responseData = await createBlog(blogData);
    if (responseData && responseData.success) {
      dispatch({ type: "addBlog", payload: responseData.blog });
      return { success: true, message: responseData.message };
    } else {
      return { success: false, error: responseData.error || "Failed to create blog" };
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
};

// Update existing blog
export const updateExistingBlog = async (dispatch, blogId, blogData) => {
  try {
    const responseData = await updateBlog(blogId, blogData);
    if (responseData && responseData.success) {
      dispatch({ type: "updateBlog", payload: responseData.blog });
      return { success: true, message: responseData.message };
    } else {
      return { success: false, error: responseData.error || "Failed to update blog" };
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
};

// Delete blog
export const deleteExistingBlog = async (dispatch, blogId) => {
  try {
    const responseData = await deleteBlog(blogId);
    if (responseData && responseData.success) {
      dispatch({ type: "deleteBlog", payload: blogId });
      return { success: true, message: responseData.message };
    } else {
      return { success: false, error: responseData.error || "Failed to delete blog" };
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
};
