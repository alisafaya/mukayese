import styled from "styled-components";

const TasksContainer = styled.div`

  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  // overflow: hidden;
  row-gap: 1rem;
  display: grid;
  --tw-bg-opacity: 1;
  

  .landing-div {
    --tw-bg-opacity: 1;
    position: relative;
    margin-top: -1px;
    height: 100%;
    max-width: 100%;

  }

  .landing-div-nested-one {
    margin-left: 10%;
    margin-right: 10%;
  }

  .landing-div-nested-two {
    width: 100%;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    z-index: 10;
    position: relative;
  }
`;

const LandingMessageContainer = styled.main`

font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";

margin-top: 1rem;
padding-left: 10%;
padding-right: 10%;
margin-left: auto;
margin-right: auto;

.messages-div {
  text-align: left;
}

h1 {
  text-align: center;
  font-size: 3vw;
  font-variant: small-caps;
  --tw-text-opacity: 1;
  color: rgba(17, 24, 39, var(--tw-text-opacity));
  // letter-spacing: -0.05em;
  font-weight: 500;
  margin: 1.5rem;

  @media screen and (max-width: 600px) {
    font-size: 10vw;
  }
}

.span1 {
  display: inline;
}

.span2 {
  display: inline;
  --tw-text-opacity: 1;
  color: rgba(77, 199, 239, var(--tw-text-opacity));
}

p, a {
  font-size: 1.2rem;
  text-align: justify;
  margin-top: 1.0rem;
  --tw-text-opacity: 1;
  color: rgba(59, 66, 79, var(--tw-text-opacity));
}

.text {
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin-top: -1.0rem;
  --tw-text-opacity: 1;
  color: rgba(59, 66, 79, var(--tw-text-opacity));
}

`;

const SlidesContainer = styled.div`
  font-family: "Helvetica";
  display: flex;
  padding-top: 2rem;
  padding-bottom: 2rem;
  --tw-bg-opacity: 1;
  // margin-left: 10%;
  // margin-right: 10%;
  max-width: 100%;

  .slides-main-div {
    margin-left: 10%;
    margin-right: 10%;
  }

  h1 {
    margin-bottom: 0px;
    --tw-bg-opacity: 1;
    color: rgba(107, 114, 128, var(--tw-text-opacity));
    line-height: 1.25;
    font-weight: 500;
    font-variant: small-caps;
    font-size: 3rem;
    text-align: center;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

  .span1 {
    --tw-text-opacity: 1;
    color: rgba(26, 46, 53, var(--tw-text-opacity));
  }

  .span2 {
    --tw-text-opacity: 1;
    color: rgba(77, 199, 239, var(--tw-text-opacity));
  }

`;

const FlexWrapContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin-left: 10%;
  margin-right: 10%;

  .text-div {
    width: 50%;
    text-align: justify;
    padding: 5%;
  }

  .img-div {
    width: 50%;
    padding: 5%;

  }

  img {
    width: 100%;
    &:hover {
      transform: scale(1.5);
      transition: transform 0.5s ease;
      border-radius: 0.25rem;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    }
  }

  h3 {
    --tw-text-opacity: 1;
    color: rgba(31, 41, 55, var(--tw-text-opacity));
    line-height: 1;
    font-weight: 500;
    font-size: 1.875rem;
    margin-bottom: 0.75rem;
  }

  p {
    max-width: 80%;
    --tw-text-opacity: 1;
    color: rgba(75, 85, 99, var(--tw-text-opacity));
  }
`;

const FlexWrapReverseContainer = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;

  .img-div {
    width: 50%;
    padding: 1.5rem;
  }

  .text-div {
    width: 50%;
    padding: 1.5rem;
  }

  .align-middle {
    vertical-align: middle;
  }

  h3 {
    --tw-text-opacity: 1;
    color: rgba(31, 41, 55, var(--tw-text-opacity));
    line-height: 1;
    font-weight: 500;
    font-size: 1.875rem;
    margin-bottom: 0.75rem;
  }

  p {
    --tw-text-opacity: 1;
    // color: rgba(75, 85, 99, var(--tw-text-opacity));
    margin-bottom: 2rem;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
`;

const DividerContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  .divider {
    opacity: 1;
    padding-top: 0px;
    padding-bottom: 0px;
    --tw-bg-opacity: 1;
    background-color: rgba(77, 199, 239, var(--tw-bg-opacity));
    border-top-left-radius: 0.25rem;border-top-right-radius: 0.25rem;
    width: 40%;
    height: 0.25rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TaskCardsContainer = styled.div`

display: grid;
grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
padding-left: 10%;
padding-right: 10%;
width: 100%;
row-gap: 2rem;
column-gap: 2rem;

`;

const TasksGridContainer = styled.div`

font-family: 'Helvetica';
display: flex;
flex-direction: row;
width: 100%;

.datasetcard {
  display: overflow;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 12px;
  background: #F6F1F1;
  cursor: pointer;
  width: 100%;
  height: 100%;
  transition: background 0.3s ease;
  
  &:hover {
    background: #e0e0e0;
  }
}

.datasets-c {
  flex: 1;
  width: 60%;
  height: 100%;
  border-left: 1px solid #e2e2ea;
}

.datasets-title {
  margin-bottom: 0px;
  --tw-bg-opacity: 1;
  color: rgba(107, 114, 128, var(--tw-text-opacity));
  line-height: 1.25;
  font-weight: 500;
  font-variant: small-caps;
  font-size: 3rem;
  text-align: center;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.tags-c {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}

.expand {
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;
  color: rgba(33, 37, 41, 0.8);
  &:hover {
    background-color: #f8f9fa;
    border-radius: 5px;
  }
}

h3 {
  font-size: 12px;
  font-weight: 500;
}

.dataset-desc {
  margin-top: 0.2rem;
  overflow: hidden;
  text-align: justify;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  font-size: 0.9rem;
  &:hover {
    -webkit-line-clamp: 12; /* number of lines to show */
  }
}

.dataset-name {
  font-weight: 500;
  text-align: center;
  font-size: 1.5rem;
}

`;



export { TasksContainer, LandingMessageContainer, SlidesContainer, DividerContainer, FlexWrapContainer, FlexWrapReverseContainer, TasksGridContainer, TaskCardsContainer };
