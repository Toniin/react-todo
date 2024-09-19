import {useEffect, useState} from "react";
import ActionsBar from "../components/ActionsBar/ActionsBar";
import CardContainer from "../sharedComponents/CardContainer/CardContainer";
import TasksTable from "../components/TasksTable/TasksTable";
import {useStore} from "../store/store";
import {toast} from "sonner";

const TasksRoutes = () => {
    const {dispatch} = useStore();

    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((data) => {
                dispatch({type: "ADD_TASKS", payload: data});
                setTasks(data)
            })
            .catch((error) => {
                toast.error(error.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CardContainer>
            {tasks && (
                <>
                    <ActionsBar tasks={tasks}/>
                    <TasksTable/>
                </>
            )}
        </CardContainer>
    );
};

export default TasksRoutes;
