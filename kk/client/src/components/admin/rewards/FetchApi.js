const apiURL = process.env.REACT_APP_API_URL;

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