import React, { FC } from 'react';
import { ToDoCard } from '../components/ToDoCard';
import { observer } from "mobx-react-lite"
import TaskStore, { TaskType } from '../stores/TaskStore';
import notask from '../img/notask.png'

const Empty:FC<{}> = () => {
    return <div className='max-w-lg m-auto'>
        <img src={notask} alt="" />
        <h2 className='font-sans text-2xl font-bold pb-4'> Список задач пустой, время выпить кофе!</h2>
    </div>
}

const Tasks:FC<{tasks:TaskType[]}> = observer(({tasks}) => {
    return <>
        <h1 className='font-sans text-2xl font-bold pb-4'>Задачи</h1>
        {tasks.map((el, i) =>
            <ToDoCard key={el.id} id={el.id} name={el.name} checked={el.checked} priority={el.priority} />
        )}
    </>
})

export const SectionCards = observer(() => {
    const { tasks } = TaskStore;
    return  tasks.length ? <Tasks tasks={tasks}/> : <Empty/>
})



