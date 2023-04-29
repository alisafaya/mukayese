import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";

import Logo from "../assets/logo.png";

const Styles = styled.div`
  .tdd-logo {
    height: 50px;
    cursor: pointer;
  }

  .navbar {
    box-shadow: inset 0px -1px 0px #e2e2ea;
    background-color: #fff;
  }
`;

const NavigationBar = () => {

  const navigateHome = () => {
    window.location.assign("https://tdd.ai/");
  };

  return (
    <Styles>
      <Navbar expand="lg">
        <img
          onClick={navigateHome}
          className="tdd-logo"
          src={Logo}
          alt="logo"
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        </div>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;
