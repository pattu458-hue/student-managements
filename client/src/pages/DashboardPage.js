import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from "recharts";
import "./dashboard.css";

function Dashboard({ students }) {

  const total = students.length;

  const avgAge =
    students.reduce((sum, s) => sum + Number(s.age || 0), 0) /
    (students.length || 1);

  // =========================
  // 📊 AGE DATA (EXISTING)
  // =========================
  const ageData = students.map((s) => ({
    name: s.name,
    age: Number(s.age),
  }));

  const ageGroupData = [
    { name: "0-18", value: students.filter(s => s.age <= 18).length },
    { name: "19-25", value: students.filter(s => s.age > 18 && s.age <= 25).length },
    { name: "26+", value: students.filter(s => s.age > 25).length },
  ];

  // =========================
  // 📅 ATTENDANCE DATA (NEW 🔥)
  // =========================

  const attendanceData = students.map((s) => {
    const present = s.attendance?.filter(a => a.status === "Present").length || 0;
    const absent = s.attendance?.filter(a => a.status === "Absent").length || 0;
    

    return {
      name: s.name,
      present,
      absent,
      
    };
  });

  let totalPresent = 0;
  let totalAbsent = 0;
 

  students.forEach((s) => {
    s.attendance?.forEach((a) => {
      if (a.status === "Present") totalPresent++;
      if (a.status === "Absent") totalAbsent++;
      
    });
  });

  const attendancePieData = [
    { name: "Present", value: totalPresent },
    { name: "Absent", value: totalAbsent },
    
  ];

  const COLORS = ["#4CAF50", "#F44336", "#FF9800"];

  return (
    <div className="dashboard">

      <h2>📊 Dashboard</h2>

      {/* STATS */}
      <div className="cards">
        <div className="card">Total Students: {total}</div>
        <div className="card">Average Age: {avgAge.toFixed(1)}</div>
      </div>

      <div className="charts">

        {/* ================= AGE CHART ================= */}
        <div className="chart-box">
          <h3>📊 Age Chart</h3>
          <BarChart width={500} height={350} data={ageData}
            margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="age" fill="#2196F3" />
          </BarChart>
        </div>

        {/* ================= AGE PIE ================= */}
        <div className="chart-box">
          <h3>🥧 Age Distribution</h3>
          <PieChart width={350} height={350}>
            <Pie
              data={students}
              dataKey="age"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {students.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* ================= ATTENDANCE BAR (NEW 🔥) ================= */}
        <div className="chart-box">
          <h3>📅 Attendance Chart</h3>
          <BarChart width={500} height={350} data={attendanceData}
            margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#4CAF50" />
            <Bar dataKey="absent" fill="#F44336" />
            
          </BarChart>
        </div>

        {/* ================= ATTENDANCE PIE (NEW 🔥) ================= */}
        <div className="chart-box">
          <h3>🥧 Attendance Overview</h3>
          <PieChart width={350} height={350}>
            <Pie
              data={attendancePieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {attendancePieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;