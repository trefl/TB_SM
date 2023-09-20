import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import Workers from './pages/Workers';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import AddWorker from './pages/AddWorker';
import EditWorker from './pages/EditWorker';

function App () {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/users/add" element={<AddUser />}/>
          <Route path="/users/edit/:id" element={<EditUser />}/>
          <Route path="/workers" element={<Workers />}/>
          <Route path="/workers/add" element={<AddWorker />}/>
          <Route path="/workers/edit/:id" element={<EditWorker />}/>

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
