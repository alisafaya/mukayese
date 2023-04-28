import React from 'react';
import { LandingMessageContainer } from "./Tasks.styled"


const MainHero = () => {
  return (
    <LandingMessageContainer>
      <div className="messages-div">
        <h1>
          <span className={"span1"}>Welcome to</span>{' '}
          <span className={"span2"}>
            TDD Mukayese
          </span>
        </h1>
        <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
        </p>
      </div>
    </LandingMessageContainer>
  );
};

export default MainHero;