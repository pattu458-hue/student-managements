const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Student = require("./models/Student");
const User = require("./models/User");
const Marks = require("./models/Marks");

console.log("🔥 SERVER STARTED 🔥");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// ✅ DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 Server running on port 5001");
});




// ➕ ADD STUDENT
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();

    res.json({
      message: "Student added successfully",
      student: saved,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 GET ALL STUDENTS
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE STUDENT
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE STUDENT
app.put("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      message: "Student updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =========================
// 📅 ATTENDANCE API
// =========================

app.post("/students/:id/attendance", async (req, res) => {
  try {
    const { date, status } = req.body;

    await Student.findByIdAndUpdate(req.params.id, {
      $push: { attendance: { date, status } },
    });

    res.json({ message: "Attendance added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =========================
// 🔐 AUTH APIs
// =========================

// 📝 REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔑 LOGIN (DATABASE BASED ✅)
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("🔐 Login attempt:", username);

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// 📊 MARKS API (FINAL)
// =========================

// ➕ ADD MARKS
app.post("/students/:id/marks", async (req, res) => {
  try {
    const studentId = req.params.id;
    const { subjects } = req.body;

    if (!subjects || subjects.length === 0) {
      return res.status(400).json({ message: "Subjects required" });
    }

    const total = subjects.reduce((sum, s) => sum + Number(s.marks), 0);
    const percentage = total / subjects.length;

    let grade = "F";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 75) grade = "A";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";

    const newMarks = new Marks({
      studentId,
      subjects,
      total,
      percentage,
      grade,
    });

    await newMarks.save();

    res.json(newMarks);
  } catch (err) {
    console.error("❌ Marks Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// 📄 GET MARKS
app.get("/students/:id/marks", async (req, res) => {
  try {
    const studentId = req.params.id;

    // Get marks
    const marks = await Marks.findOne({ studentId });

    // Get student details
    const student = await Student.findById(studentId);

    if (!marks || !student) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Send combined data
    res.json({
      studentName: student.name,   // ✅ NEW
      studentAge: student.age,     // optional
      subjects: marks.subjects,
      total: marks.total,
      percentage: marks.percentage,
      grade: marks.grade
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =========================
// 🚀 START SERVER
// =========================
app.listen(5001, () => {
  console.log("🚀 Server running on port 5001");
});