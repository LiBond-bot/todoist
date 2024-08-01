import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Components
import { InputText } from 'shared/ui/inputText';
import { Button } from 'shared/ui/button';
import { Select } from "shared/ui/formElements";

export const CreateTask = observer(() => {

    const dataPriority = [
        { value: '0', name: 'Низкий приоритет' }, 
        { value: '1', name: 'Средний приоритет' }, 
        { value: '2', name: 'Высокий приоритет' }
    ]

    const TaskStore = useStore();

    function sendTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const inputName = (event.currentTarget.elements[0] as HTMLInputElement);
        const inputPriority = (event.currentTarget.elements[1] as HTMLInputElement);

        const NameTask = inputName.value;
        const TaskPriority = Number(inputPriority.value);

        if (NameTask) TaskStore.CreateTask(NameTask, TaskPriority);

        inputName.value = '';
        inputPriority.value = '0';
    }

    return (
        <div className='py-6 flex'>

            <form className='flex w-full' onSubmit={sendTask}>
               
                <InputText onChange={undefined} name='task' placeholder='Напишите название задачи'/>

                <Select 
                    id="SelectPriority"
                    data={dataPriority}
                    addClasses="mr-6 shadow-xl px-4 py-4 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block rounded-md sm:text-sm focus:ring-2"
                />
                
                <Button name='Добавить задачу'/>
            </form>

        </div>
    );
})

