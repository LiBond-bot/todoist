import React, { FC } from 'react';

export const Layout:FC<{
    children: any,
    
}> = ({children}) => {
    
    return (
        <div className='container mx-auto'>
            {children}
        </div>
    );
    
}