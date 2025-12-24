const expess = require("express");
const app = expess();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
  res.send("About Us");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
