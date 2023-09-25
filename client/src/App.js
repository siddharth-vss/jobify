
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import { Landing, Register, Error, Login,ProtectedRoute } from './pages/index'
import {SharedLayout,Addjob,Alljob,Profile,Stats} from './pages/dashboard/index'
const App = () => {

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
  */}  

            <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>} >
                <Route index element={<Stats/>} />
                <Route path='/add-job' element={<Addjob/>} />
                <Route path='/all-job' element={<Alljob/>} />
                <Route path='/profile' element={<Profile/>} />
            </Route>
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Error />} />
         
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
