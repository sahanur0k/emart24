import {
  getUserById,
  updatePersonalInformationFetch,
  getOrderByUser,
  updatePassword,
} from "./FetchApi";

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("cart");
  localStorage.removeItem("wishList");
  window.location.href = "/";
};

// Prevent multiple simultaneous calls
let fetchDataInProgress = false;

export const fetchData = async (dispatch) => {
  if (fetchDataInProgress) {
    console.log("fetchData - Already in progress, skipping");
    return;
  }

  fetchDataInProgress = true;
  console.log("fetchData - Starting user data fetch");
  dispatch({ type: "loading", payload: true });

  const jwt = localStorage.getItem("jwt");
  console.log("fetchData - JWT from localStorage:", jwt);

  let userId = "";
  try {
    if (jwt) {
      const parsedJWT = JSON.parse(jwt);
      console.log("fetchData - Parsed JWT:", parsedJWT);
      userId = parsedJWT?.user?._id || "";
    }
  } catch (error) {
    console.error("fetchData - Error parsing JWT:", error);
  }

  console.log("fetchData - Extracted userId:", userId);

  if (!userId) {
    console.warn("fetchData - No valid user ID found, stopping fetch");
    dispatch({ type: "userDetails", payload: null });
    dispatch({ type: "loading", payload: false });
    fetchDataInProgress = false;
    return;
  }

  try {
    console.log("fetchData - Calling getUserById with userId:", userId);
    let responseData = await getUserById(userId);
    console.log("fetchData - Response from getUserById:", responseData);

    if (responseData && responseData.User) {
      console.log("fetchData - User found, dispatching userDetails:", responseData.User);
      // Use setTimeout to ensure proper state batching
      setTimeout(() => {
        dispatch({ type: "userDetails", payload: responseData.User });
        dispatch({ type: "loading", payload: false });
      }, 0);
    } else {
      // User not found in database - this can happen if JWT exists but user record doesn't
      console.warn("fetchData - User not found in database. User may need to re-register.");
      console.warn("fetchData - Response was:", responseData);
      setTimeout(() => {
        dispatch({ type: "userDetails", payload: null });
        dispatch({ type: "loading", payload: false });
      }, 0);
    }
  } catch (error) {
    console.error("fetchData - Error fetching user data:", error);
    setTimeout(() => {
      dispatch({ type: "userDetails", payload: null });
      dispatch({ type: "loading", payload: false });
    }, 0);
  } finally {
    fetchDataInProgress = false;
  }
};

export const fetchOrderByUser = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let userId = JSON.parse(localStorage.getItem("jwt"))
    ? JSON.parse(localStorage.getItem("jwt")).user._id
    : "";
  try {
    let responseData = await getOrderByUser(userId);
    setTimeout(() => {
      if (responseData && responseData.Order) {
        console.log(responseData);
        dispatch({ type: "OrderByUser", payload: responseData.Order });
        dispatch({ type: "loading", payload: false });
      }
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

export const updatePersonalInformationAction = async (dispatch, fData) => {
  const formData = {
    uId: fData.id,
    name: fData.name,
    phoneNumber: fData.phone,
  };
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await updatePersonalInformationFetch(formData);
    setTimeout(() => {
      if (responseData && responseData.success) {
        dispatch({ type: "loading", payload: false });
        fetchData(dispatch);
      }
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

export const handleChangePassword = async (fData, setFdata, dispatch) => {
  if (!fData.newPassword || !fData.oldPassword || !fData.confirmPassword) {
    setFdata({
      ...fData,
      error: "Please provide your all password and a new password",
    });
  } else if (fData.newPassword !== fData.confirmPassword) {
    setFdata({ ...fData, error: "Password does't match" });
  } else {
    const formData = {
      uId: JSON.parse(localStorage.getItem("jwt")).user._id,
      oldPassword: fData.oldPassword,
      newPassword: fData.newPassword,
    };
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await updatePassword(formData);
      if (responseData && responseData.success) {
        setFdata({
          ...fData,
          success: responseData.success,
          error: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        dispatch({ type: "loading", payload: false });
      } else if (responseData.error) {
        dispatch({ type: "loading", payload: false });
        setFdata({
          ...fData,
          error: responseData.error,
          success: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
