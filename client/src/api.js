import axios from "axios";

// Backend URL
const API = axios.create({
  baseURL: "http://127.0.0.1:5001",
});


// =====================
// 👨‍🎓 STUDENT APIs
// =====================

// Add student
export const addStudent = (student) => API.post("/students", student);

// Get all students
export const getStudents = () => API.get("/students");

// Delete student
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Update student
export const updateStudent = (id, student) =>
  API.put(`/students/${id}`, student);


// =====================
// 📅 ATTENDANCE APIs
// =====================

// Add attendance
export const addAttendance = (id, data) =>
  API.post(`/students/${id}/attendance`, data);


// =====================
// 📊 MARKS APIs
// =====================

// Add marks for a student
export const addMarks = (id, data) =>
  API.post(`/students/${id}/marks`, data);

export const getMarks = (id) =>
  API.get(`/students/${id}/marks`);

// =====================
// 🔐 AUTH APIs
// =====================

// Login user
export const loginUser = (credentials) =>
  API.post("/login", credentials);