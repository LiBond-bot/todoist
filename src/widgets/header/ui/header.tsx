import React, { FC } from 'react';
// Ui
import { Title } from 'shared/ui/title';

export const Header:FC<{
    title:string,
    subtitle:string
}> = ({title, subtitle}) =>{
    return (
        <div className='py-6'>
            <Title titleName={title} fontSize='text-3xl'/>
            <p>{subtitle}</p>
        </div>
    );
}

export default Header;
