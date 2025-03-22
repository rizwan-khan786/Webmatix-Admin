// 'use client';

// import { Menu } from "lucide-react";

// interface NavbarProps {
//   toggleSidebar: () => void;
// }

// export default function Navbar({ toggleSidebar }: NavbarProps) {
//   return (
//     <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-900 to-blue-800 text-white p-4 flex items-center justify-between shadow-lg z-50">
//       {/* Sidebar Toggle Button for Mobile */}
//       <button className="md:hidden text-gray-300 hover:text-white transition" onClick={toggleSidebar}>
//         <Menu className="w-6 h-6" />
//       </button>

//       <div className="flex items-center">
//         <img 
//           src="https://vvcmcpms.codifyinstitute.org/assets/logo-B2kmi-Bw.jpeg" 
//           className="h-10 w-15 mr-5" 
//           alt="logo" 
//         />
//         <h1 className="text-lg font-bold tracking-wide">VVCMC Master Admin Panel</h1>
//       </div>
//     </nav>
//   );
// }


'use client';

import { Menu, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Retrieve the user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    // Clear user data from localStorage and redirect to login page
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-900 to-blue-800 text-white p-4 flex items-center justify-between shadow-lg z-50">
      {/* Sidebar Toggle Button for Mobile */}
      <button className="md:hidden text-gray-300 hover:text-white transition" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center">
        <img 
          src="https://official.webmatixmarketing.com/media-storage/logo/6700d6a8e6a27---1920x1080-white-back.png" 
          className="h-10 w-15 mr-5" 
          alt="logo" 
        />
        {/* <h1 className="text-lg font-bold tracking-wide">Webmatix Admin</h1> */}
      </div>

      {/* User Profile and Logout Dropdown */}
      <div className="relative">
        <button
          className="flex items-center text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <User className="w-6 h-6 mr-2" />
          <span>{user?.UserName || "User"}</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-md">
            <div className="p-4 border-b bg-gray-100 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <User className="w-10 h-10 text-purple-600" />
                <div>
                  <p className="font-semibold text-lg">{user?.UserName}</p>
                  <p className="text-sm text-gray-500">{user?.Role}</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Email:</span>
                <span className="font-semibold">{user?.email}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Mobile No:</span>
                <span className="font-semibold">{user?.mobileNo}</span>
              </div>
             
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left p-2 text-red-500 hover:bg-gray-100 rounded-b-lg text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
