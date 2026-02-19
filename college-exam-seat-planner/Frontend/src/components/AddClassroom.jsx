// import { useState } from "react";

// function AddClassroom({ classrooms, setClassrooms }) {
//   const [roomId, setRoomId] = useState("");
//   const [capacity, setCapacity] = useState("");
//   const [floorNo, setFloorNo] = useState("");
//   const [nearWashroom, setNearWashroom] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!roomId || !capacity || !floorNo) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newRoom = {
//       roomId,
//       capacity: Number(capacity),
//       floorNo: Number(floorNo),
//       nearWashroom,
//     };

//     setClassrooms([...classrooms, newRoom]);

//     setRoomId("");
//     setCapacity("");
//     setFloorNo("");
//     setNearWashroom(false);
//   };

//   return (
//     <div className="card">
//       <h2>Add Classroom</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Capacity"
//           value={capacity}
//           onChange={(e) => setCapacity(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Floor No"
//           value={floorNo}
//           onChange={(e) => setFloorNo(e.target.value)}
//         />

//         <label>
//           <input
//             type="checkbox"
//             checked={nearWashroom}
//             onChange={() => setNearWashroom(!nearWashroom)}
//           />
//           Near Washroom
//         </label>

//         <button type="submit">Add Classroom</button>

//       </form>
//     </div>
//   );
// }

// export default AddClassroom;




import { useState } from "react";

function AddClassroom({ classrooms, setClassrooms }) {
  const [roomId, setRoomId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [nearWashroom, setNearWashroom] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomId || !capacity || !floorNo) {
      alert("Please fill all fields");
      return;
    }

    const newRoom = {
      roomId,
      capacity: Number(capacity),
      floorNo: Number(floorNo),
      nearWashroom,
    };

    try {
      // Send the data to our Backend API
      const response = await fetch("http://localhost:5000/api/classrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });

      if (response.ok) {
        const savedRoom = await response.json();
        // Update the UI with the room returned from the database
        setClassrooms([...classrooms, savedRoom]);

        // Clear the form
        setRoomId("");
        setCapacity("");
        setFloorNo("");
        setNearWashroom(false);
      } else {
        alert("Failed to save classroom to database");
      }
    } catch (error) {
      console.error("Error saving classroom:", error);
      alert("Error connecting to the server!");
    }
  };

  return (
    <div className="card">
      <h2>Add Classroom</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Room ID (e.g., 101)"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Capacity (e.g., 50)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Floor No (e.g., 1)"
          value={floorNo}
          onChange={(e) => setFloorNo(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={nearWashroom}
            onChange={() => setNearWashroom(!nearWashroom)}
          />
          Near Washroom
        </label>

        <button type="submit">Add Classroom</button>
      </form>
    </div>
  );
}

export default AddClassroom;