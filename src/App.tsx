import React from 'react';
import './css/App.css';

import SectionCreateToDo from './sections/SectionCreateToDo';
import { SectionCards } from './sections/SectionCards';

function App() {
  return (// Это не сюда
    <div className='container mx-auto'>


      <div className='py-6'>
        <h1 className='font-sans text-3xl font-bold'>ToDo List</h1>
        <p>Создай свою задачу</p>
      </div>

      <SectionCreateToDo />

      <SectionCards />
    </div>
    // ^^^ Это не сюда

  );
}

export default App;
