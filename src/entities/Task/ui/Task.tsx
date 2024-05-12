import React, { FC, useState } from 'react';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Ui
import { TaskTemplateCard } from './TaskTemplateCard';
import { TaskTemplateLine } from './TaskTemplateLine';

export const Task:FC<{
    name: string,
    id: string,
    checked_task: boolean,
    priority: number,
    createDate:any,
    finishDate:any,
    lastEditDate:any,

}> = observer(({ name, id, checked_task, priority, createDate, finishDate, lastEditDate }) => {

    const TaskStore = useStore();

    const [activeEditPriority, setActiveEditPriority] =  useState(false);

    const TrackingValue = (event: any) =>  {
        TaskStore.EditTask(id, event.target.value )
    }

    const onDelete = (event: any) =>  {
        TaskStore.DeleteTask(id)
    }

    const onChecked = () => {
        TaskStore.CheckedTask(id)
    }

    // Изменение приоритета
    const setEditPriority = () => {
        setActiveEditPriority(!activeEditPriority);
    }

    const changePriority = (e: any) => {
        const idPriority = Number(e.currentTarget.dataset.id);
        TaskStore.EditPriority(id, idPriority)
        setEditPriority();
    }

    return (
        <>
            {TaskStore.tasks_view.tasks_template == 'line' && 
               <TaskTemplateLine
                    name={name}
                    checked_task={checked_task}
                    priority={priority}
                    createDate={createDate}
                    finishDate={finishDate}
                    lastEditDate={lastEditDate}
                    
                    activeEditPriority={activeEditPriority}
                    TrackingValue={TrackingValue}
                    onChecked={onChecked}
                    onDelete={onDelete}
                    editPriority={changePriority}
                    setEditPriority={setEditPriority}
                />
            }
            {TaskStore.tasks_view.tasks_template == 'card' && 
                <TaskTemplateCard 
                    name={name}
                    checked_task={checked_task}
                    priority={priority}
                    createDate={createDate}
                    finishDate={finishDate}
                    lastEditDate={lastEditDate}
                    activeEditPriority={activeEditPriority}
                    TrackingValue={TrackingValue}
                    onChecked={onChecked}
                    onDelete={onDelete}
                    editPriority={changePriority}
                    setEditPriority={setEditPriority}
                />
            }
        </>

    );
})