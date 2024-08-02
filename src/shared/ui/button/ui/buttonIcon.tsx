import React, { FC } from 'react';

export const ButtonIcon:FC<{
    iconName: React.ReactNode,
    id?:string,
    addClass?:string
    text?:string
    onClick(e:React.MouseEvent<HTMLElement>): void
}> = ({ iconName, id, addClass, text, onClick }) => {
    
    return (
        <>
            <div
                id={id}
                onClick={onClick}
                className={'flex items-center p-4 rounded-lg shadow-xl text-black cursor-pointer hover:bg-indigo-800 hover:text-white transition duration-300 ease-in-out '+ addClass}>
                    {iconName}
                    {text && <div className='ml-3 leading-none'>{text}</div>}
                    
            </div>
        </>

    );
}