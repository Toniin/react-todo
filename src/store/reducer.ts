import {useReducer} from "react";
import {taskModel} from "../models/task.model.ts";

export const initialTasks = {tasks: [] as taskModel[]};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tasksReducer(state: { tasks: taskModel[] }, action: {type: string, payload: any}) {
    let tasks;
    let todoTasksFiltered;
    let completedTasksFiltered;
    let tasksWithTaskDeleted;

    switch (action.type) {
        case "ADD_TASKS":
            return {
                ...state,
                tasks: action.payload,
            };
        case "DELETE_TASK":
            tasks = [...action.payload.state.tasks]
            tasksWithTaskDeleted = tasks.filter(task => task.id !== action.payload.task.id)
            return {
                tasks: tasksWithTaskDeleted,
            };
        case "TODO_TASKS":
            tasks = [...action.payload]
            todoTasksFiltered = tasks.filter(task => task.fulfillment !== "100")
            return {
                tasks: todoTasksFiltered,
            };
        case "COMPLETED_TASKS":
            tasks = [...action.payload]
            completedTasksFiltered = tasks.filter(task => task.fulfillment === "100")
            return {
                tasks: completedTasksFiltered,
            };
        case "ALL_TASKS":
            tasks = [...action.payload]
            return {
                tasks: tasks,
            };
        default:
            return state;
    }

    throw Error("Unknown action");
}

export const useTasksReducer = () => {
    const [state, dispatch] = useReducer(tasksReducer, initialTasks)

    return {
        state,
        dispatch
    }
}