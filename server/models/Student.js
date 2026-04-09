const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  attendance: [
    {
      date: String,
      status: String, // Present / Absent
    },
  ],
  marks: [
    {
      subject: String,
      score: Number,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
