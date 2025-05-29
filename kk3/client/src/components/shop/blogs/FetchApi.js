import axios from "axios";

const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const getAllBlogs = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/blogs`);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blogs" };
  }
};

export const getBlogById = async (id) => {
  try {
    let res = await axios.get(`${apiURL}/api/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blog" };
  }
};
