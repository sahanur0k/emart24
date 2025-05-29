const InsuranceClient = require("../models/InsuranceClient");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Get all insurance clients (Admin only)
exports.getAllInsuranceClients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', insuranceType = '' } = req.query;

    // Build search query
    let query = {};

    if (search) {
      query.$or = [
        { policyNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (insuranceType) {
      query.insuranceType = insuranceType;
    }

    const clients = await InsuranceClient.find(query)
      .populate('createdBy', 'name email')
      .populate('lastUpdatedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await InsuranceClient.countDocuments(query);

    res.status(200).json({
      success: true,
      clients,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Error fetching insurance clients:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch insurance clients",
    });
  }
};

// Get single insurance client by ID (Admin only)
exports.getInsuranceClientById = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await InsuranceClient.findById(clientId)
      .populate('createdBy', 'name email')
      .populate('lastUpdatedBy', 'name email');

    if (!client) {
      return res.status(404).json({
        success: false,
        error: "Insurance client not found",
      });
    }

    res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    console.error("Error fetching insurance client:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch insurance client",
    });
  }
};

// Create new insurance client (Admin only)
exports.createInsuranceClient = async (req, res) => {
  try {
    const {
      policyNumber,
      insuranceType,
      policyDate,
      company,
      customerName,
      phoneNumber,
      address,
      amount,
      premium,
      coverage,
      duration,
      status,
      expiryDate,
      beneficiaries,
      notes,
    } = req.body;

    // Validation
    if (!policyNumber || !insuranceType || !policyDate || !company || !customerName || !phoneNumber || !address || !amount || !premium || !coverage || !expiryDate) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be provided",
      });
    }

    // Check if policy number already exists
    const existingClient = await InsuranceClient.findOne({ policyNumber });
    if (existingClient) {
      return res.status(400).json({
        success: false,
        error: "Policy number already exists",
      });
    }

    const client = new InsuranceClient({
      policyNumber,
      insuranceType,
      policyDate: new Date(policyDate),
      company,
      customerName,
      phoneNumber,
      address,
      amount: parseFloat(amount),
      premium: parseFloat(premium),
      coverage,
      duration: duration || "Annual",
      status: status || "Active",
      expiryDate: new Date(expiryDate),
      beneficiaries: beneficiaries || [],
      notes: notes || "",
      createdBy: req.userDetails._id,
      lastUpdatedBy: req.userDetails._id,
    });

    await client.save();

    // Populate the created client
    const populatedClient = await InsuranceClient.findById(client._id)
      .populate('createdBy', 'name email')
      .populate('lastUpdatedBy', 'name email');

    res.status(201).json({
      success: true,
      message: "Insurance client created successfully",
      client: populatedClient,
    });
  } catch (error) {
    console.error("Error creating insurance client:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Policy number already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to create insurance client",
    });
  }
};

// Update insurance client (Admin only)
exports.updateInsuranceClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const updateData = { ...req.body };

    // Add lastUpdatedBy
    updateData.lastUpdatedBy = req.userDetails._id;

    // Convert date strings to Date objects
    if (updateData.policyDate) {
      updateData.policyDate = new Date(updateData.policyDate);
    }
    if (updateData.expiryDate) {
      updateData.expiryDate = new Date(updateData.expiryDate);
    }

    // Convert amount and premium to numbers
    if (updateData.amount) {
      updateData.amount = parseFloat(updateData.amount);
    }
    if (updateData.premium) {
      updateData.premium = parseFloat(updateData.premium);
    }

    const client = await InsuranceClient.findByIdAndUpdate(
      clientId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('lastUpdatedBy', 'name email');

    if (!client) {
      return res.status(404).json({
        success: false,
        error: "Insurance client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Insurance client updated successfully",
      client,
    });
  } catch (error) {
    console.error("Error updating insurance client:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Policy number already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to update insurance client",
    });
  }
};

// Delete insurance client (Admin only)
exports.deleteInsuranceClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await InsuranceClient.findByIdAndDelete(clientId);

    if (!client) {
      return res.status(404).json({
        success: false,
        error: "Insurance client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Insurance client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting insurance client:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete insurance client",
    });
  }
};

// Get insurance statistics (Admin only)
exports.getInsuranceStatistics = async (req, res) => {
  try {
    const totalClients = await InsuranceClient.countDocuments();
    const activeClients = await InsuranceClient.countDocuments({ status: 'Active' });
    const expiredClients = await InsuranceClient.countDocuments({ status: 'Expired' });
    const pendingClients = await InsuranceClient.countDocuments({ status: 'Pending' });

    // Get clients expiring in next 30 days
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expiringClients = await InsuranceClient.countDocuments({
      status: 'Active',
      expiryDate: { $lte: thirtyDaysFromNow, $gte: new Date() }
    });

    // Get total premium amount
    const totalPremiumResult = await InsuranceClient.aggregate([
      { $group: { _id: null, totalPremium: { $sum: "$premium" } } }
    ]);
    const totalPremium = totalPremiumResult.length > 0 ? totalPremiumResult[0].totalPremium : 0;

    // Get total coverage amount
    const totalCoverageResult = await InsuranceClient.aggregate([
      { $group: { _id: null, totalCoverage: { $sum: "$amount" } } }
    ]);
    const totalCoverage = totalCoverageResult.length > 0 ? totalCoverageResult[0].totalCoverage : 0;

    // Get insurance type breakdown
    const typeBreakdown = await InsuranceClient.aggregate([
      { $group: { _id: "$insuranceType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      statistics: {
        totalClients,
        activeClients,
        expiredClients,
        pendingClients,
        expiringClients,
        totalPremium,
        totalCoverage,
        typeBreakdown,
      },
    });
  } catch (error) {
    console.error("Error fetching insurance statistics:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch insurance statistics",
    });
  }
};

// Export insurance clients to PDF (Admin only)
exports.exportInsuranceClientsPDF = async (req, res) => {
  try {
    const { search = '', status = '', insuranceType = '' } = req.query;

    // Build search query
    let query = {};

    if (search) {
      query.$or = [
        { policyNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (insuranceType) {
      query.insuranceType = insuranceType;
    }

    const clients = await InsuranceClient.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    // Create PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=insurance-clients-${Date.now()}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add title
    doc.fontSize(20).text('Insurance Clients Report', { align: 'center' });
    doc.moveDown();

    // Add generation date
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'right' });
    doc.text(`Total Clients: ${clients.length}`, { align: 'right' });
    doc.moveDown();

    // Add table headers
    const startY = doc.y;
    const rowHeight = 20;
    let currentY = startY;

    // Table headers
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Policy No.', 30, currentY, { width: 80 });
    doc.text('Type', 110, currentY, { width: 60 });
    doc.text('Date', 170, currentY, { width: 60 });
    doc.text('Company', 230, currentY, { width: 80 });
    doc.text('Customer', 310, currentY, { width: 80 });
    doc.text('Phone', 390, currentY, { width: 80 });
    doc.text('Amount', 470, currentY, { width: 60 });
    doc.text('Status', 530, currentY, { width: 50 });

    currentY += rowHeight;

    // Draw header line
    doc.moveTo(30, currentY).lineTo(580, currentY).stroke();
    currentY += 5;

    // Add client data
    doc.font('Helvetica').fontSize(8);

    clients.forEach((client, index) => {
      // Check if we need a new page
      if (currentY > 750) {
        doc.addPage();
        currentY = 50;

        // Redraw headers on new page
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Policy No.', 30, currentY, { width: 80 });
        doc.text('Type', 110, currentY, { width: 60 });
        doc.text('Date', 170, currentY, { width: 60 });
        doc.text('Company', 230, currentY, { width: 80 });
        doc.text('Customer', 310, currentY, { width: 80 });
        doc.text('Phone', 390, currentY, { width: 80 });
        doc.text('Amount', 470, currentY, { width: 60 });
        doc.text('Status', 530, currentY, { width: 50 });

        currentY += rowHeight;
        doc.moveTo(30, currentY).lineTo(580, currentY).stroke();
        currentY += 5;
        doc.font('Helvetica').fontSize(8);
      }

      // Add client row
      doc.text(client.policyNumber, 30, currentY, { width: 80 });
      doc.text(client.insuranceType, 110, currentY, { width: 60 });
      doc.text(new Date(client.policyDate).toLocaleDateString(), 170, currentY, { width: 60 });
      doc.text(client.company, 230, currentY, { width: 80 });
      doc.text(client.customerName, 310, currentY, { width: 80 });
      doc.text(client.phoneNumber, 390, currentY, { width: 80 });
      doc.text(`$${client.amount.toLocaleString()}`, 470, currentY, { width: 60 });
      doc.text(client.status, 530, currentY, { width: 50 });

      currentY += rowHeight;

      // Add light separator line
      if (index < clients.length - 1) {
        doc.strokeColor('#E5E5E5').moveTo(30, currentY).lineTo(580, currentY).stroke();
        doc.strokeColor('#000000');
        currentY += 2;
      }
    });

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error("Error exporting insurance clients to PDF:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export insurance clients to PDF",
    });
  }
};
