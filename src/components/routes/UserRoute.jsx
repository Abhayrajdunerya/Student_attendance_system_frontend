import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentStudent } from '../../functions/auth'

const UserRoute = ({ children, ...rest }) => {

  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentStudent(user.token)
        .then((res) => {
          console.log('CURRENT STUDENT RES ', res);
          setOk(true);
        })
        .catch((err) => {
          console.log('STUDENT ROUTE ERR', err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? children : <LoadingToRedirect />
};

export default UserRoute