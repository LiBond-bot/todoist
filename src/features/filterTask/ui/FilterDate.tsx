import React, { FC } from 'react';
// import DatePicker from "react-datepicker";

// Types
// import { FiledType } from 'shared/type/types';

// Store
import { observer } from "mobx-react-lite"
import { useStore } from 'entities/Task/model/context';

// // Icons
// import { FaSortAmountUp } from "react-icons/fa";
// import { FaSortAmountDownAlt } from "react-icons/fa";

// const OrderIcon = ( {order}:{order?:"ASC" |"DESC"} ) => {
//     return <>{order === "ASC" ? <FaSortAmountDownAlt/> : <FaSortAmountUp/>}</> 
// }

export const FilterDate:FC<{
}> = observer(() => {

    const TaskStore = useStore();

    // const {field, order} = TaskStore.filter.sort;

    // const changeSort = (fieldSort: FiledType): void  => {
    //     if(fieldSort) { TaskStore.setSort(fieldSort)}
    // } 

    

    return (
        <>
            <div className='flex'>
                Фильтр по дате
            </div>
        </>

    );
})