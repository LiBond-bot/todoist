import React, { FC } from 'react';
import { observer } from "mobx-react-lite"
import TaskStore from '../stores/TaskStore';
import classNames from 'classnames';

const OrderIcon = ({order}:{order?:"ASC" |"DESC"}) => {
    return <>{order === "ASC" ? "UP" : "DOWN"}</> 
}

export const SortingTasks:FC<{
   
}> = observer(() => {

    const { filter, setSort } = TaskStore;

    const {field, order} = filter.sort

    const changeSort = () => {
        setSort('priority')
    }

    return (
        <>
            <div className='flex'>
                <div className="mr-6 shadow-xl px-4 py-4 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block rounded-md sm:text-sm focus:ring-2" id="SortParam">
                    <div onClick={changeSort}>Без сортировки</div>
                    <div onClick={changeSort}>По приоритету {field === "priority" ? <OrderIcon order={order}/> : null}</div>
                    {/* <option value="date">По дате создания</option> */}
                </div>
            </div>
        </>

    );
})