import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Notes from './screens/Notes/Notes';
import Demo from './screens/Demo';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import CreateNote from './screens/CreateNote/CreateNote';
import EditNote from './screens/EditNote/EditNote';
import UpdateProfile from './screens/UpdateProfile/UpdateProfile';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" key="landingPage" element={<LandingPage />} />
        <Route exact path="/demo" key="demo" element={<Demo />} />
        <Route exact path="/" key="home" element={<LandingPage />} />
        <Route exact path="/login" key="login" element={<Login />} />
        <Route exact path="/register" key="register" element={<Register />} />
        <Route exact path="/profile/update" key="update" element={<UpdateProfile />} />
        <Route exact path="/notes" key="notes" element={<Notes />} />
        <Route exact path="/note/create" key="create" element={<CreateNote />} />
        <Route exact path="/note/:id" key="edit" element={<EditNote />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
