import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import ToastComponent from './ToastComponent';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { UserProvider } from './UserContext';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <UserProvider>
      <ToastComponent />
      <Router>
        <Routes>
          <Route path='/navbar' element={<Navbar/>}/>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}


export default App;
