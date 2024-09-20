import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner";
import Store from "./store/store";
import { useTasksReducer } from "./store/tasksReducer";

function App() {
  const { state, dispatch } = useTasksReducer();

  const providerState = {
    state,
    dispatch,
  };

  return (
    <Store.Provider value={providerState}>
      <div className="app-container">
        <Outlet />
        <Footer />
        <Toaster />
      </div>
    </Store.Provider>
  );
}

export default App;