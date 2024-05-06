import React from 'react';

// Styles
import '../shared/assets/css/App.css';

// Store
import TaskStore from 'entities/Task/model/TaskStore'
import {StoreContext} from 'entities/Task/model/context';

// Pages
import { MainPage } from '../pages/main';

function App() {

  return (
    <StoreContext.Provider value={TaskStore}>
      {/* Основная страница */}
      <MainPage/>
    </StoreContext.Provider>
  );

}

export default App;
