// 'use client';

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = () => {
//       const user = localStorage.getItem("user");
//       if (!user) {
//         setIsAuthenticated(false);
//         router.replace("/login");
//       } else {
//         setIsAuthenticated(true);
//       }
//     };

//     checkAuth();
//   }, [router]);

//   if (isAuthenticated === null) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div>Loading...</div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div>Redirecting to login...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
 
//       <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

 
//       <div className="flex-1 flex flex-col ml-64"> {/* ml-64 to leave space for the sidebar */}
 
//         <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

       
//         <main className="flex-1 overflow-y-auto p-6 mt-16">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        setIsAuthenticated(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div>Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Dynamically adjusting margin-left based on sidebar state */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ml-${isSidebarOpen ? '64' : '0'} md:ml-64`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
