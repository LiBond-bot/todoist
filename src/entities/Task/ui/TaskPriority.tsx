import React, { FC } from 'react';

// Icons
import { FaFlag } from "react-icons/fa6";

// Config
import config from 'shared/config/config.json'


export const TaskPriority:FC<{
    priority: number,
    activeNamePriority: boolean,

}> = ({ priority, activeNamePriority}) => {

    const priorities = config.priorityConfig;

    let backgroundColor;
    let color;

    priorities.map((el:any)=>{
        if(priority == el.idPriority){
            backgroundColor = el.backgroundColor;
            color = el.color
        }
    })

    return (
        <>
            <div className={'flex flex-row items-center px-2 py-1 rounded-xl ' + backgroundColor}>
                <div className={'text-lg mr-2 ' + color}>
                    <FaFlag />
                </div>
                <div>
                    {activeNamePriority && <div className='text-xs'>Приоритет</div>}
                    {priorities.map((el:any, key:number)=>
                        priority == el.idPriority && <div key={key} className='text-sm font-bold'>{el.namePriority}</div>
                    )}
                </div>
            </div>
        </>

    );
}