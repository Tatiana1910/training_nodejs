const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { asignTokens } = require("../utils/asignTokens");

const signupService = async (body) => {
  const fetchedUsers = await User.findOne({ email: body.email });
  if (fetchedUsers) {
    throw new HttpError(409, "Email should be unique");
  }

  const newPasswords = await bcrypt.hash(body.password, 12);
  return await User.create({ ...body, password: newPasswords });
};

const loginService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (!fetchedUser) {
    throw new HttpError(401, "User with this email is not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    body.password,
    fetchedUser.password
  );
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Password is not correct");
  }

  const { refreshToken, accessToken } = asignTokens(fetchedUser);

  await User.findByIdAndUpdate(fetchedUser._id, {
    refresh_token: refreshToken,
  });

  return {
    user: { _id: fetchedUser._id, email: fetchedUser.email },
    accessToken,
  };
};

module.exports = {
  signupService,
  loginService,
};
