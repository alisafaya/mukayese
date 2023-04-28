import styled from "styled-components";

const TasksContainer = styled.div`

  overflow: hidden;
  row-gap: 1rem;
  display: grid;
  --tw-bg-opacity: 1;

  .landing-div {
    --tw-bg-opacity: 1;
    position: relative;
  }

  .ladning-div-nested-one {
    max-width: 80rem;
    margin-left: 10rem;
    margin-right: auto;
  }

  .landing-div-nested-two {
    padding-bottom: 8rem;
    max-width: 42rem;
    width: 100%;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    z-index: 10;
    position: relative;
  }

`;

const LandingMessageContainer = styled.main`

margin-top: 7rem;
padding-left: 2rem;
padding-right: 2rem;
max-width: 80rem;
margin-left: auto;
margin-right: auto;

.messages-div {
  text-align: left;
}

h1 {
  font-size: 4rem;
  --tw-text-opacity: 1;
  color: rgba(17, 24, 39, var(--tw-text-opacity));
  letter-spacing: -0.025em;
  font-weight: 800;
}

.span1 {
  display: inline;
  
}

.span2 {
  display: inline;
  --tw-text-opacity: 1;
  color: rgba(77, 199, 239, var(--tw-text-opacity));
}


p {
  margin-left: 0px;
  margin-right: 0px;
  font-size: 1.25rem;
  margin-top: 1.25rem;
  max-width: 36rem;
  --tw-text-opacity: 1;
  color: rgba(107, 114, 128, var(--tw-text-opacity));
}

`;

const SlidesContainer = styled.section`
  padding-top: 2rem;
  padding-bottom: 2rem;
  --tw-bg-opacity: 1;

  .slides-main-div {
    max-width: 64rem;
    margin-left: auto !important;
    margin-right: auto !important;
    margin: 2rem;
    width: 100%;
  }

  h1 {
    --tw-bg-opacity: 1;
    color: rgba(107, 114, 128, var(--tw-text-opacity));
    line-height: 1.25;
    font-weight: 700;
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

  .text-div {
    width: 50%;
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .img-div {
    width: 50%;
    padding: 1.5rem;
  }

  h3 {
    --tw-text-opacity: 1;
    color: rgba(31, 41, 55, var(--tw-text-opacity));
    line-height: 1;
    font-weight: 700;
    font-size: 1.875rem;
    margin-bottom: 0.75rem;
  }

  p {
    --tw-text-opacity: 1;
    color: rgba(75, 85, 99, var(--tw-text-opacity));
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
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
    margin-top: 2rem;
  }
  
  .align-middle {
    vertical-align: middle;
  }

  h3 {
    --tw-text-opacity: 1;
    color: rgba(31, 41, 55, var(--tw-text-opacity));
    line-height: 1;
    font-weight: 700;
    font-size: 1.875rem;
    margin-bottom: 0.75rem;
  }

  p {
    --tw-text-opacity: 1;
    color: rgba(75, 85, 99, var(--tw-text-opacity));
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
    width: 16rem;
    height: 0.25rem;
    margin-bottom: 2.5rem;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TaskCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 50px;
  margin-left: 6rem;
  margin-right: 6rem;
  row-gap: 2rem;
`;

const TasksGridContainer = styled.div`

font-family: 'Helvetica';
display: flex;
flex-direction: row;
width: 100%;
padding-top: 2rem;

.filters-c {
  flex: 1;
  display: flex;
  width: 30%;
  height: 100%;
  padding: 20px 40px;
  flex-direction: column;
}

.datasetcard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 12px;
  background: #f3f3f3;
  cursor: pointer;
  width: 100%;
  height: 100%;
  
  transition: background 0.3s ease;
  
  &:hover {
    background: #e0e0e0;
  }
}

.datasets-c {
  flex: 2;
  width: 60%;
  height: 100%;
  border-left: 1px solid #e2e2ea;
}

.datasets-title {
  margin-bottom: 0px;
  --tw-bg-opacity: 1;
  color: rgba(107, 114, 128, var(--tw-text-opacity));
  line-height: 1.25;
  font-weight: 700;
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
  padding: 5px;
  color: rgba(33, 37, 41, 0.8);
  &:hover {
    background-color: #f8f9fa;
    border-radius: 5px;
  }
}

.datasets-c {
  padding: 20px 40px;
}


h3 {
  font-size: 12px;
  font-weight: bold;
}

.dataset-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  font-size: 12px;
  &:hover {
    -webkit-line-clamp: 12; /* number of lines to show */
  }
}

.dataset-name {
  font-weight: bolder;
}

.download-button {
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 5px 10px;
  margin-top: 8px;
  
  border: none;
  border-radius: 8px;
  
  cursor: pointer;
  font-size: 12px;
  line-height: 1.2;
  
  background-color: #a6e9ff;
  color: #009dd2;
  
  font-weight: 500;
  width: fit-content;
  
  transition: 0.3s ease;
  
  &:hover {
    background-color: #009dd2;
    color: white;
  }
}
`;



export { TasksContainer, LandingMessageContainer, SlidesContainer, DividerContainer, FlexWrapContainer, FlexWrapReverseContainer, TasksGridContainer, TaskCardsContainer };
