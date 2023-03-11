import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteNote } from '../../redux/action/notesActions';

const Note = (props) => {
    const { id, title, content, category, author } = props
    const dispatch = useDispatch();
    const history = useNavigate();

    const deleteHandler = (_id) => {
        const confirm = window.confirm('Are you sure want to delete this note ?');
        if (confirm) {
            const data = { method: 'notes', submethod: 'delete', _id }
            dispatch(deleteNote(data));
        }
    }

    return (
        <div className='my-2'>
            <div className="card">
                <div className="card-header" id={`heading${id}`}>
                    <h2 className="mb-0 row">
                        <button className="btn btn-link btn-block text-left col-md-9" type="button" data-toggle="collapse" data-target={`#collapse${id}`} aria-expanded="true" aria-controls={`collapse${id}`}>
                            {title}
                        </button>
                        <button className='btn btn-sm col-md-1 bg-primary text-white ml-5' onClick={() => history(`/note/${id}`)} >Edit</button>
                        <button className='btn btn-sm col-md-1 text-white bg-danger ml-2' onClick={() => deleteHandler(id)}> Delete</button>
                    </h2>
                </div>

                <div id={`collapse${id}`} className="collapse" aria-labelledby={`heading${id}`} data-parent="#accordionExample">
                    <div className="card-body text-left">
                        <span className="badge badge-success">Category - {category}</span>
                        <p className="mt-2">{content}</p>
                        <div className='text-dark'> - {author}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;