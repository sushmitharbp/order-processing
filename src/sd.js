import { useState } from "react";

export default function Discipline() {
  const students = [
    { name: "Alice", branch: "MCA" },
    { name: "Bob", branch: "ECE" },
    { name: "Charlie", branch: "MCA" }, 
    { name: "David", branch: "CSE" },
    { name: "Eve", branch: "MCA" },
    { name: "Frank", branch: "EEE" },
    { name: "Grace", branch: "MCA" },
    { name: "Hank", branch: "IT" },
    { name: "Ivy", branch: "MCA" },
    { name: "Jack", branch: "MECH" },
  ];

  const [allStudents, setAllStudents] = useState([]);

  function showAllStudents() {
    setAllStudents(students);
  }

  return (
    <div>
      <button onClick={showAllStudents}>I am a CEGian</button>
      <ul>
        {allStudents.map((student, index) => (
          <li key={index}>{student.name} - {student.branch}</li>
        ))}
      </ul>
      {allStudents.length > 0 && <Student students={students} />}
    </div>
  );


function Student({ students }) {
  const [mcaStudents, setMcaStudents] = useState([]);

  function showMCAStudents() {
    setMcaStudents(students.filter(student => student.branch === "MCA"));
  }

  return (
    <div>
      <button onClick={showMCAStudents}>Who studies in MCA?</button>
      <ul>
        {mcaStudents.map((student, index) => (
          <li key={index}>{student.name} - {student.branch}</li>
        ))}
      </ul>
    </div>
  );
}
}