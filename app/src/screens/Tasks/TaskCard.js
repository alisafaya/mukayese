import { useHistory } from "react-router-dom";
import { useTask } from "../../hooks";

const TaskCard = ({ id, name, short_description, markdown }) => {
  const history = useHistory();
  const { setSelectedTask } = useTask();


  const navigateTaskDetails = () => {
    setSelectedTask({ id, name, short_description, markdown });
    history.push({
      "pathname": `/tasks/${id}`,
    });
  };

  return (
    <div className="datasetcard" onClick={navigateTaskDetails}>
      <div className="dataset-name">{name}</div>
      <div className="dataset-desc">{short_description}</div>
    </div>
  );
};

export default TaskCard;
