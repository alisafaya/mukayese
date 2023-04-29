import gfm from "remark-gfm"
import ReactMarkdown from "react-markdown";

import { useState, useEffect } from "react";

import { TaskSubmitContainer, FileDetailsContainer } from "./TaskSubmit.styled";
import { getSubmitFile } from "../../services/TaskService";

const TaskSubmit = () => {

  const [markdown, setMarkdown] = useState(null);

  useEffect(() => {
    getSubmitFile().then((r) => {
      setMarkdown(r)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return markdown  ? (
    <TaskSubmitContainer>
      <FileDetailsContainer>
        <ReactMarkdown remarkPlugins={[gfm]} children={markdown} />
      </FileDetailsContainer>
    </TaskSubmitContainer>
  ) : null;
};

export default TaskSubmit;
