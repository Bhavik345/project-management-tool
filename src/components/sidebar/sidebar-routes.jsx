import {
  FlagIcon,
  FolderDot,
  KanbanIcon,
  Layout,
  PointerOffIcon,
  ProjectorIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useSelector } from "react-redux";
import { role } from "../../utils/route-access";

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
  {
    icon: FlagIcon,
    label: "Report",
    href: "/admin/reports",
  },
];

const employeeRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: PointerOffIcon,
    label: "Profile",
    href: "/profile",
  },
];
export const SidebarRoutes = () => {
  const { user } = useSelector((state) => state?.root?.auth);
  const userRole = user && user?.role;

  const AccessRoute = userRole === role.admin ? AdminRoutes : employeeRoutes;
  return (
    <div className="flex flex-col w-full">
      {AccessRoute.map((route) => (
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
