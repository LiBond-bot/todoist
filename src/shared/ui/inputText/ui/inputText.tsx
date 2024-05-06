import React, { FC } from 'react';

export const InputText:FC<{
    name: string,
    placeholder: string,
    onChange?(e?:React.ChangeEvent<HTMLInputElement>): void
}> = ({ name, placeholder, onChange }) => {
    
    return (
        <>
            <input 
                type="text"
                name={name}
                onChange={onChange ? ((e) => onChange(e)) : undefined}
                placeholder={placeholder} 
                className="mr-6 shadow-xl px-4 py-4 bg-white  placeholder-slate-400 focus:outline-none focus:border-indigo-800 focus:ring-indigo-800 block w-full rounded-md sm:text-sm focus:ring-2"
            />
        </>

    );
}