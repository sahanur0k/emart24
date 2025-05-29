const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const getAllInsurances = async () => {
  try {
    let responseData = await fetch(`${apiURL}/api/insurance/all-insurances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch insurances" };
  }
};

export const getInsurancesByType = async (insuranceType) => {
  try {
    let responseData = await fetch(`${apiURL}/api/insurance/insurances-by-type/${insuranceType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch insurances" };
  }
};

export const getInsuranceById = async (insuranceId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/insurance/insurance/${insuranceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch insurance" };
  }
};
