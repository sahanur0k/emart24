import axios from "axios";
const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const cartListProduct = async () => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let productArray = [];
  if (carts) {
    for (const cart of carts) {
      productArray.push(cart.id);
    }
  }
  try {
    let res = await axios.post(`${apiURL}/api/product/cart-product`, {
      productArray,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
