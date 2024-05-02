import React, { FC } from 'react';
import { observer } from "mobx-react-lite"
import TaskStore from '../stores/TaskStore';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFlag } from "react-icons/fa6";
import { toJS } from 'mobx';
import classNames from 'classnames';

export const ToDoCard:FC<{
    name: string,
    id: string,
    checked_task: boolean,
    priority: number,
    date:any,
}> = observer(({ name, id, checked_task, priority, date }) => {
    
    const { DeleteTask, CheckedTask, EditTask } = TaskStore;

    const createDate = new Date(date);

    const TrackingValue = (event: any) =>  {
        EditTask(id, event.target.value )
    }

    const onDelete = (event: any) =>  {
        DeleteTask(id)
    }

    const onChecked = () => {
        CheckedTask(id)
    }

    return (
        <>
            <div className={classNames(
                'shadow-xl p-6 rounded-lg mb-6', {
                    'opacity-50': checked_task == true,
                    // 'bg-green-50': priority == 'low',
                    // 'bg-yellow-50': priority == 'middle',
                    // 'bg-red-50': priority == 'high',
                }
            )}>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row'>
                        <input type="checkbox" name="checkbox-1" className="w-5 mr-6 cursor-pointer" checked={checked_task ? true : false} onClick={onChecked} />
                       
                        <div>
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
                            <div>Дата создания: {createDate.getDate() + '.' + createDate.getMonth()  + '.' +  createDate.getFullYear() + ' ' + createDate.getHours() + ':' + createDate.getMinutes()}</div>
                        </div>

                    </div>
                    <div className='flex flex-row items-center'>
                        <div className={classNames(
                            'flex flex-row items-center mr-4 px-2 py-1 rounded-xl', {
                                'bg-green-50': priority == 0,
                                'bg-yellow-50': priority == 1,
                                'bg-red-50': priority == 2,
                            }
                        )}>
                            <div className={classNames(
                                'text-lg mr-2', {
                                    'text-green-600': priority == 0,
                                    'text-amber-600': priority == 1,
                                    'text-red-600': priority == 2,
                                }
                            )}>
                                <FaFlag />
                            </div>
                            <div>
                                <div className='text-xs'>Приоритет</div>
                                {priority == 0 && <div className='text-sm font-bold'>Низкий</div>}
                                {priority == 1 && <div className='text-sm font-bold'>Средний</div>}
                                {priority == 2 && <div className='text-sm font-bold'>Высокий</div>}
                            </div>
                        </div>
                        <div className="cursor-pointer text-2xl p-1.5 rounded-md hover:bg-indigo-50" onClick={onDelete}><RiDeleteBin6Line /></div>
                    </div>
                </div>
            </div>
        </>

    );
})