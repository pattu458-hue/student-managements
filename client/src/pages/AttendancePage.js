import React, { useState } from "react";
import { addAttendance } from "../api";
import "./Attendance.css";

function AttendancePage({ students, fetchStudents }) {
  const [attendanceData, setAttendanceData] = useState({});

  // ✅ Handle select change
  const handleChange = (id, value) => {
    setAttendanceData({
      ...attendanceData,
      [id]: value,
    });
  };

  // ✅ Submit attendance
  const handleSubmit = async (id) => {
    const status = attendanceData[id];

    if (!status) return alert("Select attendance");

    await addAttendance(id, {
      date: new Date().toLocaleDateString(),
      status,
    });

    await fetchStudents();

    setAttendanceData({ ...attendanceData, [id]: "" });
  };

  // ✅ TODAY COUNT CALCULATION
  const today = new Date().toLocaleDateString();

  let presentCount = 0;
  let absentCount = 0;

  students.forEach((s) => {
    const todayRecord = s.attendance?.find((a) => a.date === today);

    if (todayRecord?.status === "Present") presentCount++;
    if (todayRecord?.status === "Absent") absentCount++;
  });

  const totalStudents = students.length;
  const balanceLeave = totalStudents - (presentCount + absentCount);

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">📅 Attendance Dashboard</h2>

      {/* 📋 TABLE */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
            {/* <th>Balance Leave</th> */}
            <th>Attendance %</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => {
            const presentCount =
              s.attendance?.filter((a) => a.status === "Present").length || 0;

            const absentCount =
              s.attendance?.filter((a) => a.status === "Absent").length || 0;

            const totalDays = s.attendance?.length || 0;

            // ✅ Correct balance leave calculation
            // const balanceLeave = totalDays - (presentCount + absentCount);

            // ✅ Attendance percentage
            const attendancePercentage =
              totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(2) : "0.00";

            return (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{presentCount}</td>
                <td>{absentCount}</td>
                {/* <td>{balanceLeave}</td> */}
                <td>{attendancePercentage}%</td>
                <td>
                  <select
                    value={attendanceData[s._id] || ""}
                    onChange={(e) => handleChange(s._id, e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>

                  <button onClick={() => handleSubmit(s._id)}>Submit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AttendancePage;