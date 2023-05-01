import styled from "styled-components";
import { Link }  from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';

import Logo from "../assets/logo.png";
import { TDD_URL, DATASETS_URL, ABOUT_PATH, CONTRIBUTORS_PATH } from "../constants/Routes"

const Styles = styled.div`
  .tdd-logo {
    height: 50px;
    cursor: pointer;
    padding-left: 10rem;
    padding-right: 2rem;
  }

  .navbar {
    box-shadow: inset 0px -1px 0px #e2e2ea;
    background-color: #fff;
  }

  .nav-item {
    margin-right: 1rem;
    --tw-text-opacity: 1;
    font-size: 1.2rem;
  }

  .nav-link {
    color: #000000;
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
        <Navbar.Toggle aria-controls="navbarNav"/>
        <Navbar.Collapse className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item px-2">
              <Nav.Link className="nav-link" href={TDD_URL}>
                TDD Project
              </Nav.Link>
            </li>
            <li className="nav-item px-2">
              <Nav.Link className="nav-link" href={DATASETS_URL}>
                Datasets
              </Nav.Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to={"/"}>
                Leaderboards
              </Link>
            </li>
            <li className="nav-item px-2">
              <Nav.Link className="nav-link" href={ABOUT_PATH}>
                About
              </Nav.Link>
            </li>
            <li className="nav-item px-2">
              <Nav.Link className="nav-link" href={CONTRIBUTORS_PATH}>
                Contributors
              </Nav.Link>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;
