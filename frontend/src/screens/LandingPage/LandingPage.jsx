import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const history = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            history('/notes');
        }
    }, [history]);

    return (
        <div className='container my-4'>
            <div className="card text-center">
                <div className="card-header">
                    Note Zipper
                </div>
                <div className="card-body">
                    <h5 className="card-title">Save your all Notes</h5>
                    <p className="card-text">The all in one note saver space.</p>
                    <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                    <Link to="/register" className="btn btn-primary mx-2">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
