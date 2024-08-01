import React, { FC } from 'react';
import { SelectType } from 'shared/type/types';

export const Select:FC<{
    id?:string,
    addClasses?:string,
    data:SelectType[],
    onChange?(e:React.ChangeEvent<HTMLSelectElement>): void,
}> = ({id, addClasses, data, onChange}) => {
    return (
        <>
            <select 
                className={'bg-transparent border-transparent cursor-pointer focus:border-transparent ' + addClasses}
                onChange={onChange ? ((e) => onChange(e)) : undefined}
                id={id ? id : ''}
            >
                {data.map(item => (
                    <option key={item.value} value={item.value}>{item.name}</option>
                ))}
            </select>
        </> 
    );
}