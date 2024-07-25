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


export const TaskTemplateLine:FC<{
    id:TaskType["id"],
    name: TaskType["name"],
    checked_task: TaskType["checked"],
    priority: TaskType["priority"]
    createDate:TaskType["createDate"],
    finishDate:TaskType["lastEditDate"],
    lastEditDate:TaskType["finishedDate"],
    activeEditPriority: boolean,
    TrackingValue: React.ChangeEventHandler<HTMLInputElement>,
    onChecked: React.MouseEventHandler<HTMLInputElement>,
    onDelete: () => void,
    editPriority: (e: React.MouseEvent<HTMLElement>) => void,
    setEditPriority(e:React.MouseEvent<HTMLElement>):void
}> = ({name, checked_task, priority, createDate, finishDate, lastEditDate, TrackingValue, onChecked, onDelete, editPriority, activeEditPriority, setEditPriority }) => {

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
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row'>
                        <input type="checkbox" name="checkbox-1" className="cursor-pointer mr-4 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={checked_task ? true : false} onClick={onChecked} />
                        
                        <div>  
                            <div className="font-bold mb-2">
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
                            <div className='flex gap-3 bg-indigo-50 w-max px-2 py-0.5 rounded-md'>
                                <div className='text-xs'><b>Создана:</b> {createDateConvert}</div>
                                {lastEditDate && <div className='text-xs'><b>Изменена:</b> {lastEditDateConvert}</div>}
                                {finishDate && <div className='text-xs'><b>Завершена:</b> {finishedDateConvert}</div>}
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-row items-center'>
                        
                        <div className='relative mr-4'>
                            <TaskPriority
                                priority={priority}
                                activeNamePriority={true}
                                editPriority={editPriority}
                                activeEditPriority={activeEditPriority}
                                setEditPriority={setEditPriority}
                            />
                        </div>

                        <div className="cursor-pointer text-2xl p-1.5 rounded-md hover:bg-indigo-50" onClick={onDelete}><RiDeleteBin6Line /></div>
                    </div>
                </div>
            </div>
        </>

    );
}