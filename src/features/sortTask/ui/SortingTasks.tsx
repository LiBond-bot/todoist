import React, { FC } from 'react';

// Types
import { FiledType } from '../../../shared/type/types';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// Icons
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";

const OrderIcon = ( {order}:{order?:"ASC" |"DESC"} ) => {
    return <>{order === "ASC" ? <FaSortAmountDownAlt/> : <FaSortAmountUp/>}</> 
}

export const SortingTasks:FC<{
}> = observer(() => {

    const TaskStore = useStore();

    const {field, order} = TaskStore.filter.sort;

    const changeSort = (fieldSort: FiledType): void  => {
        if(fieldSort) { TaskStore.setSort(fieldSort)}
    } 

    return (
        <>
            <div className='flex'>
                <div className="mr-6 shadow-xl px-4 py-4 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block rounded-md sm:text-sm focus:ring-2" id="SortParam">
                    <div onClick={() => changeSort("none")} data-id="none">Без сортировки</div>
                    <div onClick={() => changeSort("priority")} data-id="priority">По приоритету {field === "priority" ? <OrderIcon order={order}/> : null}</div>
                    <div onClick={() => changeSort("date")} data-id="date">По дате {field === "date" ? <OrderIcon order={order}/> : null}</div>
                </div>
            </div>
        </>

    );
})