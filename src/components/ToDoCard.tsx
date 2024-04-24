import React, { FC } from 'react';
import { observer } from "mobx-react-lite"
import TaskStore from '../stores/TaskStore';
import { RiDeleteBin6Line } from "react-icons/ri";
import { toJS } from 'mobx';
import classNames from 'classnames';

export const ToDoCard:FC<{
    name: string,
    id: string,
    checked: boolean
}> = observer(({ name, id, checked }) => {
    
    const { DeleteTask, CheckedTask, EditTask } = TaskStore;

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
                    'opacity-50': checked == true,
                }
            )}>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row'>
                        <input type="checkbox" name="checkbox-1" className="w-5 mr-6 cursor-pointer" onClick={onChecked} />
                        <input 
                            type="text"
                            className={classNames(
                                'focus-visible:outline-none', {
                                    'line-through': checked == true,
                                }
                            )}
                            value={name}
                            onChange={TrackingValue}
                        />
                    </div>
                    <div>
                        <div className="cursor-pointer text-2xl p-1.5 rounded-md hover:bg-indigo-50" onClick={onDelete}><RiDeleteBin6Line /></div>
                    </div>
                </div>
            </div>
        </>

    );
})