// import { useState } from "react";
// import AddClassroom from "./components/AddClassroom";
// import ClassroomList from "./components/ClassroomList";
// import AllocateExam from "./components/AllocateExam";

// function App() {
//   const [classrooms, setClassrooms] = useState([]);

//   return (
//     <div className="container">
//       <h1>🎓 College Exam Seat Planner</h1>

//       <AddClassroom classrooms={classrooms} setClassrooms={setClassrooms} />

//       <ClassroomList classrooms={classrooms} />

//       <AllocateExam classrooms={classrooms} />
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import AddClassroom from "./components/AddClassroom";
import ClassroomList from "./components/ClassroomList";
import AllocateExam from "./components/AllocateExam";

function App() {
  const [classrooms, setClassrooms] = useState([]);

  // Fetch classrooms from the backend when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/api/classrooms")
      .then((res) => res.json())
      .then((data) => setClassrooms(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="container">
      <h1>🎓 College Exam Seat Planner</h1>

      <AddClassroom classrooms={classrooms} setClassrooms={setClassrooms} />

      {/* <ClassroomList classrooms={classrooms} /> */}
      <ClassroomList classrooms={classrooms} setClassrooms={setClassrooms} />

      <AllocateExam classrooms={classrooms} />
    </div>
  );
}

export default App;