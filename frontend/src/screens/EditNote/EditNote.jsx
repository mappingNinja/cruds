import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote, resetNote, updateNotes } from '../../redux/action/notesActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';

const initialNote = { title: '', content: '', category: '' }

const EditNote = () => {

    const history = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector((state) => state.userLogin);

    useEffect(() => {
        dispatch(resetNote())
    }, [history, user, id])

    const getEditNote = useSelector((state) => state.getNote);
    const { loading, err, note = initialNote } = getEditNote;

    const updatedNote = useSelector((state) => state.updateNote);
    const { loading: updateLoading, err: updateError, isUpdate: success } = updatedNote;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        dispatch(resetNote())
    }, [history]);

    useEffect(() => {
        if (!user) {
            return history('/')
        }
        fetchNote()
    }, [id]);

    useEffect(() => {
        setStates();
    }, [note])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateNote();
    }

    const updateNote = () => {
        const updateData = { title, content, category }
        const data = { method: 'notes', submethod: 'update', _id: id, updateData };
        dispatch(updateNotes(data, fetchNote));
    }

    const fetchNote = () => {
        const data = { method: 'notes', submethod: 'getNote', _id: id }
        dispatch(getNote(data));
    }

    const setStates = () => {
        var { title, category, content } = (note || {});
        setTitle(title);
        setCategory(category);
        setContent(content);
    }

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(resetNote());
        fetchNote()
    }

    return (
        <div className='container my-4'>
            <div className="card">
                <div className="card-header text-center">
                    {err && <Alert type='danger' msg={err} />}
                    {updateError && <Alert type='danger' msg={updateError} />}
                    {success && <Alert type='primary' msg="Note updated Successfully" />}

                    <h2>Edit notes</h2>
                    {(loading || updateLoading) && <Spinner />}

                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" id="title" disabled={loading} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <input type="text" className="form-control" id="category" disabled={loading} value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>content</label>
                            <textarea type="text" className="form-control" id="content" disabled={loading} value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>Submit</button>
                        <button type="button" className="mx-2 btn btn-danger" disabled={loading} onClick={handleReset}>Reset</button>
                    </form>
                </div>
                <div className="card-footer bg-white">
                    Editing on : {new Date().toLocaleString()}
                </div>
            </div>
        </div>
    )
}

export default EditNote;