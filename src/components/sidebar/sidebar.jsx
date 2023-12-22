import { SidebarRoutes } from "./sidebar-routes";
import { Logo } from "./logo";
import { LogOut } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes />

       
      </div>
      <div className="mt-auto p-6 flex items-center cursor-pointer">
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </div>
    </div>
  );
};
