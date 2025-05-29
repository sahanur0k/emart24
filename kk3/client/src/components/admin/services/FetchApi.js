const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;

const Headers = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: `Bearer ${BearerToken()}`,
  };
};

export const getAllServices = async () => {
  try {
    let responseData = await fetch(`${apiURL}/api/service/admin/all-services`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (formData) => {
  try {
    let responseData = await fetch(`${apiURL}/api/service/admin/create-service`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        token: `Bearer ${BearerToken()}`,
      },
      body: formData,
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const editService = async (serviceId, formData) => {
  try {
    let responseData = await fetch(`${apiURL}/api/service/admin/update-service/${serviceId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        token: `Bearer ${BearerToken()}`,
      },
      body: formData,
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (serviceId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/service/admin/delete-service/${serviceId}`, {
      method: "DELETE",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

// Get all categories (for dropdown)
export const getAllCategory = async () => {
  try {
    let responseData = await fetch(`${apiURL}/api/category/all-category`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
