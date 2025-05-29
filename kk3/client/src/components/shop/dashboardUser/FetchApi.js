import axios from "axios";
const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const getUserById = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/signle-user`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/edit-user`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUser = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/order-by-user`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserSuperCoins = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/super-coin/user-super-coins`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPendingSuperCoins = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/super-coin/pending-super-coins`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/change-password`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const redeemRewardCode = async (uId, code) => {
  try {
    let res = await axios.post(`${apiURL}/api/super-coin/redeem-reward-code`, { uId, code });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
