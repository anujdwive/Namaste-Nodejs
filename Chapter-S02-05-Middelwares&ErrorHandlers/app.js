const expess = require("express");
const app = expess();
const PORT = 3000;

// app.use("/user", (req, res) => {
//   // res.send("User route"); // If this line is commented out, the request will move to the next middleware and if none is found, it will result in a 404 error.
// });

// Multiple middlewares for the same route
// The first middleware logs a message and calls next() to pass control to the next middleware
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("First middleware for /user");
//     next(); // Pass control to the next middleware
//   },
//   (req, res) => {
//     res.send("User route");
//   }
// );

// Suppose first middleware have res.send() instead of next(), then the second middleware will never be executed. and give error if we try to send response again.
// app.use(
//   "/user",
//   (req, res, next) => {
//     res.send("First Response from first middleware");
//     next(); // Pass control to the next middleware
//   },
//   (req, res) => {
//     console.log("First middleware for /user");
//     res.send("User route");
//   }
// );

// If we want to just log something in the second middleware without sending response again.
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("First Response from first middleware");
//     next(); // Pass control to the next middleware
//   },
//   (req, res) => {
//     console.log("First middleware for /user");
//   }
// );

// We can also define middlewares in array format
// app.use(
//   "/user",
//   [
//     (req, res, next) => {
//       console.log("First Response from first middleware");
//       next(); // Pass control to the next middleware
//     },
//     (req, res, next) => {
//       console.log("First middleware for /user");
//       next();
//     },
//   ],
//   (req, res) => {
//     res.send("User route");
//   }
// );

// Or we can define them separately like this:
app.use("/user", (req, res, next) => {
  console.log("First Response from first middleware");
  next(); // Pass control to the next middleware
});
app.use("/user", (req, res, next) => {
  res.send("User route");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
