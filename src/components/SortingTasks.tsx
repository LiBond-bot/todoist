import React, { FC } from 'react';

// Типизация
import { FiledType } from '../types';

// MOBX
import { observer } from "mobx-react-lite"
import TaskStore from '../stores/TaskStore';

const OrderIcon = ({order}:{order?:"ASC" |"DESC"}) => {
    return <>{order === "ASC" ? "UP" : "DOWN"}</> 
}

export const SortingTasks:FC<{
}> = observer(() => {

    const { filter, setSort } = TaskStore;

    const {field, order} = filter.sort;

    const changeSort = (fieldSort: FiledType): void  => {
        if(fieldSort) { setSort(fieldSort)}
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