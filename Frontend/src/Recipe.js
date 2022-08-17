import React from 'react'

export default function Modal({children, open, close}) {
    if(!open) return null
    return (
        <>
                <div className='modal-form'>
                    {children}
                </div>
                <div className="button-container">
                    <input type="submit" value = "X" onClick={close}/>
                </div>
        </>
    )
}