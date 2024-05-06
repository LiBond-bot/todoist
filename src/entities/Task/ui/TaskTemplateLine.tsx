import React, { FC } from 'react';
import classNames from 'classnames';

// Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFlag } from "react-icons/fa6";

// helpers
import {dateConversion} from 'shared/helpers/dateConversion'


export const TaskTemplateLine:FC<{
    name: string,
    checked_task: boolean,
    priority: number,
    date:any,
    TrackingValue: any
    onChecked: any
    onDelete: any

}> = ({ name, checked_task, priority, date, TrackingValue, onChecked, onDelete }) => {

    const conv_date = dateConversion(date);

    return (
        <>
            <div className={classNames(
                'shadow-xl p-6 rounded-lg mb-6', {
                    'opacity-50': checked_task == true,
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
                            <div>Создана: {conv_date}</div>
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
}