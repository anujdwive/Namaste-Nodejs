const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName && !lastName) {
    throw new Error("The name is not valid!");
  } else if (!validator.isEmail(email)) {
    throw new Error("The email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("The password is not valid!");
  }
};

module.exports = {
  validationSignupData,
};
