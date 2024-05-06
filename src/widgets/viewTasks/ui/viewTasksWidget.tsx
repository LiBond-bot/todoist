import React, { FC } from 'react';
import classNames from 'classnames';

// Типизация
import { TaskType, TaskTemplate} from '../../../shared/type/types';

// Mobx
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Картинки
import notaskImg from '../../../shared/assets/img/notask.png'
import searchImg from '../../../shared/assets/img/search.png'

// Компоненты
import { Title } from '../../../shared/ui/title';
import { Plug } from '../../../shared/ui/plug';
import { Task } from '../../../entities/Task/ui/Task';
import { SortingTasks } from '../../../features/sortTask/ui/SortingTasks';
import { SearchTasks } from '../../../features/searchTask/ui/SearchTasks';
import { ChangeViewTask } from '../../../features/changeViewTask';


const Tasks:FC<{
    tasks:TaskType[],
    onSearch(e:React.ChangeEvent<HTMLInputElement>):void,
    tasks_template:TaskTemplate
}> = observer(({tasks, onSearch, tasks_template}) => {
    return <>

        {/* Заголовок */}
        <Title titleName='Задачи' fontSize='text-2xl'/>

        {/* Сортировка */}
        <div className='flex flex-row justify-between items-center'>

            <div className='flex items-center'>
                <SortingTasks/>
                <ChangeViewTask/>
            </div>

            <SearchTasks onSearch={onSearch}/>
        </div>
        
        {/* Задачи */}
       {tasks.length ? 
            <div className={classNames(
                'mt-6', {
                    'grid grid-cols-4 gap-x-6': tasks_template == 'card',
                }
            )}>
                {tasks.map((el, i) =>
                    <Task key={el.id} id={el.id} name={el.name} checked_task={el.checked} priority={el.priority} date={el.createDate} />
                )}
            </div> 
            : <Plug text='Не найдено ни одной задачи' img={searchImg}/> 
       }
    </>
})

export const ViewTasksWidget = observer(() => {

    const TaskStore = useStore();

    return TaskStore.tasks.length ? 
        <Tasks 
            onSearch={(e) => {
                TaskStore.setSearch(e.target.value)
            }} 
            tasks={TaskStore.tasks_output}
            tasks_template={TaskStore.tasks_template}
        /> 
    : 
    <Plug text='Список задач пустой, время выпить кофе!' img={notaskImg}/>
})



