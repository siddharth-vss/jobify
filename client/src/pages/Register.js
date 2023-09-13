import { useState, useEffect } from 'react';
import { Logo } from '../component';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

const initialState = {
   name:"",
   Email:"",
   password:"",
   isMember: true
};

const Register = () => {
    
const handleChange = (e) =>{
 console.log(e.targate.name)
}

const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name);
  };
    const [values, setValues] = useState(initialState);

  return (
    <>
     <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>

        {/* name field */}
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
    </>
  )
}

export default Register
