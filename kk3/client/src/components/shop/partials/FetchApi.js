import axios from "axios";
const apiURL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || "http://localhost:8000";

export const cartListProduct = async () => {
  try {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    let productArray = [];

    if (Array.isArray(carts)) {
      for (const cart of carts) {
        if (cart && cart.id) {
          productArray.push(cart.id);
        }
      }
    }

    let res = await axios.post(`${apiURL}/api/product/cart-product`, {
      productArray,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return { Products: [] }; // Return empty array on error
  }
};
