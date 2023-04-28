import { useContext } from "react";
import { TaskContext } from "../context";

export const useTask = () => useContext(TaskContext);
