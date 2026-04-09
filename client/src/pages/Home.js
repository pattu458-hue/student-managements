import React, { useState, useEffect } from "react";
import {
  addStudent,
  deleteStudent,
  updateStudent
} from "../api";
import "./Home.css";

function Home({ students, fetchStudents }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [students]);

  // ✅ ADD / UPDATE
  const handleAddOrUpdate = async () => {
    if (!name || !age) return alert("Enter details");

    if (editId) {
      await updateStudent(editId, { name, age });
      setEditId(null);
    } else {
      await addStudent({ name, age });
    }

    await fetchStudents();
    setCurrentPage(1);
    setName("");
    setAge("");
  };

  // ✅ EDIT
  const handleEdit = (s) => {
    setName(s.name);
    setAge(s.age);
    setEditId(s._id);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await deleteStudent(id);
    await fetchStudents();
    setCurrentPage(1);
  };

  return (
    <div className="home-container fade-in">

      <h2 className="home-title">🏠 Home - Manage Students</h2>

      {/* FORM */}
      <div className="form-box">
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button className="button" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th> {/* ✅ NEW */}
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentStudents.map((s) => (
            <tr key={s._id}>
              <td>
                {s._id} 
              </td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button onClick={() =>
          setCurrentPage((p) => Math.min(p + 1, totalPages))
        }>
          Next
        </button>
      </div>

      {/* MOBILE VIEW */}
      <div>
        {currentStudents.map((s) => (
          <div key={s._id} className="student-card">
            <p><strong>ID:</strong> {s._id}</p> {/* ✅ FULL ID */}
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Age:</strong> {s.age}</p>

            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;