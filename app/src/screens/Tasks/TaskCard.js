import { useHistory } from "react-router-dom";

const TaskCard = ({ id, name, short_description, markdown }) => {
  const history = useHistory();
  
  const navigateTaskDetails = () => {
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
