import { useCallback, useState } from 'react';

//libs
import { useSelector, useDispatch } from 'react-redux';

//redux
import {
  loginSuccess,
  initialize,
  logoutSuccess,
  registerSuccess,
} from '../redux/slices/auth';
import { useSnackbar } from 'notistack';

import { isValidToken, setSession } from '../utils/jwt';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import axiosInstance from '../utils/axiosInstance';

const useAuth = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [apiloading, setapiloading] = useState(false);

  const registerClient = useCallback(async (userData, toggleModal) => {
    if (
      userData.name == '' ||
      userData.email == '' ||
      userData.phone == 0 ||
      userData.department == '' ||
      userData.joiningDate == '' ||
      userData.password == ''
    ) {
      enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
      return;
    }

    const response = await axios.post('/auth/signup', userData);
    //console.log(response, "i am signup response");
    if (!response.data.ok) {
      enqueueSnackbar(response.data.message, { variant: 'error' });
      toggleModal();

      return;
    }
    toggleModal();
    enqueueSnackbar(response.data.message, { variant: 'success' });
  }, []);

  const login = useCallback(async (userData) => {
    setapiloading(true);
    const response = await axios.post('/auth/login', userData);
    setapiloading(false);
    console.log(response, 'i am login response');
    if (!response.data.ok) {
      enqueueSnackbar(response.data.message, { variant: 'error' });
      return;
    } else {
      const { token, user } = response.data;
      setSession(token);
      dispatch(loginSuccess({ user }));
    }
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    dispatch(logoutSuccess());
    navigate('/');
  }, []);

  const initializeAuth = useCallback(async () => {
    const accessToken = window.localStorage.getItem('accessToken');

    if (isValidToken(accessToken)) {
      setSession(accessToken);
      const response = await axios.get('/auth/jwtVerify');
      //console.log(response, "i am initialize response");
      if (response) {
        const { user } = response.data;
        delete user.password;
        if (user.isActive === false) {
          dispatch(logoutSuccess());
          navigate('/');
          return;
        }

        dispatch(
          initialize({
            user,
            isLoggedIn: true,
          })
        );
      } else {
        dispatch(
          initialize({
            user: null,
            isLoggedIn: false,
          })
        );
      }
    } else {
      dispatch(
        initialize({
          user: null,
          isLoggedIn: false,
        })
      );
    }
  }, []);

  const changePassword = useCallback(async (data) => {
    const res = await axiosInstance.post(
      `/auth/changePassword/${user._id}`,
      data
    );
    //console.log(res, "change password response");
    if (!res.data.ok) {
      enqueueSnackbar(res.data?.message || 'Something went wrong!', {
        variant: 'error',
      });
      return;
    }
    enqueueSnackbar('Password changed successfully!', { variant: 'success' });
  }, []);

  return {
    registerClient,
    login,
    logout,
    initializeAuth,
    isLoggedIn,
    user,
    changePassword,
    apiloading,
  };
};

export default useAuth;
