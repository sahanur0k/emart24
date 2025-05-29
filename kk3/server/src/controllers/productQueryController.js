const ProductQuery = require("../../models/productQuery");
const User = require("../../models/users");

// Employee: Create a new product query
exports.createProductQuery = async (req, res) => {
  try {
    const {
      productName,
      customerName,
      customerContact,
      customerEmail,
      description,
      category,
      urgency,
      estimatedPrice,
      quantity,
    } = req.body;

    // Get employee details
    const employee = await User.findById(req.userDetails._id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const newQuery = new ProductQuery({
      productName,
      customerName,
      customerContact,
      customerEmail,
      description,
      category,
      urgency: urgency || "Medium",
      estimatedPrice,
      quantity: quantity || 1,
      employeeId: employee._id,
      employeeName: employee.name,
    });

    const savedQuery = await newQuery.save();
    res.status(201).json({
      success: "Product query created successfully",
      query: savedQuery,
    });
  } catch (error) {
    console.error("Error creating product query:", error);
    res.status(500).json({ error: "Failed to create product query" });
  }
};

// Employee: Get queries created by the logged-in employee
exports.getEmployeeQueries = async (req, res) => {
  try {
    const employeeId = req.userDetails._id;
    const queries = await ProductQuery.find({ employeeId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ queries });
  } catch (error) {
    console.error("Error fetching employee queries:", error);
    res.status(500).json({ error: "Failed to fetch queries" });
  }
};

// Admin: Get all product queries
exports.getAllQueries = async (req, res) => {
  try {
    const { status, urgency, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status && status !== "All") filter.status = status;
    if (urgency && urgency !== "All") filter.urgency = urgency;

    const skip = (page - 1) * limit;
    
    const queries = await ProductQuery.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await ProductQuery.countDocuments(filter);

    res.json({
      queries,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: total,
      },
    });
  } catch (error) {
    console.error("Error fetching all queries:", error);
    res.status(500).json({ error: "Failed to fetch queries" });
  }
};

// Admin: Update query status and add notes
exports.updateQueryStatus = async (req, res) => {
  try {
    const { queryId } = req.params;
    const { status, adminNotes, expectedDate } = req.body;

    const updateData = {
      updatedAt: new Date(),
    };

    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (expectedDate) updateData.expectedDate = new Date(expectedDate);

    const updatedQuery = await ProductQuery.findByIdAndUpdate(
      queryId,
      updateData,
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.json({
      success: "Query updated successfully",
      query: updatedQuery,
    });
  } catch (error) {
    console.error("Error updating query:", error);
    res.status(500).json({ error: "Failed to update query" });
  }
};

// Admin: Delete a query
exports.deleteQuery = async (req, res) => {
  try {
    const { queryId } = req.params;

    const deletedQuery = await ProductQuery.findByIdAndDelete(queryId);
    if (!deletedQuery) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.json({ success: "Query deleted successfully" });
  } catch (error) {
    console.error("Error deleting query:", error);
    res.status(500).json({ error: "Failed to delete query" });
  }
};

// Get query statistics
exports.getQueryStatistics = async (req, res) => {
  try {
    const stats = await ProductQuery.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const urgencyStats = await ProductQuery.aggregate([
      {
        $group: {
          _id: "$urgency",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalQueries = await ProductQuery.countDocuments();
    const pendingQueries = await ProductQuery.countDocuments({ status: "Pending" });
    const todayQueries = await ProductQuery.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    res.json({
      statusStats: stats,
      urgencyStats,
      totalQueries,
      pendingQueries,
      todayQueries,
    });
  } catch (error) {
    console.error("Error fetching query statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
