import React, { FC } from 'react';

export const Button:FC<{
    name: string,
}> = ({ name }) => {
    
    return (
        <>
            <button className="bg-indigo-800 px-6 py-2 rounded-lg shadow-xl w-52 text-white">{name}</button>
        </>
    );
}