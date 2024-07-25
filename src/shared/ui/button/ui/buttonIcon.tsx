import React, { FC } from 'react';

export const ButtonIcon:FC<{
    iconName: React.ReactNode,
    id?:string,
    addClass?:string
    onClick(e:React.MouseEvent<HTMLElement>): void

}> = ({ iconName, id, addClass, onClick }) => {
    
    return (
        <>
            <div id={id} onClick={onClick} className={'p-4 rounded-lg shadow-xl text-black cursor-pointer '+ addClass}>{iconName}</div>
        </>

    );
}