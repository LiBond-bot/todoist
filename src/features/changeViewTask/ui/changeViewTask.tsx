import React from 'react';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Components
import { ButtonIcon } from '../../../shared/ui/button';

// Icons
import { FaEquals } from "react-icons/fa";
import { FaGripHorizontal } from "react-icons/fa";


export const ChangeViewTask = observer(() => {

    const TaskStore = useStore();

    function changeView(e: any) {
        if(e.currentTarget.id) TaskStore.setTasksTemplate(e.currentTarget.id)
    }

    return (
        <div className='flex'>
            <ButtonIcon addClass={TaskStore.tasks_template == 'line' ? 'bg-indigo-800 text-white' : ''} id="line" onClick={(e)=>changeView(e)} iconName={<FaEquals/>}/>
            <ButtonIcon addClass={TaskStore.tasks_template == 'card' ? 'bg-indigo-800 text-white' : ''} id="card" onClick={(e)=>changeView(e)} iconName={<FaGripHorizontal/>}/>
        </div>
    );
})

                