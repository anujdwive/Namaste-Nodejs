const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validationSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const authRoutes = require("./routes/auth");
const profileRoute = require("./routes/profile");
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

//Signup and login
app.use("/", authRoutes);

//Profile
app.use("/", profileRoute);

connectDB()
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected.");
  });
