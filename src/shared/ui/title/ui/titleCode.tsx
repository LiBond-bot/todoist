import { FC } from 'react';

export const Title:FC<{
    titleName: string,
    fontSize: "text-3xl" | "text-2xl" | "text-xl" | "text-lg" | "text-base";
}> = ({ titleName, fontSize }) => {
    
    return (
        <>
            <div className={'font-sans font-bold pb-4 ' + fontSize}>{titleName}</div>
        </>

    );
}