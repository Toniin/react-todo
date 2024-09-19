import Button from "../../sharedComponents/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store.ts";
import {taskModel} from "../../models/task.model.ts";

const ActionsBar = ({tasks}: {tasks: taskModel[]}) => {
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const addTask = () => {
    navigate("/add-task");
  };

  const allTasksFilter = () => {
    dispatch({ type: "ALL_TASKS", payload: tasks });
  };

  const todoTasksFilter = () => {
    dispatch({ type: "TODO_TASKS", payload: tasks });
  };

  const completedTasksFilter = () => {
    dispatch({ type: "COMPLETED_TASKS", payload: tasks });
  };

  return (
    <div className="actions-bar">
      <div>
        <Button textContent={"Add a new to-do"} action={addTask} />
      </div>
      <div className="buttons-fulfillment">
        <Button textContent={"All"} action={allTasksFilter} />
        <Button textContent={"To-do"} action={todoTasksFilter} />
        <Button textContent={"Completed"} action={completedTasksFilter} />
      </div>
    </div>
  );
};

export default ActionsBar;
