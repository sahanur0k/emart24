export const subTotal = (id, price) => {
  let subTotalCost = 0;
  try {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    carts.forEach((item) => {
      if (item.id === id) {
        subTotalCost = (item.quantitiy || 0) * (price || 0);
      }
    });
  } catch (error) {
    console.error("Error calculating subtotal:", error);
  }
  return subTotalCost;
};

export const quantity = (id) => {
  let product = 0;
  try {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    carts.forEach((item) => {
      if (item.id === id) {
        product = item.quantitiy || 0;
      }
    });
  } catch (error) {
    console.error("Error getting quantity:", error);
  }
  return product;
};

export const totalCost = () => {
  let totalCost = 0;
  try {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    carts.forEach((item) => {
      totalCost += (item.quantitiy || 0) * (item.price || 0);
    });
  } catch (error) {
    console.error("Error calculating total cost:", error);
  }
  return totalCost;
};
