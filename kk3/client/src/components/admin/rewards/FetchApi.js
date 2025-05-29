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



export const getAllUsersWithSuperCoins = async () => {
  try {
    const response = await fetch(`${apiURL}/api/admin/users-super-coins`, {
      method: "GET",
      headers: Headers(),
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateUserSuperCoins = async (userId, action, amount) => {
  try {
    const response = await fetch(`${apiURL}/api/admin/update-user-super-coins`, {
      method: "POST",
      headers: Headers(),
      body: JSON.stringify({ userId, action, amount }),
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const createRewardCode = async (code, coins, description, expiryDate) => {
  try {
    const response = await fetch(`${apiURL}/api/admin/reward-codes`, {
      method: "POST",
      headers: Headers(),
      body: JSON.stringify({ code, coins, description, expiryDate }),
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const getAllRewardCodes = async () => {
  try {
    const response = await fetch(`${apiURL}/api/admin/reward-codes`, {
      method: "GET",
      headers: Headers(),
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteRewardCode = async (codeId) => {
  try {
    const response = await fetch(`${apiURL}/api/admin/reward-codes/${codeId}`, {
      method: "DELETE",
      headers: Headers(),
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};