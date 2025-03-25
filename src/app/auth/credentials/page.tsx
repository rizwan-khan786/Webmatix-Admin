

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

//         // Reload page after success
//         setTimeout(() => {
//           window.location.reload();
//         }, 500);
//       }
//     } catch (error) {
//       console.error("Error adding instance:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
//           Instance Information
//         </h1>

//         {loading ? (
//           <p className="text-center italic text-gray-500">Fetching instance data...</p>
//         ) : instanceData ? (
//           <div className="bg-gray-50 p-6 rounded-md shadow-md text-center">
//             <p className="text-lg font-semibold text-gray-700">
//               <span className="text-blue-600">Instance ID:</span> {instanceData.instance_id}
//             </p>
//             <p className="text-lg font-semibold text-gray-700 mt-2">
//               <span className="text-blue-600">Access Token:</span> {instanceData.access_token}
//             </p>
//           </div>
//         ) : (
//           <div className="text-center">
//             <p className="text-gray-600 italic mb-4">No instance available. Add one below:</p>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Enter Instance ID"
//                 value={newInstanceId}
//                 onChange={(e) => setNewInstanceId(e.target.value)}
//                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="mb-6">
//               <input
//                 type="text"
//                 placeholder="Enter Access Token"
//                 value={newAccessToken}
//                 onChange={(e) => setNewAccessToken(e.target.value)}
//                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button
//               onClick={handleAddInstance}
//               className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
//             >
//               Add Instance
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HospitalMap;

"use client";

import React, { useEffect, useState } from "react";

interface InstanceData {
  instance_id: string;
  access_token: string;
}

export default function CredentialsPage() {
  const [instanceData, setInstanceData] = useState<InstanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [newInstanceId, setNewInstanceId] = useState<string>("");
  const [newAccessToken, setNewAccessToken] = useState<string>("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const API_BASE_URL = "https://call2connectapiv2.codifyinstitute.com/api";

  useEffect(() => {
    if (token) {
      fetchInstanceData();
    } else {
      setLoading(false);
      setError("No authentication token found. Please log in.");
    }
  }, [token]);

  const fetchInstanceData = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        throw new Error("Authentication token is required");
      }

      const response = await fetch(`${API_BASE_URL}/instance`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          setInstanceData(null);
          setLoading(false);
          return;
        }
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.success && result.data) {
        setInstanceData({
          instance_id: result.data.instance_id,
          access_token: result.data.access_token,
        });
      } else {
        setInstanceData(null);
      }
    } catch (error) {
      console.error("Error fetching instance data:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch instance data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddInstance = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError("Authentication token is required");
      return;
    }

    if (!newInstanceId.trim() || !newAccessToken.trim()) {
      setError("Please fill in both Instance ID and Access Token");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(`${API_BASE_URL}/instance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: JSON.stringify({
          instance_id: newInstanceId.trim(),
          access_token: newAccessToken.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.success && result.data) {
        setInstanceData({
          instance_id: result.data.instance_id,
          access_token: result.data.access_token,
        });
        setNewInstanceId("");
        setNewAccessToken("");
        setError("");
      } else {
        throw new Error("Failed to add instance: Invalid response format");
      }
    } catch (error) {
      console.error("Error adding instance:", error);
      setError(error instanceof Error ? error.message : "Failed to add instance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Instance Information
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 italic text-gray-500">Loading...</p>
          </div>
        ) : instanceData ? (
          <div className="bg-gray-50 p-6 rounded-md shadow-md">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              <span className="text-blue-600">Instance ID:</span>{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">{instanceData.instance_id}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="text-blue-600">Access Token:</span>{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded break-all">{instanceData.access_token}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleAddInstance} className="space-y-4">
            <p className="text-gray-600 italic mb-4">No instance available. Add one below:</p>
            <div>
              <label htmlFor="instanceId" className="block text-sm font-medium text-gray-700 mb-1">
                Instance ID
              </label>
              <input
                id="instanceId"
                type="text"
                placeholder="Enter Instance ID"
                value={newInstanceId}
                onChange={(e) => setNewInstanceId(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700 mb-1">
                Access Token
              </label>
              <input
                id="accessToken"
                type="text"
                placeholder="Enter Access Token"
                value={newAccessToken}
                onChange={(e) => setNewAccessToken(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Instance..." : "Add Instance"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}