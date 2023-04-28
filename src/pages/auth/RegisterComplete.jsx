import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {createOrUpdateUser} from '../../functions/auth';
import img from '../../assets/react.svg'

const RegisterComplete = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [gender, setGender] = useState("");
  // const [role, setRole] = useState("student");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    gender: "",
    role: "student",
  });

  const { user } = useSelector((state) => ({ ...state }));

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    setUserData({...userData, email: window.localStorage.getItem('emailForRegistration')});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userData.email || !userData.password || !userData.name || !userData.phone || !userData.gender) {
      toast.error('All fields are required.');
      return;
    }

    if (userData.phone.length != 10) {
      toast.error('Phone no. must have 10 digits');
      return;
    }

    if (userData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(userData.email, window.location.href);
      window.localStorage.removeItem('emailForRegistration');

      let user = auth.currentUser;
      await user.updatePassword(password);
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token, userData)
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
          },
        });
      })
      .catch(error => console.log(error));

      // Redirect
      navigate('/');

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={img} alt="Workflow" />
              <h2 className={`mt-6 text-center text-3xl font-extrabold ${loading ? 'text-red-600' : 'text-gray-900'}`}>{ loading ? 'Loading...' : 'Register your account'}</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <Link to={'/login'} className="font-medium text-blue-600 hover:text-blue-500" > Login</Link>
              </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input onChange={handleChange} id="email" name="email" value={userData.email} type="email" autoComplete="email" required disabled className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input onChange={handleChange} id="name" name="name" value={userData.name} type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Name" />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <input onChange={handleChange} id="phone" name="phone" value={userData.phone} type="number" autoComplete="number" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Phone no." />
                </div>
                <div>
                  <label htmlFor="gender" className="sr-only">Gender</label>
                  <select onChange={handleChange} name="gender" id="gender" value={userData.gender} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Gender">
                    <option value="">--Select Gender--</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input onChange={handleChange} id="password" name="password" value={userData.password} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to={'/forgot-password'} className="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </Link>
                </div>
              </div>

              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Register
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete