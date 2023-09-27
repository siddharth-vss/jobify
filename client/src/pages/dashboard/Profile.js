

import { useState } from 'react';
import { Formin, Alert } from '../../component/index';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  document.title = 'JOBIFY-Profile';
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [form, setForm] = useState({
    name :user.name,
    email:user.email,
    location : user.location,
    age : user.age
  });

  const{name,email,location,age}= form;
  // const{name,email,location,age} = user ;

 const ehand = (e) =>{
  console.log(e.target.name ,e.target.value);
     setForm({...form,[e.target.name]: e.target.value})
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email  || !age || !location) {
      // test and remove temporary
      displayAlert();
      return;
    }

    updateUser(form);
  };
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4 className='form-title' >profile </h4>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <Formin
            type='text'
            name='name'
            value={name}
            onChange={ehand}            
          />
          <Formin
            labelText='age'
            type='text'
            name='age'
            value={age}
            onChange={ehand}           
          />
          <Formin
            type='email'
            name='email'
            value={email}
            onChange={ehand}            
          />

          <Formin
            type='text'
            name='location'
            value={location}
            onChange={ehand}
          />
          <button className='btn btn-block form-btn' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;