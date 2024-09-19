import { render } from "@testing-library/react";
import ActionsBar from "./ActionsBar";
import { userEvent } from "@testing-library/user-event";
// import Store from "../../store/store";
// import { useTasksReducer } from "../src/store/reducer";
import { describe, it, expect, vi } from 'vitest'
// import "@testing-library/jest-dom"
import Store, { useStore } from "../../store/store";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// vi.mock('../../store/reducer', () => ({
//   useTasksReducer: () => vi.fn()
// }))

// const mockStore = vi.fn()
const mockDispatch = vi.fn()

// vi.mock('../../store/store', () => ({
//   useStore: () => mockStore,
//   dispatch: () => mockDispatch
// }))

vi.mock(import("../../store/store"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    dispatch: () => mockDispatch
  }
})

const tasks = [
  {
    id: "1",
    name: "Learn React",
    description: "Managing State, Escape Hatches, Effects",
    category: "Programming",
    date: "",
    time: "",
    priority: "High",
    fulfillment: "30",
  },
];

describe("ActionsBar", () => {
  describe("addTask", () => {  
    it("should redirect to '/add-task'", async() => {
      const screen = render(
        <ActionsBar tasks={tasks} />
      );

      const buttonAddTask = screen.getByText("Add a new to-do");
      await userEvent.click(buttonAddTask)

      expect(mockNavigate).toHaveBeenCalledWith("/add-task");
    });
  });

  describe("allTasksFilter", () => {
    const providerState = {
      state: () => vi.fn(),
      dispatch: () => vi.fn()
    };

    // const { state, dispatch } = useTasksReducer();

    // const providerState = {
      // state,
      // dispatch,
    // };
  
    it("should dispatch with type 'ALL_TASKS'", async() => {
      const spy = vi.spyOn(useStore(), 'dispatch')
      // const dispatch = vi.fn();
      // mockDispatch.mockReturnValue(vi.fn());

      const screen = render(
        <Store.Provider value={providerState}>
          <ActionsBar tasks={tasks} />
        </Store.Provider>
      );

      const buttonAllTasksFilter = screen.getAllByText("All")[0];
      await userEvent.click(buttonAllTasksFilter)


      // expect(mockStore).toHaveBeenCalledWith("/add-task");
      expect(spy).toHaveBeenCalled();
    });
  });
});
