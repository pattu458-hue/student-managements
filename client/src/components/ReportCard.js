import React from "react";
import "./reportcard.css";

export default function ReportCard({ data }) {
  if (!data) return <h3 className="no-data">No Data Found</h3>;

  return (
    <div className="report-card">
      <h2 className="title">📄 Report Card</h2>

      {/* ✅ STUDENT DETAILS */}
      <div className="student-info">
        <h3>Name: {data.studentName}</h3>
        <p>Age: {data.studentAge}</p>
      </div>

      <table className="marks-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {data.subjects.map((sub, i) => (
            <tr key={i}>
              <td>{sub.name}</td>
              <td>{sub.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <h3>Total: {data.total}</h3>
        <h3>Percentage: {data.percentage}%</h3>
        <h3>Grade: {data.grade}</h3>
      </div>
    </div>
  );
}