import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const MainHeader = () => {
  return (
    <header id="header-container">
      <div id="site-logo">
        <img src={logo} className="site-title" alt="site-title" />
        <div className="info">
          <NavLink to="/mybookings"><button className="view__bookings-btn btn">My Bookings</button></NavLink>
        <p className="contact">800-710-8420</p>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;


// signOut && SignOut();