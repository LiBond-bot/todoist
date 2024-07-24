import React, {  FC } from 'react';
// Store
import { observer } from "mobx-react-lite"
// components
import { InputText } from 'shared/ui/inputText';

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