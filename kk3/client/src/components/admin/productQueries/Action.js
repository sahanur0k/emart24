import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// Employee: Create a new product query
export const createProductQuery = async (queryData) => {
  try {
    let token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    
    const response = await axios.post(
      `${apiURL}/api/product-queries/create`,
      queryData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product query:", error);
    return { error: error.response?.data?.error || "Failed to create query" };
  }
};

// Employee: Get queries created by the logged-in employee
export const getEmployeeQueries = async () => {
  try {
    let token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    
    const response = await axios.get(
      `${apiURL}/api/product-queries/employee`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employee queries:", error);
    return { error: error.response?.data?.error || "Failed to fetch queries" };
  }
};

// Admin: Get all product queries with filters
export const getAllQueries = async (filters = {}) => {
  try {
    let token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(
      `${apiURL}/api/product-queries/all?${queryParams}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all queries:", error);
    return { error: error.response?.data?.error || "Failed to fetch queries" };
  }
};

// Admin: Update query status and add notes
export const updateQueryStatus = async (queryId, updateData) => {
  try {
    let token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    
    const response = await axios.put(
      `${apiURL}/api/product-queries/${queryId}`,
      updateData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating query:", error);
    return { error: error.response?.data?.error || "Failed to update query" };
  }
};

// Admin: Delete a query
export const deleteQuery = async (queryId) => {
  try {
    let token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    
    const response = await axios.delete(
      `${apiURL}/api/product-queries/${queryId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting query:", error);
    return { error: error.response?.data?.error || "Failed to delete query" };
  }
};

// Get query statistics
export const getQueryStatistics = async () => {
  try {
    let token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    
    const response = await axios.get(
      `${apiURL}/api/product-queries/statistics`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return { error: error.response?.data?.error || "Failed to fetch statistics" };
  }
};
