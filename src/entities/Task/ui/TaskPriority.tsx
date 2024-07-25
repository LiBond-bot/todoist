import React, { FC } from 'react';
import classNames from 'classnames';

import { observer } from "mobx-react-lite"

// Icons
import { FaFlag } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

// Config
import config from 'shared/config/config.json'

export const TaskPriority:FC<{
    priority: number,
    activeNamePriority: boolean,
    editPriority: (e: React.MouseEvent<HTMLElement>) => void,
    activeEditPriority:boolean,
    setEditPriority(e:React.MouseEvent<HTMLElement>):void

}> = observer(({ priority, activeNamePriority, editPriority, activeEditPriority, setEditPriority }) => {

    const priorities = config.priorityConfig;
   
    let backgroundColor;
    let color;

    priorities.map((el)=>{
        if(priority == el.idPriority){
            backgroundColor = el.backgroundColor;
            color = el.color
        }
    })

    return (
        <>
            <div className={classNames(
                'flex flex-row items-center px-2 py-1 ' + backgroundColor, {
                    'rounded-xl': activeEditPriority == false,
                    'rounded-t-xl': activeEditPriority == true,
                }
            )}>
                
                <div className={'text-lg mr-2 ' + color}>
                    <FaFlag />
                </div>
                <div>
                    {activeNamePriority && <div className='text-xs'>Приоритет</div>}
                    {priorities.map((el, key)=>
                        priority == el.idPriority && <div key={key} className='text-sm font-bold'>{el.namePriority}</div>
                    )}
                    
                </div>
                <div className="ml-2 cursor-pointer text-sm opacity-50 hover:opacity-100" onClick={setEditPriority}><MdEdit/></div>
            </div>

            {activeEditPriority &&
                <div className={'absolute cursor-pointer rounded-b-lg w-full text-center text-sm '+ backgroundColor}>
                    {priorities.map((el, key)=>
                        <div key={key} data-id={el.idPriority} onClick={editPriority}>{el.namePriority}</div>
                    )}
                </div>
            }
        </>

    );
})