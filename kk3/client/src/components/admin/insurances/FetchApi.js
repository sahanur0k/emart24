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

export const getAllInsurances = async () => {
  try {
    let responseData = await fetch(`${apiURL}/api/insurance/admin/all-insurances`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch insurances" };
  }
};

export const createInsurance = async (formData) => {
  try {
    let responseData = await fetch(`${apiURL}/api/insurance/admin/create-insurance`, {
      method: "POST",
      headers: {
        token: `Bearer ${BearerToken()}`,
      },
      body: formData,
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to create insurance" };
  }
};

export const updateInsurance = async (insuranceId, formData) => {
  try {
    let responseData = await fetch(`${apiURL}/api/insurance/admin/update-insurance/${insuranceId}`, {
      method: "PUT",
      headers: {
        token: `Bearer ${BearerToken()}`,
      },
      body: formData,
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to update insurance" };
  }
};

export const deleteInsurance = async (insuranceId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/insurance/admin/delete-insurance/${insuranceId}`, {
      method: "DELETE",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete insurance" };
  }
};
