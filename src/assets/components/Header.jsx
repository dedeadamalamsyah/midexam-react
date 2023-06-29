import { GiGalaxy } from "react-icons/gi";
import { MdHome, MdInfo } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <GiGalaxy size={24} />
        <div>DSmartphone Store</div>
      </Link>
      <nav>
        <NavLink to="/">
          <MdHome size={24} />
          Home
        </NavLink>
        <NavLink to="/about">
          <MdInfo size={24} />
          About
        </NavLink>
      </nav>
    </header>
  );
}
