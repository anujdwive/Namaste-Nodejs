const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // If You added this field then when you create the user it is required
      minLength: 2,
      maxLength: 10,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true, // if you write any uppercase it change into lowercases
      unique: true, // if you write any duplicate email it throw error
      trim: true, // if you write any space it trim the email remove all spaces
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      default:
        "https://www.rattanhospital.in/wp-content/uploads/2020/03/user-dummy-pic.png", // if you add this default field it show as default if you not put any picture
    },
    gender: {
      type: String,
      validate(value) {
        // custome validation
        if (!["male", "female", "other"].includes(value)) {
          throw new error("Gender data not valid");
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    about: {
      type: String,
      default: "This is about user!",
    },
    skill: {
      type: [String],
    },
  },
  { timestamps: true } // if you add or update data then add timestame
);

const User = mongoose.model("User", userSchema);

module.exports = User;
