import { useEffect, useState } from "react";

import { listTasks } from "../../services/TaskService";

import { TasksGridContainer, TaskCardsContainer, TasksContainer } from "./Tasks.styled";
import TaskCard from "./TaskCard";
import MainHero from "./MainHero";
import Slides from "./Slides";

const Tasks = () => {

  const [tasks, setTasks] = useState(null);
  const [llm_tasks, setLlmTasks] = useState(null);

  useEffect(() => {
    listTasks("nlp").then((r) => {
      setTasks(r);
    });
    listTasks("llm").then((r) => {
      setLlmTasks(r);
    });
  }, []);

  return (
    <TasksContainer>
      <div className={"landing-div"}>
        <div className={"landing-div-nested-one"}>
          <div className={"landing-div-nested-two"}>
            <MainHero />
          </div>
        </div>
      </div>
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
            <h2 className="datasets-title">MukayeseLLM Benchmark</h2>
          </div>
          <TaskCardsContainer>
            {llm_tasks?.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </TaskCardsContainer>
        </div>
      </TasksGridContainer>

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
            <h2 className="datasets-title">Mukayese NLP Benchmarks</h2>
          </div>
          <TaskCardsContainer>
            {tasks?.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </TaskCardsContainer>
        </div>
      </TasksGridContainer>
      <Slides />
    </TasksContainer>

  );
};

export default Tasks;
