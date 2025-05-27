const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const rewardList = async () => {
  try {
    const response = await fetch(`${apiURL}/api/rewards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateRewardStatus = async (rewardId, status) => {
  try {
    const response = await fetch(`${apiURL}/api/rewards/${rewardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const getAllUsersWithSuperCoins = async () => {
  try {
    const response = await fetch(`${apiURL}/api/admin/users-super-coins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};