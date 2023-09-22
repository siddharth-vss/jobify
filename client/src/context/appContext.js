import React, {  useReducer, useContext } from 'react';
import reducer from './reducer';
import {DISPLAY_ALERT ,
        CLEAR_ALERT ,
        REGISTER_USER_BEGIN,
        REGISTER_USER_ERROR ,
        REGISTER_USER_SUCCESS,
        LOGIN_USER_BEGIN,
        LOGIN_USER_ERROR ,
        LOGIN_USER_SUCCESS,
        SETUP_USER_BEGIN,
        SETUP_USER_ERROR ,
        SETUP_USER_SUCCESS,
      
      } from './actions'
import axios from 'axios';

const PORT = 'http://localhost:5000';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');


export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation : userLocation || '',
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };
  


  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`${PORT}/${endPoint}`, currentUser);
  
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };
  
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('location');
  };
  


  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(`${PORT}`, currentUser);
      console.log(response.data);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
  
      addUserToLocalStorage({
        user,
        token,
        location,
      })
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };


  const loginUser = async(currentUser) =>{
    dispatch({ type : LOGIN_USER_BEGIN});
    try {
      const response = await axios.post(`${PORT}/login`,currentUser);
      console.log(response.data);
      const{user , location, token} = response.data;

      dispatch({
        type : LOGIN_USER_SUCCESS,
        payload:{
          user,
          token,
          location
          }});
          addUserToLocalStorage({
            user,
            token,
            location,
          })     
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.error },
      });
    }
    clearAlert();
  };
  
 
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        removeUserFromLocalStorage,
        setupUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};



export { AppProvider };