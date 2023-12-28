import { useLocation, useNavigate } from "react-router-dom";

export const SidebarItem = ({ icon: Icon, label, href }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    navigate(href);
  };

  return (
    <button
  onClick={onClick}
  type="button"
  className={`flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all 
    ${isActive ? "text-blue-800 scale-110 bg-blue-200 transition-all ease-in-out" : "text-slate-500"}
    hover:text-blue-500 
  `}
>
  <div className="flex items-center gap-x-2 py-4">
    <Icon
      size={22}
      className={`${isActive && "text-blue-800"} `}
    />
    {label}
  </div>
  <div
    className={`ml-auto opacity-0 border-2 border-sky-700 h-full transition-all
      ${isActive && "opacity-100"}`}
  />
</button>

  );
};
