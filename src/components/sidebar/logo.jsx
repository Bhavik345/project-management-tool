import { Link } from "react-router-dom";
import SideBarLogo from "../../assets/images/logo.svg";
export const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        <img height={130} width={130} alt="logo" src={SideBarLogo} />
      </Link>
    </>
  );
};
