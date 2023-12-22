import {
  FolderDot,
  KanbanIcon,
  Layout,
  PointerOffIcon,
  ProjectorIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const AdminRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: FolderDot,
    label: "Project",
    href: "/admin/projects",
  },
  {
    icon: ProjectorIcon,
    label: "Employee",
    href: "/admin/employee",
  },
  {
    icon: KanbanIcon,
    label: "Resources",
    href: "/admin/resource-management",
  },
];

const employeeRoutes = [
  {
    icon: PointerOffIcon,
    label: "Profile",
    href: "/profile",
  },
];
export const SidebarRoutes = () => {
  // const pathname = useLocation();

  // const isAdminPage = pathname?.includes("/admin");

  // const routes = isAdminPage ? AdminRoutes : employeeRoutes;
  return (
    <div className="flex flex-col w-full">
      {AdminRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
