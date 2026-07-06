const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validationSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

app.use(express.json());

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successfully!");
    } else {
      res.status(400).send("Password not valid");
    }
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
