import React, { useContext } from 'react';
import TaskStore from './TaskStore';

export const StoreContext = React.createContext(TaskStore);

export const useStore = () => {
  return useContext(StoreContext);
};