const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User added successfully...");
});

// Get data by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail }); // If you use findOne in place of find so you get only one object and if use find so get array of all object which matched
    if (users.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Somthing Went Wrong");
  }
});

// Delete data by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const users = await User.findByIdAndDelete(userId); // userId is the short hand of {_id: userId}
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// Update data
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    }); // if we write the last field which is called "option" that have two value before and after that means if you write before(give the data of before updation) and for after(give the data of after updation)
    res.send("User Data Updated Successfully");
  } catch (err) {
    res.status(400).send("Somthing Went Wrong");
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
