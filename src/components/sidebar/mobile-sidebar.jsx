// // MobileMenu.js

// import { useNavigate } from "react-router-dom";
// import { Menu } from "lucide-react";
// import { Sidebar } from "./sidebar";

// export const MobileSideBar = ({ onToggle }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     onToggle();
//     navigate("/");
//   };

//   return (
//     <>
//       <button
//         onClick={handleClick}
//         type="button"
//         className="md:hidden px-4 py-2 text-slate-500"
//       >
//         <Menu size={24} />
//         {/* <Sidebar /> */}
//       </button>
//     </>
//   );
// };
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";

export const MobileSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClick = () => {
    handleToggleSidebar();
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="md:hidden px-4 py-2 text-slate-500"
      >
        <Menu size={24} />
      </button>

      {/* Conditionally render the Sidebar based on the state */}
      {isSidebarOpen && <Sidebar />}
    </>
  );
};
