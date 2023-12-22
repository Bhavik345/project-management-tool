import { SidebarRoutes } from "./sidebar-routes";
import { Logo } from "./logo";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes />

        {/* ------------ Logout Button ------------ */}
        <div className="flex justify-center align-middle mt-auto mb-4">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
