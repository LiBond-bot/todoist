import React, { FC, useState } from 'react';

import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Icons
import { FaFlag } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

// Config
import config from 'shared/config/config.json'

export const TaskPriority:FC<{
    priority: number,
    activeNamePriority: boolean,
    editPriority: any,
    activeEditPriority:boolean,
    setEditPriority:any

}> = observer(({ priority, activeNamePriority, editPriority, activeEditPriority, setEditPriority }) => {

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
                <div className="ml-2 cursor-pointer text-sm opacity-50 hover:opacity-100" onClick={setEditPriority}><MdEdit/></div>
            </div>

            {activeEditPriority &&
                <div>
                    {priorities.map((el:any, key:number)=>
                        <div key={key} data-id={el.idPriority} onClick={editPriority}>{el.namePriority}</div>
                    )}
                </div>
            }
        </>

    );
})