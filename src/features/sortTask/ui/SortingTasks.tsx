// Types
import { FiledType } from 'shared/type/types';
import classNames from 'classnames';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// UI
import { OrderIcon } from 'shared/ui/icons';
import { Select } from 'shared/ui/formElements';


export const SortingTasks = observer(() => {

    const dataTypeSort = [
        {
            value:'none',
            name: 'Без сортировки'
        },
        {
            value:'priority',
            name: 'По приоритету'
        },
        {
            value:'date',
            name: 'По дате создания'
        }
    ]

    const TaskStore = useStore();

    // Текущие значения сортировки и порядка сортировки
    const {field, order} = TaskStore.filter.sort;

    // Функция смены сортировки
    const changeSort = (fieldSort: FiledType): void  => {
        if(fieldSort) { TaskStore.setSort(fieldSort)}
    }

    return (
        <>
            <div className='flex mr-5 rounded-md shadow-xl border-2 border-transparent  hover:border-indigo-800 hover:ring-indigo-800 transition duration-300 ease-in-out'>

                {/* Select */}
                <div>   
                    <Select 
                        id='selectTasksSort'
                        data={dataTypeSort}
                        onChange={(e) => changeSort(e.target.value as FiledType)}
                        addClasses='focus:ring-0'
                    />
                </div>

                {/* Иконка порядка сортировки */}
                <div className={classNames(
                    'flex border-s p-3 rounded-r transition duration-300 ease-in-out', {
                        'opacity-50': field == 'none' || field == undefined,
                        'cursor-pointer hover:bg-indigo-800 hover:text-white': field != 'none' && field != undefined,
                    }
                )} onClick={() => TaskStore.changeOrder()}>
                    <OrderIcon order={order}/>
                </div>

            </div>
        </>

    );
})