import React, { FC } from 'react';
import classNames from 'classnames';

// Types
import { TaskType, TaskTemplate, TaskQuantityCards} from 'shared/type/types';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Images
import notaskImg from 'shared/assets/img/notask.png'
import searchImg from 'shared/assets/img/search.png'

// Ui
import { Title } from 'shared/ui/title';
import { Plug } from 'shared/ui/plug';
import { Task } from 'entities/Task/ui/Task';
import { SortingTasks } from 'features/sortTask/ui/SortingTasks';
import { SearchTasks } from 'features/searchTask/ui/SearchTasks';
import { ChangeViewTask } from 'features/changeViewTask';
import { FilterDate } from 'features/filterTask';


const Tasks:FC<{
    tasks:TaskType[],
    onSearch(e:React.ChangeEvent<HTMLInputElement>):void,
    tasks_template:TaskTemplate,
    task_quantity:TaskQuantityCards

}> = observer(({tasks, onSearch, tasks_template, task_quantity}) => {
    return <>

        {/* Заголовок */}
        <Title titleName='Задачи' fontSize='text-2xl'/>

        {/* Сортировка */}
        <div className='flex flex-row justify-between items-center'>

            <div className='flex items-center'>
                <SortingTasks/>
                <ChangeViewTask/>
            </div>

            <div className='flex items-center'>
                <FilterDate />
                <SearchTasks onSearch={onSearch}/>
            </div>

            
        </div>
        
        {/* Задачи */}
       {tasks.length ? 
            <div className={classNames(
                'mt-6', {
                    'grid gap-x-6': tasks_template == 'card',
                    'grid-cols-3': tasks_template == 'card' && task_quantity == '3-cards',
                    'grid-cols-4': tasks_template == 'card' && task_quantity == '4-cards',
                    'grid-cols-5': tasks_template == 'card' && task_quantity == '5-cards',
                }
            )}>
                {tasks.map((el, i) =>
                    <Task
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        checked_task={el.checked}
                        priority={el.priority}
                        createDate={el.createDate} 
                        finishDate={el.finishedDate}
                        lastEditDate={el.lastEditDate}
                    />
                )}
            </div> 
            : <Plug text='Не найдено ни одной задачи' img={searchImg}/> 
       }
    </>
})

export const ViewTasksWidget = observer(() => {

    const TaskStore = useStore()

    return TaskStore.tasks.length ? 
        <Tasks 
            onSearch={(e) => {
                TaskStore.setSearch(e.target.value)
            }} 
            tasks={TaskStore.tasks_output}
            tasks_template={TaskStore.tasks_view.tasks_template}
            task_quantity={TaskStore.tasks_view.tasks_cards_quan}
        /> 
    : 
    <Plug text='Список задач пустой, время выпить кофе!' img={notaskImg}/>
})



