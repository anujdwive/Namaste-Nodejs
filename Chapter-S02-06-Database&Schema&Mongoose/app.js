const expess = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = expess();
const PORT = 3000;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Anuj",
    lastName: "Dwivedi",
    email: "anujtest@gmail.com",
    password: "Anuj@124",
    gender: "male",
  });

  await user.save();
  res.send("User added successfully...");
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
