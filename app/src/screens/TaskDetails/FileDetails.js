import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"
import { FileDetailsContainer } from "./TaskDetails.styled";

const FileDetails = ({ markdown }) => {
  const history = useHistory()

  const navigateSubmit = () => {
    history.push({
      "pathname": "/submit",
    });
  };

  return (
    <FileDetailsContainer>
      <div className="button-container">
        <button onClick={navigateSubmit} className="download-button">
          Submit a new task
        </button>
      </div>
      <ReactMarkdown remarkPlugins={[gfm]} children={markdown} />
    </FileDetailsContainer>

  );
};

export default FileDetails;
