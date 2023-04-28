import "./App.css";

import { useMemo, useState } from "react";
import { HashRouter as Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import { Tasks, TaskDetails, TaskSubmit } from "./screens";

import { TaskContext } from "./context";

function App() {
  const [selectedTask, setSelectedTask] = useState(null);

  const taskContext = useMemo(
    () => ({
      selectedTask,
      setSelectedTask,
    }),
    [selectedTask, setSelectedTask]
  );

  return (
    <TaskContext.Provider value={taskContext}>
      <Switch>
        <NavigationBar />
        <Route exact path="/">
          <Tasks />
        </Route>
        <Route exact path="/submit">
          <TaskSubmit />
        </Route>
        <Route path="/tasks/:id">
          <TaskDetails />
        </Route>
      </Switch>
    </TaskContext.Provider>
  );
}

export default App;
