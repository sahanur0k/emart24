const orderModel = require("../models/orders");

// Helper function to award super coins when order is delivered
async function awardSuperCoins(order) {
  try {
    const userModel = require("../models/users");

    // Calculate total super coins for this order
    let totalSuperCoins = 0;
    for (const product of order.allProduct) {
      if (product.id && product.id.pSuperCoinReward) {
        const coins = product.id.pSuperCoinReward * product.quantitiy;
        totalSuperCoins += coins;
      }
    }

    if (totalSuperCoins > 0) {
      // Update user's super coin balance
      const user = await userModel.findById(order.user);
      if (user) {
        // Add super coins to user's history
        const superCoinEntry = {
          amount: totalSuperCoins,
          type: "earned",
          orderId: order._id,
          date: new Date(),
          description: `Earned from order #${order._id}`
        };

        // Initialize history if it doesn't exist
        if (!user.history) {
          user.history = [];
        }

        user.history.push(superCoinEntry);
        await user.save();

        console.log(`Awarded ${totalSuperCoins} super coins to user ${user.email} for order ${order._id}`);
      }
    }
  } catch (error) {
    console.error("Error awarding super coins:", error);
  }
}

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice pSuperCoinReward")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice pSuperCoinReward")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newOrder.save();
        if (save) {
          return res.json({ success: "Order created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postUpdateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        // Get the current order to check previous status
        const currentOrder = await orderModel.findById(oId).populate("allProduct.id", "pName pImages pPrice pSuperCoinReward");

        if (!currentOrder) {
          return res.json({ error: "Order not found" });
        }

        // Update the order status
        const updatedOrder = await orderModel.findByIdAndUpdate(oId, {
          status: status,
          updatedAt: Date.now(),
        }, { new: true });

        // If status changed to "Delivered", award super coins
        if (status === "Delivered" && currentOrder.status !== "Delivered") {
          await awardSuperCoins(currentOrder);
        }

        return res.json({ success: "Order updated successfully" });
      } catch (err) {
        console.log(err);
        return res.json({ error: "Failed to update order" });
      }
    }
  }



  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
