const adminAuth = (req, res, next) => {
  const token = "mysecrettoken"; // In real-world applications, tokens are usually sent in headers or cookies.
  const isAuthenticated = token === "mysecrettoken"; // For simplicity, we are using query parameters here.
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized: Invalid token");
  } else {
    next(); // Pass control to the next middleware or route handler
  }
};

const userAuth = (req, res, next) => {
  const token = "usertoken";
  const isAuthenticated = token === "usertoken";
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized: Invalid token");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
