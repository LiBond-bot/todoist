import React from 'react';
import { observer } from "mobx-react-lite"
import TaskStore from '../stores/TaskStore';

export const FormCreateToDo = observer(() => {
    const { CreateTask } = TaskStore;

    function sendTask(event: any) {
        event.preventDefault();
        const value = event.target[0].value
        if (value) CreateTask(value)
        event.target[0].value = '';
    }

    return (
        <div className='py-6 flex'>
            <form className='flex w-full' onSubmit={sendTask}>
                <input type="text" name="task" className="mr-6 shadow-xl px-4 py-4 bg-white  placeholder-slate-400 focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block w-full rounded-md sm:text-sm focus:ring-2" placeholder="Напишите название задачи" />
                <button className="bg-indigo-800 px-6 py-2 rounded-lg shadow-xl w-52 text-white">Добавить задачу</button>
            </form>
        </div>
    );
})

