const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;

const Headers = () => {
  return {
    token: `Bearer ${BearerToken()}`,
  };
};

const FormDataHeaders = () => {
  return {
    token: `Bearer ${BearerToken()}`,
  };
};

// Get all blogs with pagination and filters
export const getAllBlogs = async (page = 1, limit = 10, search = '', status = '', category = '', featured = '') => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      search,
      status,
      category,
      featured
    });

    let responseData = await fetch(`${apiURL}/api/blogs/admin/blogs?${queryParams}`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blogs" };
  }
};

// Get single blog by ID
export const getBlogById = async (blogId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/blogs/admin/blogs/${blogId}`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blog" };
  }
};

// Create new blog
export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();

    // Append all blog data to FormData
    Object.keys(blogData).forEach(key => {
      if (key === 'featuredImage' && blogData[key]) {
        formData.append('featuredImage', blogData[key]);
      } else if (blogData[key] !== null && blogData[key] !== undefined) {
        formData.append(key, blogData[key]);
      }
    });

    let responseData = await fetch(`${apiURL}/api/blogs/admin/blogs`, {
      method: "POST",
      headers: FormDataHeaders(),
      body: formData,
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to create blog" };
  }
};

// Update blog
export const updateBlog = async (blogId, blogData) => {
  try {
    const formData = new FormData();

    // Append all blog data to FormData
    Object.keys(blogData).forEach(key => {
      if (key === 'featuredImage' && blogData[key] && typeof blogData[key] === 'object') {
        formData.append('featuredImage', blogData[key]);
      } else if (blogData[key] !== null && blogData[key] !== undefined) {
        formData.append(key, blogData[key]);
      }
    });

    let responseData = await fetch(`${apiURL}/api/blogs/admin/blogs/${blogId}`, {
      method: "PUT",
      headers: FormDataHeaders(),
      body: formData,
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to update blog" };
  }
};

// Delete blog
export const deleteBlog = async (blogId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/blogs/admin/blogs/${blogId}`, {
      method: "DELETE",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete blog" };
  }
};

// Get blog statistics
export const getBlogStatistics = async () => {
  try {
    let responseData = await fetch(`${apiURL}/api/blogs/admin/statistics`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blog statistics" };
  }
};
