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

// Config
import config from 'shared/config/config.json'


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
}> = ({name, checked_task, priority, createDate, /* finishDate, lastEditDate,*/ TrackingValue, onChecked, onDelete, editPriority, activeEditPriority, setEditPriority }) => {

    // Конвертирование дат

    // let finishedDateConvert;
    // let lastEditDateConvert;

    const createDateConvert = dateConversion(createDate);
    // if(finishDate){ finishedDateConvert = dateConversion(finishDate)}
    // if(lastEditDate){ lastEditDateConvert = dateConversion(lastEditDate)}

    const Colors = {
        green: 'border-green-600',
        red: 'border-red-600',
        yellow: 'border-amber-600',
    }

    type ColorsKey = keyof typeof Colors;

    let color: ColorsKey = 'green';

    const priorities = config.priorityConfig;

    priorities.map((el)=>{
        if(priority == el.idPriority){
            color =  el.color as ColorsKey;
        }
    })

    return (
        <>
            <div className={classNames(
                'shadow-xl p-6 rounded-lg mb-6', {
                    'opacity-50': checked_task == true,
                }
            )}>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center'>
                        <input type="checkbox" name="todo_done" className={"cursor-pointer mr-4 h-5 w-5 rounded border-gray-300 text-indigo-800 focus:ring-indigo-800 border-2 " + `${Colors[color]}`} checked={checked_task ? true : false} onClick={onChecked} />
                        
                        <div>  
                            <div className="font-bold mb-0">
                                <input 
                                    type="text"
                                    className={classNames(
                                        'bg-transparent border-transparent p-0 focus:border-transparent focus:ring-0 text-lg', {
                                            'line-through': checked_task == true,
                                        }
                                    )}
                                    value={name}
                                    onChange={TrackingValue}
                                />
                            </div>
                            
                        </div>

                    </div>
                    <div className='flex flex-row items-center'>

                        <div className='flex gap-3 bg-indigo-50 w-max px-2 py-0.5 rounded-md'>
                            <div className='text-xs'><b>Создана:</b> {createDateConvert}</div>
                            {/* {lastEditDate && <div className='text-xs'><b>Изменена:</b> {lastEditDateConvert}</div>} */}
                            {/* {finishDate && <div className='text-xs'><b>Завершена:</b> {finishedDateConvert}</div>} */}
                        </div>
                        
                        <div className='relative mr-4 ml-4'>
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