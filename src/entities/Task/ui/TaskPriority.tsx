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

    const backgroundColors = {
        green: 'bg-green-50',
        red: 'bg-red-50',
        yellow: 'bg-yellow-50',
    }

    const Colors = {
        green: 'text-green-600',
        red: 'text-red-600',
        yellow: 'text-amber-600',
    }

    type BackgroundColorsKey = keyof typeof backgroundColors;
    type ColorsKey = keyof typeof Colors;

    let backgroundColor: BackgroundColorsKey = 'green';
    let color: ColorsKey = 'green';

    const priorities = config.priorityConfig;

    priorities.map((el)=>{
        if(priority == el.idPriority){
            backgroundColor = el.color as BackgroundColorsKey;
            color =  el.color as ColorsKey;
        }
    })

    return (
        <>
            <div className='relative'>
                <div className={classNames(
                    'flex flex-row items-center px-2 py-1 ' + `${backgroundColors[backgroundColor]}`, {
                        'rounded-xl': activeEditPriority == false,
                        'rounded-t-xl': activeEditPriority == true,
                    }
                )}>
                    
                    <div className={'text-lg mr-2 ' + `${Colors[color]}`}>
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
                    <div className={'absolute cursor-pointer rounded-b-lg w-full text-center text-sm pb-2 pt-1 '+ `${backgroundColors[backgroundColor]}`}>
                        {priorities.map((el, key)=>
                            <div key={key} data-id={el.idPriority} onClick={editPriority}>{el.namePriority}</div>
                        )}
                    </div>
                }
            </div>
        </>

    );
})