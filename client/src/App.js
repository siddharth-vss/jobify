
import { BrowserRouter,  Route, Routes} from 'react-router-dom';
import React from 'react'
import {Dashboard,Landing,Register,Error,Login} from './pages/index'

const App =()=>{
  
  return (
    <>
     <BrowserRouter>
      <Routes>{/**
        |--------------------------------------------------|
        |          - - - - ROUTES - - - -                  |
        |  <Route path='/' element={ <Dashboard/>} />      |
        |  <Route path="/register" element={<Register/>} />|
        |  <Route path="*" element={<Error/>} />           |
        |  <Route path="/landing" element={<Landing />} /> | 
        |  <Route path="/login" element={<Login/>} />      |
        |                                                  |
        |       - - - - NESTED ROUTES - - - -              |
        |  <Route path='/'>                                |
        |   <Route index element={<Dashboard/>} />         |
        |   <Route path="register" element={<Register/>} />|
        |   <Route path="login" element={<Login/>} />      |
        |   <Route path="landing" element={<Landing />} /> | 
        |   <Route path="*" element={<Error/>} />          |
        |  </Route >                                       |
        |--------------------------------------------------|
  */}  <Route path='/' >
          
          <Route index element={ <Dashboard/>} />
          <Route path="register" element={<Register/>} />
          <Route path="login" element={<Login/>} />
          <Route path="landing" element={<Landing />} />
          <Route path="*" element={<Error/>} />
       </Route>
        </Routes>
      </BrowserRouter>
 
    </>
  );
}

export default App;
