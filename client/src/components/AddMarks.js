import React, { useState, useEffect } from "react";
import { addMarks, getStudents } from "../api";
import "./addmarks.css";

export default function AddMarks() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");

  const [subjects, setSubjects] = useState([
    { name: "Tamil", marks: "" },
    { name: "English", marks: "" },
    { name: "Maths", marks: "" },
    { name: "Science", marks: "" },
    { name: "Social Science", marks: "" },
  ]);

  // ✅ Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  // ✅ Handle marks change
  const handleChange = (index, value) => {
    const updated = [...subjects];
    updated[index].marks = value;
    setSubjects(updated);
  };

  // ✅ Overall Result
  const allPass = subjects.every(
    (sub) => sub.marks !== "" && Number(sub.marks) >= 40
  );

  // ✅ Submit
  const handleSubmit = async () => {
    if (!studentId) return alert("Select Student");

    try {
      await addMarks(studentId, { subjects });
      alert("✅ Marks Added Successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding marks");
    }
  };

  return (
    <div className="add-marks-container">
      <h2>📊 Add Marks</h2>

      {/* STUDENT DROPDOWN */}
      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* SUBJECT LIST */}
      <div className="subjects-list">
        {subjects.map((sub, i) => {
          const isPass = Number(sub.marks) >= 40;

          return (
            <div key={i} className="subject-row">
              <label>{sub.name}</label>

              <input
                type="number"
                placeholder="Enter marks"
                value={sub.marks}
                onChange={(e) => handleChange(i, e.target.value)}
              />

              {/* PASS / FAIL */}
              {sub.marks !== "" && (
                <span
                  style={{
                    color: isPass ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {isPass ? "Pass" : "Fail"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* OVERALL RESULT */}
      {subjects.some((sub) => sub.marks !== "") && (
        <h3 style={{ color: allPass ? "green" : "red" }}>
          Overall Result: {allPass ? "PASS" : "FAIL"}
        </h3>
      )}

      <button onClick={handleSubmit}>Submit Marks</button>
    </div>
  );
}