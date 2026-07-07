const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validationSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

//Signup

app.post("/signup", async (req, res) => {
  try {
    validationSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // ✅ correct
    });

    await user.save();

    res.send("User added successfully...");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Email not valid");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create Jwt Token

      const token = await user.getJWT();

      // Add the token to cookie and send the response back to user
      /* JWT + cookies flow (in simple words):

        User logs in → server verifies credentials
        Server creates a JWT token (signed data like user ID)
        Token is sent to client, usually stored in a cookie
        On every request, browser automatically sends the cookie
        Server reads the JWT, verifies it, and identifies the user
        If valid → request allowed; if not → rejected
        👉 In short: JWT stores user identity, cookies carry it between client and server automatically. 
      */

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successfully!");
    } else {
      res.status(400).send("Password not valid");
    }
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

//Profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

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
