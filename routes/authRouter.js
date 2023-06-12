const express = require("express");
const { auth } = require("../middleWares/auth");

const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../utils/validation/authValidationSchemas");
const { validateBody } = require("../utils/validateBody");
const { signup, login, logout } = require("../controllers/authControllers");

const router = express.Router();
router.post("/signup", validateBody(createUserValidationSchema), signup);
router.post("/login", validateBody(loginValidationSchema), login);
router.post("logout", auth, logout);

module.exports = {
  authRouter: router,
};
