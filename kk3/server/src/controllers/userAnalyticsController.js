const User = require("../../models/users");
const Order = require("../../models/orders");
const Product = require("../../models/products");

// Get comprehensive user analytics
exports.getUserAnalytics = async (req, res) => {
  try {
    // Get all users with their complete information
    const users = await User.find({ userRole: 0 }) // Only regular users, not admins
      .select("name email phoneNumber userImage createdAt history")
      .sort({ createdAt: -1 });

    // Get all orders with user and product details
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("allProduct.id", "pName pPrice")
      .sort({ createdAt: -1 });

    // Calculate analytics for each user
    const userAnalytics = await Promise.all(
      users.map(async (user) => {
        // Get user's orders
        const userOrders = orders.filter(
          order => order.user && order.user._id.toString() === user._id.toString()
        );

        // Calculate total spent
        const totalSpent = userOrders.reduce((sum, order) => sum + order.amount, 0);

        // Calculate total orders
        const totalOrders = userOrders.length;

        // Calculate super coins
        let totalSuperCoins = 0;
        const history = user.history || [];
        history.forEach(entry => {
          if (entry.type === "earned") {
            totalSuperCoins += entry.amount;
          } else if (entry.type === "spent") {
            totalSuperCoins -= entry.amount;
          }
        });

        // Get last order date
        const lastOrderDate = userOrders.length > 0
          ? userOrders[0].createdAt
          : null;

        // Calculate average order value
        const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

        // Get order status breakdown
        const orderStatusBreakdown = {
          "Not processed": 0,
          "Processing": 0,
          "Shipped": 0,
          "Delivered": 0,
          "Cancelled": 0
        };

        userOrders.forEach(order => {
          orderStatusBreakdown[order.status] = (orderStatusBreakdown[order.status] || 0) + 1;
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber || "Not provided",
          userImage: user.userImage,
          joinDate: user.createdAt,
          totalOrders,
          totalSpent: Math.round(totalSpent * 100) / 100,
          avgOrderValue: Math.round(avgOrderValue * 100) / 100,
          totalSuperCoins: Math.max(0, totalSuperCoins),
          lastOrderDate,
          orderStatusBreakdown,
          recentOrders: userOrders.slice(0, 3) // Last 3 orders
        };
      })
    );

    // Calculate monthly analytics
    const monthlyAnalytics = await calculateMonthlyAnalytics();

    // Calculate overall statistics
    const totalUsers = users.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const totalOrdersCount = orders.length;
    const avgRevenuePerUser = totalUsers > 0 ? totalRevenue / totalUsers : 0;

    // Get top customers by spending
    const topCustomers = userAnalytics
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10);

    // Get recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = users.filter(user => user.createdAt >= thirtyDaysAgo).length;

    res.status(200).json({
      success: true,
      data: {
        users: userAnalytics,
        monthlyAnalytics,
        overallStats: {
          totalUsers,
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          totalOrders: totalOrdersCount,
          avgRevenuePerUser: Math.round(avgRevenuePerUser * 100) / 100,
          recentRegistrations
        },
        topCustomers
      }
    });

  } catch (error) {
    console.error("Error fetching user analytics:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user analytics"
    });
  }
};

// Calculate monthly analytics for the last 12 months
const calculateMonthlyAnalytics = async () => {
  try {
    const monthlyData = [];
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);

      // Get users registered in this month
      const newUsers = await User.countDocuments({
        userRole: 0,
        createdAt: { $gte: startDate, $lte: endDate }
      });

      // Get orders in this month
      const monthlyOrders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate }
      });

      const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.amount, 0);
      const monthlyOrderCount = monthlyOrders.length;

      monthlyData.push({
        month: startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        newUsers,
        orders: monthlyOrderCount,
        revenue: Math.round(monthlyRevenue * 100) / 100,
        avgOrderValue: monthlyOrderCount > 0 ? Math.round((monthlyRevenue / monthlyOrderCount) * 100) / 100 : 0
      });
    }

    return monthlyData;
  } catch (error) {
    console.error("Error calculating monthly analytics:", error);
    return [];
  }
};

// Get detailed user information by ID
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select("name email phoneNumber userImage createdAt history");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // Get user's orders with product details
    const userOrders = await Order.find({ user: userId })
      .populate("allProduct.id", "pName pPrice pImages")
      .sort({ createdAt: -1 });

    // Calculate detailed analytics for this user
    const totalSpent = userOrders.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = userOrders.length;

    // Calculate super coins
    let totalSuperCoins = 0;
    const history = user.history || [];
    history.forEach(entry => {
      if (entry.type === "earned") {
        totalSuperCoins += entry.amount;
      } else if (entry.type === "spent") {
        totalSuperCoins -= entry.amount;
      }
    });

    // Get order timeline (monthly breakdown)
    const orderTimeline = {};
    userOrders.forEach(order => {
      const monthKey = order.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (!orderTimeline[monthKey]) {
        orderTimeline[monthKey] = { orders: 0, amount: 0 };
      }
      orderTimeline[monthKey].orders += 1;
      orderTimeline[monthKey].amount += order.amount;
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          ...user.toObject(),
          totalOrders,
          totalSpent: Math.round(totalSpent * 100) / 100,
          totalSuperCoins: Math.max(0, totalSuperCoins),
          avgOrderValue: totalOrders > 0 ? Math.round((totalSpent / totalOrders) * 100) / 100 : 0
        },
        orders: userOrders,
        orderTimeline
      }
    });

  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user details"
    });
  }
};
