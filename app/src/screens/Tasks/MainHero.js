import React from 'react';
import { LandingMessageContainer } from "./Tasks.styled"
import Divider from "./Divider";

const MainHero = () => {
  return (
    <LandingMessageContainer>
      <div className="messages-div">
        <h1>
          <span className={"span1"}>
          Mukayese: {' '} 
          </span>
          <span className={"span2"}>
          Turkish NLP Strikes Back
          </span>
        </h1>
        <p className="text"><a href='https://asafaya.me'>Ali Safaya</a>, Emirhan Kurtuluş, Arda Göktoğan, and <a href='http://www.denizyuret.com/'>Deniz Yuret</a></p>
        <p className="text">In Findings of the Association for Computational Linguistics: ACL 2022, pages 846-863, Dublin, Ireland.</p>
        <Divider/>
        <p>
        Turkish Natural Language Processing is left behind in developing state-of-the-art systems due to a lack of organized benchmarks and baselines. We fill this gap with Mukayese (Turkish word for "comparison/benchmarking"), an extensive set of datasets and benchmarks for several Turkish NLP tasks.
        </p>
      </div>
    </LandingMessageContainer>
  );
};

export default MainHero;