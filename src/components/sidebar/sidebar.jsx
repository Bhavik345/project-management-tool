import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { SidebarRoutes } from "./sidebar-routes";
import { Logo } from "./logo";
import { logout } from "../../modules/auth/auth-slice";
import { LogOutConfirmationModal } from "../modal/logout-confirmation-modal";


export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handlelogout = () => {
    dispatch(logout());
    localStorage.clear();
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes />
      </div>
      <div
        className="mt-auto p-6 flex items-center cursor-pointer"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </div>

      <LogOutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCancelLogout}
        onlogout={handlelogout}
      />
    </div>
  );
};
