import { taskModel } from "../../models/task.model";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import ButtonIcon from "../../sharedComponents/ButtonIcon";
import { useNavigate } from "react-router-dom";
import {useStore} from "../../store/store.ts";

const TasksTable = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const onEdit = (task: taskModel) => {
    navigate(`/edit-task/${task.id}`);
  };

  const onDelete = async (task: taskModel) => {
    await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    dispatch({ type: "DELETE_TASK", payload: { state, task} });
  };

  return (
    <table className="tasks-table">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          <th scope="col">When</th>
          <th scope="col">Priority</th>
          <th scope="col">Fullfillment</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {state.tasks.map((task: taskModel) => {
          return (
            <tr key={`${task.name}-${task.date}-${task.time}`}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.category}</td>
              <td>
                {task.date && task.time
                  ? `${task.date} / ${task.time}`
                  : task.date
                  ? task.date
                  : "-"}
              </td>
              <td>{task.priority}</td>
              <td>{task.fulfillment}%</td>
              <td className="button-actions">
                <ButtonIcon
                  icon={<LuPenSquare />}
                  action={() => onEdit(task)}
                />
                <ButtonIcon icon={<LuTrash2 />} action={() => onDelete(task)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TasksTable;
