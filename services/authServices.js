const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");

const signupService = async (body) => {
  const fetchedUsers = await User.findOne({ email: body.email });
  if (fetchedUsers) {
    throw new HttpError(409, "Email should be unique");
  }
  return await User.create(body);
};

module.exports = {
  signupService,
};
