import { useEffect, useState } from 'react';//, useEffect
import { useNavigate } from 'react-router-dom';//, useEffect
import { Logo, Formin, Alert } from '../component';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { useAppContext } from '../context/appContext';
import '../index.css'

const Login = () => {
 
  let navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const { isLoading, showAlert, displayAlert,user,loginUser } = useAppContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password ) {
      displayAlert();
      return;
    }

    const curentuser = { email , password};
    loginUser(curentuser);
    // const response = await fetch("http://localhost:5000/login", {
    //   method: 'POST',
    //   body: JSON.stringify(form),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // if (response.status === 200) {
    //   const data = await response.json();
    //   console.log(data);
    //   navigate('/');


    // } else {
      
    //    displayAlert();
    // }
  }
  const toggelmember = () => {navigate('/register');}
  const pass = document.getElementById("pass");


  const showpass = () => {
    if (pass.type === "password") {
      pass.setAttribute('type', 'text');
    } else {
      pass.setAttribute('type', 'password');
    }
  }
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }


 useEffect( ()=>{
   
  if(user){
     setTimeout(()=>{
          navigate('/');
     },2000)
  }
 },[navigate, user]);

  return (
    <>
      <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
          <Logo />
          <h3>LOGIN</h3>
          {showAlert && <Alert />}
          {/*<Alert alert={"success"}/>*/}

          {/* name field */}


        

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
            checkbox={true}
            confirm={!form.password}
            func={showpass}
          />

          {/* {form.password.length >= 0 && form.password.length} */}





          <button type='submit' className='btn btn-block' disabled={isLoading || form.password.length < 8 || !form.email.length  } >
            submit
          </button>


          <p>
            Not a Member Yet ?
            <button type='button' className='member-btn' onClick={toggelmember}>
              { "REGISTER"}
            </button>
          </p>



        </form>

      </Wrapper>


    </>
  )
}

export default Login
