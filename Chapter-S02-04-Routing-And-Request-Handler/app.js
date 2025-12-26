const expess = require("express");
const app = expess();
const PORT = 3000;
// Order of route definitions matters! Specific routes should be defined before general ones.
// use method defines a route handler for all HTTP methods
// app.use("/user", (req, res) => {
//   res.send("Hello, World!");
// });

// Specific route for GET /user
// app.get("/user", (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" });
// });

// General route for all other /user requests
// app.post("/user", (req, res) => {
//   res.send("User created successfully!");
// });

// Playing with route parameters
app.get("/user/:userId/:userName/:userAge", (req, res) => {
  const userId = req.params.userId;
  const userName = req.params.userName;
  const userAge = req.params.userAge;
  res.send(
    `User ID requested: ${userId}, User Name requested: ${userName}, User Age requested: ${userAge}`
  );
});

// Playing with "+, *, ?, () operators in route parameters"
app.get("/abc?d", (req, res) => {
  res.send("Matched route with optional 'c'");
});

app.get("/ab+c", (req, res) => {
  res.send("Matched route with one or more 'b's");
});

app.get("/ab*c", (req, res) => {
  res.send("Matched route with zero or more 'b's");
});

app.get("/ab(cd)?e", (req, res) => {
  res.send("Matched route with optional 'cd'");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
