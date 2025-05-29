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

// Get all insurance clients with pagination and filters
export const getAllInsuranceClients = async (page = 1, limit = 10, search = '', status = '', insuranceType = '') => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      search,
      status,
      insuranceType
    });

    let responseData = await fetch(`${apiURL}/api/admin/insurance-clients/clients?${queryParams}`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch insurance clients" };
  }
};

// Get single insurance client by ID
export const getInsuranceClientById = async (clientId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/admin/insurance-clients/clients/${clientId}`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch insurance client" };
  }
};

// Create new insurance client
export const createInsuranceClient = async (clientData) => {
  try {
    let responseData = await fetch(`${apiURL}/api/admin/insurance-clients/clients`, {
      method: "POST",
      headers: Headers(),
      body: JSON.stringify(clientData),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to create insurance client" };
  }
};

// Update insurance client
export const updateInsuranceClient = async (clientId, clientData) => {
  try {
    let responseData = await fetch(`${apiURL}/api/admin/insurance-clients/clients/${clientId}`, {
      method: "PUT",
      headers: Headers(),
      body: JSON.stringify(clientData),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to update insurance client" };
  }
};

// Delete insurance client
export const deleteInsuranceClient = async (clientId) => {
  try {
    let responseData = await fetch(`${apiURL}/api/admin/insurance-clients/clients/${clientId}`, {
      method: "DELETE",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete insurance client" };
  }
};

// Get insurance statistics
export const getInsuranceStatistics = async () => {
  try {
    let responseData = await fetch(`${apiURL}/api/admin/insurance-clients/statistics`, {
      method: "GET",
      headers: Headers(),
    });
    responseData = await responseData.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch insurance statistics" };
  }
};

// Export insurance clients to PDF
export const exportInsuranceClientsPDF = async (search = '', status = '', insuranceType = '') => {
  try {
    const queryParams = new URLSearchParams({
      search,
      status,
      insuranceType
    });

    const response = await fetch(`${apiURL}/api/admin/insurance-clients/export/pdf?${queryParams}`, {
      method: "GET",
      headers: {
        token: `Bearer ${BearerToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to export PDF');
    }

    // Create blob from response
    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `insurance-clients-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true, message: "PDF exported successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to export PDF" };
  }
};
