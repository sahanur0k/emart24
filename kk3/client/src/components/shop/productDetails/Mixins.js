export const cartList = () => {
  try {
    let carts = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;
    let list = [];
    if (carts !== null && Array.isArray(carts)) {
      for (let cart of carts) {
        if (cart && cart.id) {
          list.push(cart.id);
        }
      }
      return list;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting cart list:", error);
    return null;
  }
};

export const updateQuantity = (
  type,
  totalQuantitiy,
  quantitiy,
  setQuantitiy,
  setAlertq
) => {
  if (type === "increase") {
    if (quantitiy === totalQuantitiy) {
      setAlertq(true);
    } else {
      setQuantitiy(quantitiy + 1);
    }
  } else if (type === "decrease") {
    if (quantitiy === 1) {
      setQuantitiy(1);
      setAlertq(false);
    } else {
      setQuantitiy(quantitiy - 1);
    }
  }
};

export const slideImage = (type, active, count, setCount, pImages) => {
  if (active === count) {
    return true;
  }
  if (type === "increase") {
    if (count === pImages.length - 1) {
      setCount(0);
    } else if (count < pImages.length) {
      setCount(count + 1);
    }
  }
};

export const inCart = (id) => {
  if (localStorage.getItem("cart")) {
    let cartProducts = JSON.parse(localStorage.getItem("cart"));
    for (let product of cartProducts) {
      if (product.id === id) {
        return true;
      }
    }
  }
  return false;
};

export const addToCart = (
  id,
  quantitiy,
  price,
  layoutDispatch,
  setQuantitiy,
  setAlertq,
  fetchData,
  totalCost
) => {
  try {
    let isObj = false;
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    if (!Array.isArray(cart)) {
      cart = [];
    }

    if (cart.length > 0) {
      cart.forEach((item) => {
        if (item && item.id === id) {
          isObj = true;
        }
      });
      if (!isObj) {
        cart.push({ id, quantitiy: Number(quantitiy), price: Number(price) });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      cart.push({ id, quantitiy: Number(quantitiy), price: Number(price) });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Update state immediately for better UX
    layoutDispatch({ type: "inCart", payload: cartList() });
    layoutDispatch({ type: "cartTotalCost", payload: totalCost() });
    setQuantitiy(1);
    setAlertq(false);

    // Dispatch custom event to notify navbar of cart change
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    // Fetch updated data
    fetchData();
  } catch (error) {
    console.error("Error adding to cart:", error);
    // Reset states on error
    setAlertq(false);
  }
};
