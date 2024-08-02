import { FC } from 'react';

export const Plug:FC<{
    text:string,
    img:string,
}> = ({text, img}) => {
    return (
        <div className='max-w-sm m-auto'>
            <img src={img} alt="" />
            <h2 className='font-sans text-2xl font-bold pb-4 text-center'>{text}</h2>
        </div>
    )
}