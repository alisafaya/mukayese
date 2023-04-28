import React from "react";

import config from "../../config/index.json";
import Divider from "./Divider";

import { SlidesContainer, FlexWrapContainer, FlexWrapReverseContainer } from "./Tasks.styled"

import logo from "../../assets/tdd_logo.png"



const Product = () => {
  const { product } = config;
  const [firstItem, secondItem] = product.items;

  return (
    <SlidesContainer id="product">
      <div className={"slides-main-div"}>
        <h1>
          {product.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index > 1 ? 'span2' : 'span1'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />
        <FlexWrapContainer>
          <div className={"text-div"}>
            <h3>
              {firstItem?.title}
            </h3>
            <p>{firstItem?.description}</p>
          </div>
          <div className={"img-div"}>
            <img
              className="h-6/6"
              src={firstItem?.img}
              // src={logo}
              alt={firstItem?.title}
            />
          </div>
        </FlexWrapContainer>
        <FlexWrapReverseContainer>
          <div className={"img-div"}>
            <img
              className="h-6/6"
              src={secondItem?.img}
              // src={logo}
              alt={secondItem?.title}
            />
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
