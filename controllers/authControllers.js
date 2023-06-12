const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");
const { signupService, loginService } = require("../services/authServices");

const signup = catchAsyncWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
});

const login = catchAsyncWrapper(async (req, res, next) => {
  const { user, accessToken } = await loginService(req.body);
  res.status(200).json({ user, accessToken });
});

const logout = catchAsyncWrapper((req, res, next) => {});

module.exports = {
  signup,
  login,
  logout,
};
