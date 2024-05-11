import React from 'react';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Components
import { ButtonIcon } from '../../../shared/ui/button';

// Icons
import { FaEquals } from "react-icons/fa";
import { FaGripHorizontal } from "react-icons/fa";

// три
import { BsGrid3X2GapFill } from "react-icons/bs";
import { BsGrid3X3GapFill } from "react-icons/bs";

// четыре
import { PiNumberThreeFill } from "react-icons/pi";
import { PiNumberFourFill } from "react-icons/pi";
import { PiNumberFiveFill } from "react-icons/pi";



export const ChangeViewTask = observer(() => {

    const TaskStore = useStore();
    const taskTemplate = TaskStore.tasks_view.tasks_template;
    const taskQuantity = TaskStore.tasks_view.tasks_cards_quan;

    function changeView(e: any) {
        if(e.currentTarget.id) TaskStore.setTasksTemplate(e.currentTarget.id)
    }

    function changeQuantityCards(e: any) {
        if(e.currentTarget.id) TaskStore.setQuantityCards(e.currentTarget.id)
    }

    return (
        <div className='flex flex-col'>
            <div className="flex">
                <ButtonIcon addClass={taskTemplate == 'line' ? 'bg-indigo-800 text-white' : ''} id="line" onClick={(e)=>changeView(e)} iconName={<FaEquals/>}/>
                <ButtonIcon addClass={taskTemplate == 'card' ? 'bg-indigo-800 text-white' : ''} id="card" onClick={(e)=>changeView(e)} iconName={<FaGripHorizontal/>}/>
            </div>
            
            {taskTemplate == 'card' &&
                <div className='flex'>
                    <ButtonIcon addClass={taskQuantity == '3-cards' ? 'bg-indigo-800 text-white' : ''} id="3-cards" onClick={(e)=>changeQuantityCards(e)} iconName={<PiNumberThreeFill/>}/>
                    <ButtonIcon addClass={taskQuantity == '4-cards' ? 'bg-indigo-800 text-white' : ''} id="4-cards" onClick={(e)=>changeQuantityCards(e)} iconName={<PiNumberFourFill/>}/>
                    <ButtonIcon addClass={taskQuantity == '5-cards' ? 'bg-indigo-800 text-white' : ''} id="5-cards" onClick={(e)=>changeQuantityCards(e)} iconName={<PiNumberFiveFill/>}/>
                </div>
            }
        </div>
    );
})

                