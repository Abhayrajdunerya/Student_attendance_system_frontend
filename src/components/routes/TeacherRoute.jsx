import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentTeacher } from '../../functions/auth';

const TeacherRoute = ({children, ...rest}) => {

  const {user} = useSelector((state) => ({...state}));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentTeacher(user.token)
      .then((res) => {
        console.log('CURRENT TEACHER RES ', res);
        setOk(true);
      })
      .catch((err) => {
        console.log('TEACHER ROUTE ERR', err);
        setOk(false);
      });
    }
  }, [user]);

  return ok ? children : <LoadingToRedirect />
};

export default TeacherRoute