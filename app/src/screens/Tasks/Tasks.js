import { useEffect, useState } from "react";

import { listTasks } from "../../services/TaskService";

import { TasksGridContainer, TaskCardsContainer, TasksContainer } from "./Tasks.styled";
import TaskCard from "./TaskCard";
import MainHero from "./MainHero";
import Slides from "./Slides";
import Divider from "./Divider";

const Tasks = () => {

  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    listTasks().then((r) => {
      setTasks(r);
    });
  }, []);

  return (
      <TasksContainer>
        <div className={"ladning-div"}>
          <div className={"ladning-div-nested-one"}>
            <div className={"landing-div-nested-two"}>
              <MainHero />
            </div>
          </div>
        </div>

        <Slides />
        <TasksGridContainer>
          <div className="datasets-c">
            <div
              style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              }}
            >
              <h2 className="datasets-title">Tasks</h2>
            </div>
            <Divider />
            <TaskCardsContainer>
              {tasks?.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </TaskCardsContainer>
          </div>
        </TasksGridContainer>
      </TasksContainer>
  );
};

export default Tasks;
