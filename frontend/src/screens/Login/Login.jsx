import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import constant from '../../constants'
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/action/userActions';
const { REACT_APP_BACKEND_URL } = process.env

const method = constant.USER;
const submethod = constant.LOGIN;

const Login = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, err, user } = userLogin;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            history('/notes');
        }
    }, [history, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin();
    }

    const handleLogin = async () => {
        const data = { method, submethod, email, password }
        dispatch(login(data));
    }

    return (
        <div className="container">
            <h2 className="my-3">Login </h2>

            {loading && <Spinner />}
            {err && <Alert type='danger' msg={err} />}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login