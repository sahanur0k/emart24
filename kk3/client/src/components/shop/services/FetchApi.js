const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const getAllServices = async () => {
  try {
    let responseData = await fetch(`${apiURL}/api/service/all-services`, {
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

export const getServicesByCategory = async (categoryId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/service/services-by-category/${categoryId}`, {
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

export const getServiceById = async (serviceId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/service/service/${serviceId}`, {
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

export const getAllCategories = async () => {
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
