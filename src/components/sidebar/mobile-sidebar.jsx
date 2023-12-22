// MobileMenu.js

import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

export const MobileSideBar = ({ onToggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onToggle();
    navigate('/');
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="md:hidden px-4 py-2 text-slate-500"
    >
      <Menu size={24} />
    </button>
  );
};

