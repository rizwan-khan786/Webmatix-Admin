// "use client";

// import { useEffect, useState } from "react";

// interface InstanceData {
//   instance_id: string;
//   access_token: string;
// }

// const HospitalMap = () => {
//   const [instanceData, setInstanceData] = useState<InstanceData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [newInstanceId, setNewInstanceId] = useState<string>("");
//   const [newAccessToken, setNewAccessToken] = useState<string>("");
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     if (token) {
//       fetchInstanceData();
//     }
//   }, [token]);

//   const fetchInstanceData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("https://call2connectapiv2.codifyinstitute.com/api/instance", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch instance data");

//       const result = await response.json();
//       console.log("Fetched Data:", result);

//       if (result.success && result.data) {
//         setInstanceData({
//           instance_id: result.data.instance_id,
//           access_token: result.data.access_token,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching instance data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddInstance = async () => {
//     try {
//       const response = await fetch("https://call2connectapiv2.codifyinstitute.com/api/instance", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           instance_id: newInstanceId,
//           access_token: newAccessToken,
//         }),
//       });
  
//       if (!response.ok) throw new Error("Failed to add instance");
  
//       const result = await response.json();
//       console.log("Instance Added:", result);
  
//       if (result.success && result.data) {
//         setInstanceData({
//           instance_id: result.data.instance_id,
//           access_token: result.data.access_token,
//         });
  
//         // Wait briefly before reloading to ensure UI updates
//         setTimeout(() => {
//           window.location.reload();
//         }, 500);
//       }
//     } catch (error) {
//       console.error("Error adding instance:", error);
//     }
//   };
  

//   // const handleAddInstance = async () => {
//   //   try {
//   //     const response = await fetch("https://call2connectapiv2.codifyinstitute.com/api/instance", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify({
//   //         instance_id: newInstanceId,
//   //         access_token: newAccessToken,
//   //       }),
//   //     });

//   //     if (!response.ok) throw new Error("Failed to add instance");

//   //     const result = await response.json();
//   //     console.log("Instance Added:", result);

//   //     if (result.success && result.data) {
//   //       setInstanceData({
//   //         instance_id: result.data.instance_id,
//   //         access_token: result.data.access_token,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error adding instance:", error);
//   //   }
//   // };

//   return (
//     <div className="p-4 sm:p-8">
//       <h1 className="text-center text-3xl font-semibold mb-6">Instance Info</h1>

//       {loading ? (
//         <p className="text-center italic text-gray-600">Fetching instance data...</p>
//       ) : instanceData ? (
//         <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6 text-center">
//           <p><strong>Instance ID:</strong> {instanceData.instance_id}</p>
//           <p><strong>Access Token:</strong> {instanceData.access_token}</p>
//         </div>
//       ) : (
//         <div className="text-center">
//           <p className="italic text-gray-600 mb-4">No instance available. Add one below:</p>
//           <input
//             type="text"
//             placeholder="Enter Instance ID"
//             value={newInstanceId}
//             onChange={(e) => setNewInstanceId(e.target.value)}
//             className="border p-2 rounded-md w-full mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Enter Access Token"
//             value={newAccessToken}
//             onChange={(e) => setNewAccessToken(e.target.value)}
//             className="border p-2 rounded-md w-full mb-4"
//           />
//           <button
//             onClick={handleAddInstance}
//             className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Add Instance
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HospitalMap;


"use client";

import { useEffect, useState } from "react";

interface InstanceData {
  instance_id: string;
  access_token: string;
}

const HospitalMap = () => {
  const [instanceData, setInstanceData] = useState<InstanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newInstanceId, setNewInstanceId] = useState<string>("");
  const [newAccessToken, setNewAccessToken] = useState<string>("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) {
      fetchInstanceData();
    }
  }, [token]);

  const fetchInstanceData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://call2connectapiv2.codifyinstitute.com/api/instance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch instance data");

      const result = await response.json();
      console.log("Fetched Data:", result);

      if (result.success && result.data) {
        setInstanceData({
          instance_id: result.data.instance_id,
          access_token: result.data.access_token,
        });
      }
    } catch (error) {
      console.error("Error fetching instance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInstance = async () => {
    try {
      const response = await fetch("https://call2connectapiv2.codifyinstitute.com/api/instance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          instance_id: newInstanceId,
          access_token: newAccessToken,
        }),
      });

      if (!response.ok) throw new Error("Failed to add instance");

      const result = await response.json();
      console.log("Instance Added:", result);

      if (result.success && result.data) {
        setInstanceData({
          instance_id: result.data.instance_id,
          access_token: result.data.access_token,
        });

        // Reload page after success
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Error adding instance:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Instance Information
        </h1>

        {loading ? (
          <p className="text-center italic text-gray-500">Fetching instance data...</p>
        ) : instanceData ? (
          <div className="bg-gray-50 p-6 rounded-md shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700">
              <span className="text-blue-600">Instance ID:</span> {instanceData.instance_id}
            </p>
            <p className="text-lg font-semibold text-gray-700 mt-2">
              <span className="text-blue-600">Access Token:</span> {instanceData.access_token}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 italic mb-4">No instance available. Add one below:</p>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Instance ID"
                value={newInstanceId}
                onChange={(e) => setNewInstanceId(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter Access Token"
                value={newAccessToken}
                onChange={(e) => setNewAccessToken(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddInstance}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Instance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalMap;
