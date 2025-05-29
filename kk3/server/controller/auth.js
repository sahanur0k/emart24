const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  // Check user role from user ID
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  // Check current user role from token
  async checkUserRole(req, res) {
    try {
      const userId = req.userDetails._id;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.userRole,
        isAdmin: user.userRole === 1,
        isEmployee: user.userRole === 2
      });
    } catch (error) {
      console.error("Error checking user role:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // Check if passwords match before hashing
          if (password !== cPassword) {
            error = {
              ...error,
              password: "Password doesn't match",
              cPassword: "Password doesn't match",
              name: "",
              email: "",
            };
            return res.json({ error });
          }

          // If Email & Number exists in Database then:
          try {
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              // Hash password after validation
              const hashedPassword = bcrypt.hashSync(password, 10);

              let newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                // ========= Here role 1 for admin signup role 0 for customer signup role 2 for employee =========
                userRole: email === 'admin@emart24.com' ? 1 : 0, // Make admin@emart24.com an admin user
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  return res.json({ error: "Failed to create account" });
                });
            }
          } catch (err) {
            console.log(err);
            return res.json({ error: "Something went wrong" });
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* Employee Registration/Signup controller  */
  async postEmployeeSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // Check if passwords match before hashing
          if (password !== cPassword) {
            error = {
              ...error,
              password: "Password doesn't match",
              cPassword: "Password doesn't match",
              name: "",
              email: "",
            };
            return res.json({ error });
          }

          // If Email & Number exists in Database then:
          try {
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              // Hash password after validation
              const hashedPassword = bcrypt.hashSync(password, 10);

              let newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                // ========= Role 2 for employee signup =========
                userRole: 2, // Employee role
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Employee account created successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  return res.json({ error: "Failed to create employee account" });
                });
            }
          } catch (err) {
            console.log(err);
            return res.json({ error: "Something went wrong" });
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* Admin Registration/Signup controller  */
  async postAdminSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Field must not be empty",
        email: "Field must not be empty",
        password: "Field must not be empty",
        cPassword: "Field must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 characters" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 characters",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // Check if passwords match before hashing
          if (password !== cPassword) {
            error = {
              ...error,
              password: "Password doesn't match",
              cPassword: "Password doesn't match",
              name: "",
              email: "",
            };
            return res.json({ error });
          }

          // If Email exists in Database then:
          try {
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              // Hash password after validation
              const hashedPassword = bcrypt.hashSync(password, 10);

              let newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                // ========= Role 1 for admin signup =========
                userRole: 1, // Admin role
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Admin account created successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  return res.json({ error: "Failed to create admin account" });
                });
            }
          } catch (err) {
            console.log(err);
            return res.json({ error: "Something went wrong" });
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* Admin Create Employee Account controller  */
  async postAdminCreateEmployee(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Field must not be empty",
        email: "Field must not be empty",
        password: "Field must not be empty",
        cPassword: "Field must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 characters" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 characters",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // Check if passwords match before hashing
          if (password !== cPassword) {
            error = {
              ...error,
              password: "Password doesn't match",
              cPassword: "Password doesn't match",
              name: "",
              email: "",
            };
            return res.json({ error });
          }

          // If Email exists in Database then:
          try {
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              // Hash password after validation
              const hashedPassword = bcrypt.hashSync(password, 10);

              let newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                // ========= Role 2 for employee created by admin =========
                userRole: 2, // Employee role
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Employee account created successfully by admin",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  return res.json({ error: "Failed to create employee account" });
                });
            }
          } catch (err) {
            console.log(err);
            return res.json({ error: "Something went wrong" });
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
      return res.json({
        error: "Something went wrong",
      });
    }
  }
}

const authController = new Auth();
module.exports = authController;
