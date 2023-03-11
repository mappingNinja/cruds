import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNotes } from '../../redux/action/notesActions';
import { logout } from '../../redux/action/userActions';

const Header = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogin);
  const { token } = (user || {})
  const { pathname: pathName } = useLocation();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!search && pathName === '/notes' && token) {
      fetchNotes()
    }
  }, [search])

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotes();
  }
  const fetchNotes = () => {
    const data = { method: 'notes', submethod: 'get', search: search }
    if (!!search) {
      data.search = search;
    }
    return dispatch(getNotes(data));
  }

  const handleLogout = () => {
    dispatch(logout());
    history('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Note Zipper</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notes">My Notes</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                Users
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/profile/update">My Profile</Link>
                <span className="dropdown-item" onClick={handleLogout}>Logout</span>
              </div>
            </li>
          </ul>
          {pathName === '/notes' ? (
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleSearch}>Search</button>
            </form>) : null}
        </div>
      </div>
    </nav>
  )
}

export default Header;