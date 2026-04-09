const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: String,
  subjects: [{ name: String, marks: Number }],
  total: Number,
  percentage: Number,
  grade: String
});

module.exports = mongoose.model("Marks", marksSchema);