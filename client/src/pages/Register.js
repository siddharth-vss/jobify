import { useState } from 'react';//, useEffect
import { Logo, Formin, Alert } from '../component';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { useAppContext } from '../context/appContext';
import '../index.css'

const Register = () => {
  const [form, setForm] = useState({email : "", password : ""});
  const { isLoading, showAlert ,displayAlert } = useAppContext();

  const [isMember, setisMember] = useState(true);
  const onSubmit = (e) => { 
    e.preventDefault(); 
    const{email,password,name}=form;
    if(!email || !password || (!isMember && !name)){
      displayAlert();
      return;
    }

    console.log(form); 
  };
  const toggelmember = () => { setisMember(!isMember); }
  const pass = document.getElementById("pass");


  const showpass = () => {
    if (pass.type === "password") {
      pass.setAttribute('type', 'text');
    } else {
      pass.setAttribute('type', 'password');
    }}
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
          <Logo />
          <h3>{isMember ? "LOGIN" : "REGISTER"}</h3>
          {showAlert && <Alert/>}
          {/*<Alert alert={"success"}/>*/}

          {/* name field */}


          {!isMember && (
            <Formin
              type={"text"}
              value={form.name}
              name={"name"}
              onChange={handleChange}
            />)}

          <Formin
            type={"email"}
            value={form.email}
            name={"email"}
            onChange={handleChange}
          />
          <Formin
            id={"pass"}
            type={"password"}
            value={form.password}
            name={"password"}
            onChange={handleChange}
          />
          <input disabled={!form.password}  className='pass' type='checkbox'  onClick={showpass}  />
          {/* {form.password.length >= 0 && form.password.length} */}





          <button type='submit' className='btn btn-block'>
            submit
          </button>


          <p>
            {!isMember ? "Not a Member Yet ?" : "Alredy Member?"}
            <button type='button' className='member-btn' onClick={toggelmember}>
              {!isMember ? "LOGIN" : "REGISTER"}
            </button>
          </p>



        </form>

      </Wrapper>
      {/*
|--------------------------------------------------
| only remove the  *//* from below code 
|--------------------------------------------------
*/}
      {/*form.length >0 && <ul>{
       form.map( (e)=>{
      return (
       
        <li>
          <h1>{e.name}</h1>
          <p>{e.email}</p>
        </li>

      )
    } )} </ul>*/}
    </>
  )
}

export default Register
