import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterUser from './Components/registerUser';
import LoginUser from './Components/LoginUser';
import User from './Components/Users';
import UpdateUser from './Components/UpdateUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={LoginUser} />
          <Route  path="/users" Component={User} />
          <Route  path="/register" Component={RegisterUser} />
          <Route  path="/edit" Component={UpdateUser} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
