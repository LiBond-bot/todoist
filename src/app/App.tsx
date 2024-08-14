// Store
import TaskStore from "entities/Task/model/TaskStore";
import { StoreContext } from "entities/Task/model/context";

// Pages
import MainPage from "../pages";

function App() {
  return (
    <StoreContext.Provider value={TaskStore}>
      {/* Основная страница */}
      <MainPage />
    </StoreContext.Provider>
  );
}

export default App;
