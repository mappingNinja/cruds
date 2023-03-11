import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import constant from '../../constants'
import Alert from '../../components/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserField, updateProfile } from '../../redux/action/userActions';
import Spinner from '../../components/spinner/Spinner'

const method = constant.USER;
const submethod = constant.UPDATE;

const UpdateProfile = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (!user) {
            return history('/')
        }
    }, [user, history]);


    const { err, loading: updateLoader, success } = useSelector((state) => state.updateProfile);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [file, setFile] = useState(user?.pic);
    const [fileError, setFileError] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();
    }

    useEffect(() => {
        resetStates();
    }, [user])

    const resetStates = () => {
        dispatch(resetUserField)
    }

    const handleUpdate = async () => {
        resetStates();
        setPasswordError('')
        if (fileLoading) {
            return setFileError('Wait while file is uploading')
        }
        if (!file) {
            return setFileError('upload a file')
        }

        if (!password) {
            return setPasswordError('Enter your current password');
        }

        const data = { method, submethod, name, email, password, newPassword, file }
        dispatch(updateProfile(data))
    }

    const postDetails = (file) => {
        if (!file) {
            setFileError('Set image')
        }

        setFileError(null);
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'notezipper');
            formData.append('cloud_name', 'dnut9ipl0');
            setFileLoading(true);
            fetch('https://api.cloudinary.com/v1_1/dnut9ipl0/image/upload', {
                method: 'post',
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {
                    setFile(data?.url?.toString());
                    setFileLoading(false);
                })
                .catch((error) => {
                    setFileLoading(false);
                    setFileError(error.message || error.message);
                })
        }
        else {
            setFileError('set valid image')
        }

        return false
    }

    return (
        <div className="container">
            <h2 className="my-3">Register</h2>
            {(loading || updateLoader) ? <Spinner /> : null}
            {passwordError && <Alert type='danger' msg={passwordError} />}
            {err && <Alert type='danger' msg={err} />}
            {fileError && <Alert type='danger' msg={fileError} />}
            {success && <Alert type='primary' msg={'Profile updated successfully'} />}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" value={name} disabled={loading} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label>Current Password <span className='text-danger'>*</span></label>
                            <input type="password" className="form-control" id="password" disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>New password</label>
                            <input type="password" className="form-control" id="newPassword" disabled={loading} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Profile picture</label> {fileLoading && <Spinner style={{ height: 17, width: 17 }} />}
                            <input type="file" className="form-control" id="profilePicture" disabled={loading} style={{ height: 40 }} file={file} onChange={(e) => postDetails(e.target.files[0])} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="col-md-6">
                        <div className="">
                            <div className=''>
                                <img src={file || ''} style={{ width: '80%' }} className='ml-5' alt="Waiting ..." />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile