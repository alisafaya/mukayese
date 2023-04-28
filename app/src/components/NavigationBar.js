import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import StorageService from "../services/StorageService";
import { Link } from "react-router-dom";

import Logo from "../assets/TDD-eng-color.png";
import {useState, useEffect } from "react";

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
  const [token, setToken] = useState(StorageService.getAccessToken());
  const [fullName, setFullName] = useState(StorageService.getFullName());

  const navigateHome = () => {
    window.location.assign("https://tdd.ai/");
  };

  useEffect(() =>{
    setToken(StorageService.getAccessToken())
    setFullName(StorageService.getFullName())
  })
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
