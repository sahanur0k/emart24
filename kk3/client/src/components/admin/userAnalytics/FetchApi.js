import axios from "axios";
const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;

const Headers = () => {
  return {
    "Content-Type": "application/json",
    token: `Bearer ${BearerToken()}`,
  };
};

export const getUserAnalytics = async () => {
  try {
    // Add timestamp to prevent caching
    let res = await axios.get(`${apiURL}/api/admin/users/analytics?t=${Date.now()}`, {
      headers: Headers()
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response?.data?.error || "Failed to fetch analytics" };
  }
};

export const getUserDetails = async (userId) => {
  try {
    let res = await axios.get(`${apiURL}/api/admin/users/details/${userId}`, {
      headers: Headers()
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response?.data?.error || "Failed to fetch user details" };
  }
};
