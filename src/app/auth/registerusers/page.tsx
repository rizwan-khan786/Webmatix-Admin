"use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Patient {
//   _id: string;
//   ApplicationID: string;
//   PatientName: string;
//   MobileNo: number;
//   Emailid: string;
//   DoctorName: string;
//   Weight: string;
//   Idcard: string;
// }

// const FetchUsersPage = () => {
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPatients, setTotalPatients] = useState(0);

//   // Set items per page to 5
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://call2connectbackend.onrender.com/api/auth/users', {
//           params: {
//             page: page,
//             limit: itemsPerPage,
//           },
//         });

//         const data = response.data;
//         if (Array.isArray(data.users)) {
//           setPatients(data.users); // Updating to set users instead of patients
//           setTotalPatients(data.total || data.users.length); // Handle total count
//         } else {
//           setPatients([]);
//         }
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setPatients([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [page]);


//   const handleEdit = (patient: Patient) => {
//     setSelectedPatient(patient);
//     setShowModal(true);
//   };

//   const handleDelete = (patient: Patient) => {
//     setSelectedPatient(patient);
//     setShowDeleteModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);
//   const handleCloseDeleteModal = () => setShowDeleteModal(false);

//   const handleUpdatePatient = async (updatedPatient: Patient) => {
//     try {
//       const response = await axios.put(
//         `https://vvcmhospitals.codifyinstitute.org/api/patients/${updatedPatient._id}`,
//         updatedPatient
//       );
//       const updatedPatients = patients.map((p) =>
//         p.ApplicationID === updatedPatient.ApplicationID ? updatedPatient : p
//       );
//       setPatients(updatedPatients);
//       setShowModal(false);
//     } catch (error) {
//       console.error('Error updating patient:', error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (selectedPatient) {
//       try {
//         await axios.delete(
//           `https://vvcmhospitals.codifyinstitute.org/api/patients/${selectedPatient._id}`
//         );
//         setPatients(patients.filter((p) => p.ApplicationID !== selectedPatient.ApplicationID));
//         setShowDeleteModal(false);
//       } catch (error) {
//         console.error('Error deleting patient:', error);
//       }
//     }
//   };

//   // Handle page change
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   // Calculate total pages
//   const totalPages = Math.ceil(totalPatients / itemsPerPage);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Registered Users</h1>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <div>
//           <table className="table-auto w-full mb-4">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">ID</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Mobile No</th>

//               </tr>
//             </thead>
//             <tbody>
//               {patients.map((patient) => (
//                 <tr key={patient.ApplicationID}>
//                   <td className="border px-4 py-2">{patient._id}</td>
//                   <td className="border px-4 py-2">{patient.email}</td>
//                   <td className="border px-4 py-2">{patient.mobileNo}</td>
                

//                   <td className="border px-4 py-2">
//                     {/* <button
//                       className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                       // onClick={() => handleEdit(patient)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                       // onClick={() => handleDelete(patient)}
//                     >
//                       Delete
//                     </button> */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           <div className="flex justify-between items-center mt-4">
//             <button
//               className="bg-gray-300 text-black px-4 py-2 rounded"
//               onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               className="bg-gray-300 text-black px-4 py-2 rounded"
//               onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)}
//               disabled={page === totalPages}
//             >
//               Next
//             </button>
//           </div>

//           {/* Edit Modal */}
//           {showModal && selectedPatient && (
//             <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
//               <div className="bg-white p-6 rounded-lg shadow-xl w-96">
//                 <h2 className="text-2xl font-semibold mb-4">Edit Patient</h2>
//                 <div>
//                   <label className="block mb-2">Name</label>
//                   <input
//                     type="text"
//                     value={selectedPatient.PatientName}
//                     onChange={(e) => setSelectedPatient({ ...selectedPatient, PatientName: e.target.value })}
//                     className="input input-bordered w-full mb-4"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2">Mobile No</label>
//                   <input
//                     type="number"
//                     value={selectedPatient.MobileNo}
//                     onChange={(e) => setSelectedPatient({ ...selectedPatient, MobileNo: parseInt(e.target.value) })}
//                     className="input input-bordered w-full mb-4"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2">Doctor Name</label>
//                   <input
//                     type="text"
//                     value={selectedPatient.DoctorName}
//                     onChange={(e) => setSelectedPatient({ ...selectedPatient, DoctorName: e.target.value })}
//                     className="input input-bordered w-full mb-4"
//                   />
//                 </div>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
//                   onClick={() => handleUpdatePatient(selectedPatient)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="bg-gray-300 text-black px-4 py-2 rounded mt-2 w-full"
//                   onClick={handleCloseModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Delete Modal */}
//           {showDeleteModal && selectedPatient && (
//             <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
//               <div className="bg-white p-6 rounded-lg shadow-xl w-96">
//                 <h2 className="text-2xl font-semibold mb-4">Delete Patient</h2>
//                 <p className="mb-4">Are you sure you want to delete {selectedPatient.PatientName}?</p>
//                 <div className="flex justify-between">
//                   <button
//                     className="bg-gray-300 text-black px-4 py-2 rounded"
//                     onClick={handleCloseDeleteModal}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                     onClick={handleDeletePatient}
//                   >
//                     Confirm
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FetchUsersPage;

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://call2connectbackend.onrender.com/api/auth/users', {
          params: { page, limit: itemsPerPage },
        });
        
        const data = response.data;
        setUsers(Array.isArray(data.users) ? data.users : []);
        setTotalUsers(data.total || data.users.length);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handlePageChange = (newPage) => setPage(newPage);
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  return (
    <div className="container mx-auto px-6 py-10 bg-white shadow-lg rounded-lg">
  <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
    Registered Users
  </h1>

  {loading ? (
    <div className="text-center py-6">
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border px-5 py-3 text-left">ID</th>
            <th className="border px-5 py-3 text-left">Email</th>
            <th className="border px-5 py-3 text-left">Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`border ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition`}
            >
              <td className="border px-5 py-3 text-gray-700">{user._id}</td>
              <td className="border px-5 py-3 text-gray-700">{user.email}</td>
              <td className="border px-5 py-3 text-gray-700">{user.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-5 py-2 rounded-lg font-medium ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition"
          }`}
          onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-5 py-2 rounded-lg font-medium ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition"
          }`}
          onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default FetchUsersPage;
