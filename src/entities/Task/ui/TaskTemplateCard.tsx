import React, { FC } from 'react';
import classNames from 'classnames';

// Types
import { TaskType } from 'shared/type/types';

// Icons
import { RiDeleteBin6Line } from "react-icons/ri";

// helpers
import {dateConversion} from 'shared/helpers/dateConversion'

// Ui
import { TaskPriority } from './TaskPriority';

export const TaskTemplateCard:FC<{
    name: TaskType["name"],
    checked_task: TaskType["checked"],
    priority: TaskType["priority"]
    createDate:TaskType["createDate"],
    finishDate:TaskType["lastEditDate"],
    lastEditDate:TaskType["finishedDate"],
    activeEditPriority: boolean,
    TrackingValue: any
    onChecked: any
    onDelete: any,
    editPriority: any
    setEditPriority: any

}> = ({ name, checked_task, priority, createDate, finishDate, lastEditDate, TrackingValue, onChecked, onDelete, editPriority, activeEditPriority, setEditPriority }) => {

    // Конвертирование дат

    let finishedDateConvert;
    let lastEditDateConvert;

    const createDateConvert = dateConversion(createDate);
    if(finishDate){ finishedDateConvert = dateConversion(finishDate)}
    if(lastEditDate){ lastEditDateConvert = dateConversion(lastEditDate)}

    return (
        <>
            <div className={classNames(
                'shadow-xl p-6 rounded-lg mb-6', {
                    'opacity-50': checked_task == true,
                }
            )}>
                <div className='flex flex-col'>

                    <div className='flex flex-column mb-3 justify-between'>
                        
                        <input type="checkbox" name="checkbox-1" className="w-5 cursor-pointer" checked={checked_task ? true : false} onClick={onChecked} />
                        
                        <div className='flex font-bold'>
                            <input 
                                type="text"
                                className={classNames(
                                    'focus-visible:outline-none bg-transparent', {
                                        'line-through': checked_task == true,
                                    }
                                )}
                                value={name}
                                onChange={TrackingValue}
                            />
                        </div>

                        <div className="cursor-pointer text-2xl p-1.5 rounded-md hover:bg-indigo-50" onClick={onDelete}><RiDeleteBin6Line /></div>

                    </div>
                    <div className='flex items-center justify-between'>

                        <div className='text-sm'>Создана: {createDateConvert}</div>

                        {lastEditDate && <div className='text-sm'>Изменена: {lastEditDateConvert}</div>}

                        {finishDate && <div className='text-sm'>Завершена: {finishedDateConvert}</div>}

                        <div className='flex flex-row items-center ml-4'>
                            <TaskPriority
                                priority={priority}
                                activeNamePriority={false}
                                editPriority={editPriority}
                                activeEditPriority={activeEditPriority}
                                setEditPriority={setEditPriority}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}