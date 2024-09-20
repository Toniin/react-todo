/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react";
import { taskModel } from "../models/task.model.ts";

export const initialTask = {
  task: {
    id: "",
    name: "",
    description: "",
    category: "",
    date: "",
    time: "",
    priority: "",
    fulfillment: "0",
  },
};

export function addTaskReducer(
  state: { task: taskModel },
  action: { type: string; payload: any }
) {

  switch (action.type) {
    case "SET_NAME":
      return {
        task: {
          ...state.task,
          name: action.payload,
        },
      };
    case "SET_DESCRIPTION":
      return {
        task: {
          ...state.task,
          description: action.payload,
        },
      };
    case "SET_CATEGORY":
      return {
        task: {
          ...state.task,
          category: action.payload,
        },
      };
    case "SET_DATE":
      return {
        task: {
          ...state.task,
          date: action.payload,
        },
      };
    case "SET_TIME":
      return {
        task: {
          ...state.task,
          time: action.payload,
        },
      };
    case "SET_PRIORITY":
      return {
        task: {
          ...state.task,
          priority: action.payload,
        },
      };
    case "SET_FULFILLMENT":
      return {
        task: {
          ...state.task,
          fulfillment: action.payload,
        },
      };

    default:
      return state;
  }
}

export const useAddTaskReducer = () => {
  const [state, dispatch] = useReducer(addTaskReducer, initialTask);

  return {
    state,
    dispatch,
  };
};
