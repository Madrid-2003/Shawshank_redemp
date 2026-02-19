// function ClassroomList({ classrooms }) {
//   return (
//     <div className="card">
//       <h2>Classroom List</h2>

//       {classrooms.length === 0 ? (
//         <p>No classrooms added yet.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Room ID</th>
//               <th>Capacity</th>
//               <th>Floor</th>
//               <th>Washroom</th>
//             </tr>
//           </thead>
//           <tbody>
//             {classrooms.map((room, index) => (
//               <tr key={index}>
//                 <td>{room.roomId}</td>
//                 <td>{room.capacity}</td>
//                 <td>{room.floorNo}</td>
//                 <td>{room.nearWashroom ? "Yes" : "No"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ClassroomList;


function ClassroomList({ classrooms, setClassrooms }) {
  
  // Function to handle deleting a classroom
  const handleDelete = async (id) => {
    // Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this classroom?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/classrooms/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted room from the React state so it disappears instantly
        setClassrooms(classrooms.filter((room) => room._id !== id));
      } else {
        alert("Failed to delete classroom from database");
      }
    } catch (error) {
      console.error("Error deleting classroom:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="card">
      <h2>Classroom List</h2>

      {classrooms.length === 0 ? (
        <p>No classrooms added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Capacity</th>
              <th>Floor</th>
              <th>Washroom</th>
              <th>Action</th> {/* New column for the button */}
            </tr>
          </thead>
          <tbody>
            {classrooms.map((room, index) => (
              <tr key={index}>
                <td>{room.roomId}</td>
                <td>{room.capacity}</td>
                <td>{room.floorNo}</td>
                <td>{room.nearWashroom ? "Yes" : "No"}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(room._id)}
                    style={{ 
                      backgroundColor: '#dc2626', 
                      padding: '6px 12px', 
                      width: 'auto',
                      fontSize: '0.85rem'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClassroomList;