import React, { FC } from 'react';

export const Layout:FC<{
    children: React.ReactNode,
}> = ({children}) => {
    
    return (
        <div className='container mx-auto'>
            {children}
        </div>
    );
    
}