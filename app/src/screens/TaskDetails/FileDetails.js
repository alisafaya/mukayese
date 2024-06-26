import { useHistory } from "react-router-dom";
import { FileDetailsContainer } from "./TaskDetails.styled";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import rehypeRaw from "rehype-raw"; // Import rehype-raw

const FileDetails = ({ markdown }) => {
  const history = useHistory();

  const navigateSubmit = () => {
    history.push({
      pathname: "/submit"
    });
  };

  return (
    <FileDetailsContainer>
      <div className="button-container">
        <button onClick={navigateSubmit} className="download-button">
          Submit a new result
        </button>
      </div>
      {/* Add rehypeRaw to allow raw HTML */}
      <ReactMarkdown
        remarkPlugins={[gfm, emoji]}
        rehypePlugins={[rehypeRaw]} // Add rehypeRaw plugin
        children={markdown}
      />
    </FileDetailsContainer>
  );
};

export default FileDetails;
