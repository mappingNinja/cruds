import React from 'react'

const MainScreen = ({ title, children }) => {
    return (
        <div>
            {
                title && <>
                    <h2 className='heading text-dark'>{title}</h2>
                    <hr />
                </>
            }
            {children}
        </div>
    )
}

export default MainScreen