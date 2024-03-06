/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import {
  DISPLAY_ALERT,
  HANDLE_CHANGE,
  CLEAR_ALERT,
  CLEAR_VALUES,
  TOGGLE_SIDEBAR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,


} from './actions'
import axios from 'axios';


const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');





export const initialState = {
  showSidebar: false,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',



  interview : 56 ,
  pending : 53,
  declined: 10,

  /**
  |--------------------------------------------------|
  |       for job                                    |
  |--------------------------------------------------|
  */
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  // jobLocation
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',

  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],

  stats: {},
  monthlyApplications: [],

  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};





const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  

  const sp = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });
  // response interceptor
  sp.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  sp.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );


  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };


    
  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await sp.post(`/${endPoint}`, currentUser);

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


  const setEditJob = (id) => {
    // console.log('edit =>', id);
    // console.log(state);
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }
  const editJob = async (currentUser) => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = currentUser;
  
      await sp.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
      
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await sp.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  }

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

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await sp.get('/jobs/state')
      console.log(data);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
console.log(error.response)
      // logoutUser()
    }

clearAlert()
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await sp.post('/', currentUser);
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

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await sp.post('/login', currentUser);
      console.log(response.data);
      const { user, location, token } = response.data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          location
        }
      });
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

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });

  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await sp.patch('/update', currentUser);
      console.log(data);
      const { user, token, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token: initialState.token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    };
    clearAlert();

  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  // const createJob = async () => {
  //   dispatch({ type: CREATE_JOB_BEGIN });
  //   try {
  //     const { position, company, jobLocation, jobType, status } = state;

  //     const LKJ = await sp.post('/jobs', {
  //       company,
  //       position,
  //       jobLocation,
  //       jobType,
  //       status,
  //     });

  //     console.log(LKJ);

  //     dispatch({
  //       type: CREATE_JOB_SUCCESS,
  //     });
  //     // call function instead clearValues()
  //     dispatch({ type: CLEAR_VALUES });
  //   } catch (error) {
  //     if (error.response.status === 401) return;
  //     dispatch({
  //       type: CREATE_JOB_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });

  //   }
  //   clearAlert();
  // };

  const createJob = async (currentUser) => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const response = await sp.post('/jobs', currentUser);
      console.log(response.data);

      dispatch({ type: CREATE_JOB_SUCCESS });

    } catch (error) {
      console.log(error.response);
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };


  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }

  // const getJobs = async () => {

  //   try{
  //      const res = await sp.get('/jobs');
  //      console.log("res",res,"res data ",res?.data );

  //   } catch (error) {
  //     console.log(error.response)
  //     logoutUser()
  //   }
  //   clearAlert()
  // }
  const getJobs = async () => {
    // will add page later
    const { search, searchStatus, searchType, sort } = state;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await sp.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      // logoutUser()
    }
    clearAlert();
  };




  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        showStats,
        registerUser,
        loginUser,
        removeUserFromLocalStorage,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        clearValues,
        createJob,
        handleChange,
        getJobs,
        clearFilters,
        setEditJob,
        deleteJob,
        editJob,
        changePage,


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