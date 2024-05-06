import React from 'react';
import { CreateTask } from '../../../features/createTask/ui/CreateTask';
import { Title } from '../../../shared/ui/title';

export const CreateTaskWidget = () =>{
    return (
        <div className='pb-6'>
            <Title titleName='Создать задачу' fontSize='text-2xl'/>
            <CreateTask />
        </div>
    );
}

export default CreateTaskWidget;
