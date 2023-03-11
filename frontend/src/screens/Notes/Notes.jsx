import React, { useEffect } from 'react'
import Note from '../../components/Note/Note'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import { getNotes } from '../../redux/action/notesActions'
import Spinner from '../../components/spinner/Spinner'
import Alert from '../../components/alert/Alert'

const itemsPerPage = 10;
const currentPage = 1;

const Notes = () => {
  const history = useNavigate()
  const dispatch = useDispatch();

  const { notes, loading, err } = useSelector((state) => state.getNotes)
  const { deleted, loading: deleteLoading, err: deleteErr } = useSelector((state) => state.deleteNote);
  const { user } = useSelector((state) => state.userLogin);
  const { name, token } = (user || {});

  useEffect(() => {
    if (!token) {
      return history('/');
    }
    fetchNotes();
  }, [deleted, token]);

  const fetchNotes = () => {
    const data = { method: 'notes', submethod: 'get' }
    return dispatch(getNotes(data));
  }

  return (
    <>
      <div className='container'>
        <h2 className='heading text-dark mb-3'>Welcome Back {name || ''} </h2>

        <Link to="/note/create" className='btn btn-primary mb-2'>Create notes</Link>

        <div className="text-center">
          {err && < Alert type='danger' msg={err} />}
          {deleteErr && < Alert type='danger' msg={deleteErr} />}
          <div className="accordion" id="accordionExample">
            {(loading || deleteLoading) && <Spinner />}

            {(notes || []).map((note, key) => {
              const { _id, title, content, category, author } = (note || {})
              return (
                <Note
                  key={_id}
                  id={_id}
                  title={title}
                  content={content}
                  category={category}
                  author={author}
                  fetchNotes={fetchNotes}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes