import styled from "styled-components";


const TaskDetailContainer = styled.div`

font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";

display: flex;
flex-direction: row;
max-width: 70%;
margin: auto;

@media screen and (max-width: 600px) {
  max-width: 100%;
}

h1 {
  text-align: center;
  font-size: 3vw;
  font-variant: small-caps;
  --tw-text-opacity: 1;
  color: rgba(17, 24, 39, var(--tw-text-opacity));
  font-weight: 500;
  margin: 1.5rem;

  @media screen and (max-width: 600px) {
    font-size: 10vw;
  }
}

h2 {
  text-align: center;
}

h2, h3, h4 {
  --tw-text-opacity: 1;
  color: rgba(31, 41, 55, var(--tw-text-opacity));
  line-height: 1;
  font-weight: 500;
  margin: 1.5rem;

  @media screen and (max-width: 600px) {
    font-size: 8vw;
  }
}

div > p {
  font-size: 1.1rem;
  text-align: justify;
  margin: 0.25rem;
  --tw-text-opacity: 1;
  color: rgba(59, 66, 79, var(--tw-text-opacity));
}

li, li > p {
  font-size: 0.9rem;
  margin: 0.25rem;
  --tw-text-opacity: 0.8;
  color: rgba(59, 66, 79, var(--tw-text-opacity));
}

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
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
}

td, th {
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
