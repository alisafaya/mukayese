import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import { TaskDetailContainer } from "./TaskDetails.styled";
import { getTask } from "../../services/TaskService";
import FileDetails from "./FileDetails";

const TaskDetails = () => {
  
  const {
    params: { id },
  } = useRouteMatch();

  const [task, setTask] = useState(null);
  const [markdown, setMarkdown] = useState(null);

  useEffect(() => {
    getTask(id).then((r) => {
      setTask(r[0])
      setMarkdown(r[1])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return task  ? (
    <TaskDetailContainer>
      <FileDetails  markdown={markdown} />
    </TaskDetailContainer>
  ) : null;
};

export default TaskDetails;
