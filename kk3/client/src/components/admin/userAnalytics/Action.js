import { getUserAnalytics, getUserDetails } from "./FetchApi";

export const fetchUserAnalytics = async (dispatch) => {
  dispatch({ type: "setLoading", payload: true });
  try {
    const responseData = await getUserAnalytics();
    if (responseData && responseData.success) {
      dispatch({ type: "setAnalyticsData", payload: responseData.data });
    } else {
      console.error("Failed to fetch analytics:", responseData.error);
      dispatch({ type: "setLoading", payload: false });
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    dispatch({ type: "setLoading", payload: false });
  }
};

export const fetchUserDetails = async (dispatch, userId) => {
  try {
    const responseData = await getUserDetails(userId);
    if (responseData && responseData.success) {
      dispatch({ type: "setUserDetails", payload: responseData.data });
    } else {
      console.error("Failed to fetch user details:", responseData.error);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};
