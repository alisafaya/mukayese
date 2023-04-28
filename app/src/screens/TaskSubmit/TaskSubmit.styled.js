import styled from "styled-components";

const TaskSubmitContainer = styled.div`
  font-family: 'Georgia,Cambria,serif';
  display: flex;
  flex-direction: row;
  padding: 50px 250px;
  width: 100%;

  blockquote {
    background: #f5f5f5;
    padding: 16px;
    border-left: 8px solid #d2d2d2;
  }

  blockquote p {
    margin-bottom: 0;
  }

  pre {
    white-space: pre-wrap;
  }

`;

const FileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  padding-left: 10rem;
  padding-right: 10rem;
`;

export {
  TaskSubmitContainer,
  FileDetailsContainer,
};
