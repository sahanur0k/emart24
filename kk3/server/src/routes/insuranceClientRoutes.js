const express = require("express");
const router = express.Router();
const { loginCheck, isAdmin, isAdminOnly } = require("../../middleware/auth");
const {
  getAllInsuranceClients,
  getInsuranceClientById,
  createInsuranceClient,
  updateInsuranceClient,
  deleteInsuranceClient,
  getInsuranceStatistics,
  exportInsuranceClientsPDF,
} = require("../controllers/insuranceClientController");

// Admin-only routes for insurance client management
router.get("/clients", loginCheck, isAdminOnly, getAllInsuranceClients);
router.get("/clients/:clientId", loginCheck, isAdminOnly, getInsuranceClientById);
router.post("/clients", loginCheck, isAdminOnly, createInsuranceClient);
router.put("/clients/:clientId", loginCheck, isAdminOnly, updateInsuranceClient);
router.delete("/clients/:clientId", loginCheck, isAdminOnly, deleteInsuranceClient);
router.get("/statistics", loginCheck, isAdminOnly, getInsuranceStatistics);
router.get("/export/pdf", loginCheck, isAdminOnly, exportInsuranceClientsPDF);

module.exports = router;
