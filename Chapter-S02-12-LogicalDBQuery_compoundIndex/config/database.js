const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anujDwivedi:anuj8853@cluster0.ehweh.mongodb.net/devtinder"
  );
};

module.exports = connectDB;
