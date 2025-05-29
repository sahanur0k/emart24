const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, isAuth, isAdmin, isEmployee, isAdminOrEmployee } = require("../middleware/auth");

router.post("/isadmin", authController.isAdmin);
router.post("/signup", authController.postSignup);
router.post("/employee-signup", authController.postEmployeeSignup);
router.post("/admin-signup", authController.postAdminSignup);
router.post("/admin/create-employee", loginCheck, isAdmin, authController.postAdminCreateEmployee);
router.post("/signin", authController.postSignin);
router.get("/check-role", loginCheck, authController.checkUserRole);
router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser);

module.exports = router;
