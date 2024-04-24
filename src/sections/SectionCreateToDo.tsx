import React from 'react';
import { FormCreateToDo } from '../components/FormCreateToDo';

function SectionCreateToDo() {
    return (
        <div className='pb-6'>
            <h1 className='font-sans text-2xl font-bold pb-4'>Создать задачу</h1>
            <FormCreateToDo />
        </div>
    );
}

export default SectionCreateToDo;
