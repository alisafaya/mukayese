import React from "react";

import config from "../../config/index.json";

import { SlidesContainer, FlexWrapContainer, FlexWrapReverseContainer } from "./Tasks.styled"

const Product = () => {
  const { product } = config;
  const [firstItem, secondItem] = product.items;
  const bib = `@inproceedings{safaya-etal-2022-mukayese,
    title = "Mukayese: {T}urkish {NLP} Strikes Back",
    author = "Safaya, Ali  and
      Kurtulu{\\c{s}}, Emirhan  and
      Goktogan, Arda  and
      Yuret, Deniz",
    booktitle = "Findings of the Association for Computational Linguistics: ACL 2022",
    month = may,
    year = "2022",
    address = "Dublin, Ireland",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2022.findings-acl.69",
    doi = "10.18653/v1/2022.findings-acl.69",
    pages = "846--863",
}`;

  return (
    <SlidesContainer id="product">
      <div className={"slides-main-div"}>
        <h1 className={"slides-title"}>
        📄 Publication
        </h1>
        <FlexWrapContainer>
          <div className={"img-div"}>
            <a href={firstItem?.url}>
            <img
              className="h-6/6"
              src={firstItem?.img}
              alt={firstItem?.title}
            />
            </a>
          </div>
          <div className={"text-div"}>
            <pre>
              {bib}
            </pre>
            {/* <h3>
              {firstItem?.title}
            </h3>
            <br />
              firstItem?.description.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              )) 
            */}
          </div>
        </FlexWrapContainer>
        <FlexWrapReverseContainer>
          <div className={"img-div"}>
            <a href={secondItem?.url}>
            <img
              className="h-6/6"
              src={secondItem?.img}
              alt={secondItem?.title}
            />
            </a>
          </div>
          <div className={"text-div"}>
            <div className={"align-middle"}>
              <h3>
                {secondItem?.title}
              </h3>
              <p>{secondItem?.description}</p>
            </div>
          </div>
        </FlexWrapReverseContainer>
      </div>
    </SlidesContainer>
  );
};

export default Product;
