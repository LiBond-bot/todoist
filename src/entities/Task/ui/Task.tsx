import React, { FC } from 'react';
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';


import TaskStore from '../model/TaskStore';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFlag } from "react-icons/fa6";
import { toJS } from 'mobx';
import classNames from 'classnames';
import { TaskTemplateCard } from './TaskTemplateCard';
import { TaskTemplateLine } from './TaskTemplateLine';

export const Task:FC<{
    name: string,
    id: string,
    checked_task: boolean,
    priority: number,
    date:any,

}> = observer(({ name, id, checked_task, priority, date }) => {

    const TaskStore = useStore();

    const TrackingValue = (event: any) =>  {
        TaskStore.EditTask(id, event.target.value )
    }

    const onDelete = (event: any) =>  {
        TaskStore.DeleteTask(id)
    }

    const onChecked = () => {
        TaskStore.CheckedTask(id)
    }

    return (
        <>
            {TaskStore.tasks_template == 'line' && 
               <TaskTemplateLine
                    name={name}
                    checked_task={checked_task}
                    priority={priority}
                    date={date}
                    TrackingValue={TrackingValue}
                    onChecked={onChecked}
                    onDelete={onDelete}
                />
            }
            {TaskStore.tasks_template == 'card' && 
                <TaskTemplateCard 
                    name={name}
                    checked_task={checked_task}
                    priority={priority}
                    date={date}
                    TrackingValue={TrackingValue}
                    onChecked={onChecked}
                    onDelete={onDelete}
                />
            }
        </>

    );
})