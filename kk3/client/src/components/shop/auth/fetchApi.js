import axios from "axios";
const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const isEmployee = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 2
    : false;

export const isAdminOrEmployee = () =>
  localStorage.getItem("jwt")
    ? [1, 2].includes(JSON.parse(localStorage.getItem("jwt")).user.role)
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const employeeSignupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/employee-signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const adminSignupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/admin-signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const adminCreateEmployeeReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  const token = localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")).token : false;
  try {
    let res = await axios.post(`${apiURL}/api/admin/create-employee`, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
