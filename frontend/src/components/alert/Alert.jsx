import React from 'react'

const Alert = ({ type = 'danger', msg = 'something went wrong' }) => (
    <div className={`alert alert-${type}`} role="alert">
        {msg}
    </div>
)

export default Alert