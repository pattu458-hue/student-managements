import React, { useState } from "react";
import { getMarks } from "../api";
import ReportCard from "../components/ReportCard";

export default function MarksPage() {
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await getMarks(studentId);
      setData(res.data);
    } catch (err) {
      alert("No data found");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>View Marks</h2>

      <input
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {data && <ReportCard data={data} />}
    </div>
  );
}