import React from "react";

import config from "../../config/index.json";
import Divider from "./Divider";

import { SlidesContainer, FlexWrapContainer, FlexWrapReverseContainer } from "./Tasks.styled"

const Product = () => {
  const { product } = config;
  const [firstItem, secondItem] = product.items;

  return (
    <SlidesContainer id="product">
      <div className={"slides-main-div"}>
        {/* <h1>
          {product.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index > 0 ? 'span2' : 'span1'}
            >
              {word}{' '}
            </span>
          ))}
        </h1> */}
        <Divider />
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
            <h3>
              {firstItem?.title}
            </h3>
            <br />
            {/* for each line in description print a paragraph */
              firstItem?.description.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              )) 
            }
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
