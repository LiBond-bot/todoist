import React, { FC } from 'react';

// Типизация
import { TaskType } from '../types';

// Mobx
import { observer } from "mobx-react-lite"
import TaskStore from '../stores/TaskStore';

// Картинки
import notaskImg from '../img/notask.png'
import searchImg from '../img/search.png'
// Компоненты
import { ToDoCard } from '../components/ToDoCard';
import { SortingTasks } from '../components/SortingTasks';
import { SearchTasks } from '../components/SearchTasks';
import { toJS } from 'mobx';

const Empty:FC<{
    text:string,
    img:string,
}> = ({text, img}) => {
    return <div className='max-w-sm m-auto'>
        <img src={img} alt="" />
        <h2 className='font-sans text-2xl font-bold pb-4 text-center'>{text}</h2>
    </div>
}

const Tasks:FC<{tasks:TaskType[], onSearch(e:React.ChangeEvent<HTMLInputElement>):void}> = observer(({tasks, onSearch}) => {
    return <>
        <h1 className='font-sans text-2xl font-bold pb-4'>Задачи</h1>
        <div className='flex flex-row justify-between items-center'>
            <SortingTasks/>
            <SearchTasks onSearch={onSearch}/>
        </div>
        
       {tasks.length ? <div className='mt-6'>
            {tasks.map((el, i) =>
                <ToDoCard key={el.id} id={el.id} name={el.name} checked_task={el.checked} priority={el.priority} date={el.createDate} />
            )}
       </div> : <div>Ты уверен, что ищешь именно это!</div>}
    </>
})

export const SectionCards = observer(() => {
    const { tasks, tasks_output, setSearch } = TaskStore;

    return  tasks.length ? 
        <Tasks 
            onSearch={(e) => {
                setSearch(e.target.value)
            }} 
            tasks={tasks_output}
        /> 
    : 
    <Empty text='Список задач пустой, время выпить кофе!' img={notaskImg}/>
})



