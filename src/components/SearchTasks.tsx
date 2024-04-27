import React, {  FC } from 'react';
import { observer } from "mobx-react-lite"
import TaskStore from '../stores/TaskStore';
import classNames from 'classnames';

export const SearchTasks:FC<{
    onSearch(e:React.ChangeEvent<HTMLInputElement>): void
}> = observer(({onSearch}) => {
    return (
        <>
            <div>
                <input className="shadow-xl px-4 py-4 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block rounded-md sm:text-sm focus:ring-2" type="text" placeholder="Поиск задачи" onChange={(e) => onSearch(e) }/>
            </div>
        </>

    );
})