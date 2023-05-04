import styled from "styled-components";


const TaskDetailContainer = styled.div`

font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
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

  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    font-weight: 500;
    border: 1px solid #e2e2ea;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f3f3f3;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  .download-button {
    align-items: center;
    width: fit-content;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 8px;

    border: none;
    border-radius: 8px;

    cursor: pointer;
    line-height: 1.2;

    background-color: #a6e9ff;
    color: #009dd2;

    transition: 0.3s ease;

    &:hover {
      background-color: #a8e1f5;
    }
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
  TaskDetailContainer,
  FileDetailsContainer,
};
