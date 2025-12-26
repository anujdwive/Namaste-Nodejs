const expess = require("express");
const app = expess();
const PORT = 3000;
// Order of route definitions matters! Specific routes should be defined before general ones.
// use method defines a route handler for all HTTP methods
// app.use("/user", (req, res) => {
//   res.send("Hello, World!");
// });

// Specific route for GET /user
app.get("/user", (req, res) => {
  res.send({ firstName: "John", lastName: "Doe" });
});

// General route for all other /user requests
app.post("/user", (req, res) => {
  res.send("User created successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
