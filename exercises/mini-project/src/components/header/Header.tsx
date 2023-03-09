import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { FC } from "react";

interface Props {
  signOut: ((data?: any | undefined) => void) | undefined
}

const Header:FC<Props> = ({signOut}) => {
  const signout = () => {
    signOut && signOut();
  }
  return (
    <header id="header-container">
      <div id="site-logo">
        <img src={logo} className="site-title" alt="site-title" />
        <div className="info">
          <NavLink to="/"><button onClick={signout} className="sign__out-btn btn">Sign Out</button></NavLink>
        <p className="contact">800-710-8420</p>
        </div>
      </div>
    </header>
  );
}

export default Header;


// signOut && SignOut();