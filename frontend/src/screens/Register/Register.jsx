import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import constant from '../../constants'
import Alert from '../../components/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/action/userActions';
import Spinner from '../../components/spinner/Spinner'

const method = constant.USER;
const submethod = constant.REGISTER;

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, err, user, success } = userRegister;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {
    if (user) {
      history('/notes');
    }
  }, [history, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  }

  const handleRegister = () => {
    if (fileLoading) {
      return setFileError('Wait while file is uploading')

    }
    if (!file) {
      return setFileError('upload a file')
    }

    const data = { method, submethod, name, email, password, confirmPassword, file }
    dispatch(register(data));
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
      {loading && <Spinner />}
      {err && <Alert type='danger' msg={err} />}
      {fileError && <Alert type='danger' msg={fileError} />}
      {success && <Alert type='primary' msg={success} />}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" id="exampleInputPassword1" disabled={loading} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={loading} name='email' onChange={(e) => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="password" disabled={loading} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Confirm password</label>
          <input type="password" className="form-control" id="confirmPassword" disabled={loading} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Profile picture</label> {fileLoading && <Spinner style={{ height: 17, width: 17 }} />}
          <input type="file" className="form-control" id="profilePicture" disabled={loading} style={{ height: 40 }} file={file} onChange={(e) => postDetails(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Register