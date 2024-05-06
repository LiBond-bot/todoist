import React, {  FC } from 'react';
import { observer } from "mobx-react-lite"
import TaskStore from '../../../entities/Task/model/TaskStore';
import classNames from 'classnames';
import { InputText } from '../../../shared/ui/inputText';

export const SearchTasks:FC<{
    onSearch(e:React.ChangeEvent<HTMLInputElement>): void
}> = observer(({onSearch}) => {
    return (
        <>
            <div>
                <InputText name="search" placeholder="Поиск задачи" onChange={onSearch}/>
            </div>
        </>

    );
})