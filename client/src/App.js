
import { BrowserRouter,  Route, Routes  } from 'react-router-dom';
import React from 'react'
import {Dashboard,Landing,Register,Error} from './pages/index'

function App() {
  return (
    <>
  

      <BrowserRouter>
      {/* <nav>
        <Link to="/" >HOME</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/landing" >LANDING PAGE </Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/register" >REGISTER</Link>
      </nav> */}
        <Routes>
          <Route path='/' element={ <Dashboard/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
 
    </>
  );
}

export default App;
