import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AdminSidebar from '../../sidebar/AdminSideBar'
import { getDepartments } from '../../../functions/department'
import { addTeacher } from '../../../functions/teacher'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector } from 'react-redux'
const auth = getAuth();

const AddTeacher = () => {

  const { user } = useSelector((state) => ({ ...state }));

  const [departmentData, setDepartmentData] = useState([]);
  const [data, setData] = useState({
    email: "",
    name: "",
    deptId: "",
    phoneNo: "",
    gender: "",
    password: "00000000",
  })

  useEffect(() => {
    getDepartments().then(res => setDepartmentData(res.data));
  }, [])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.deptId.length == 0 || data.email.length == 0 || data.gender.length == 0 || data.name.length == 0 || data.password.length == 0 || data.phoneNo.length == 0) {
      toast.error("All fields are required");
      return;
    }

    if (data.phoneNo.length != 10) {
      toast.error('Phone no. must have 10 digits');
      return;
    }

    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const newUser = userCredential.user;

        console.log(newUser);

        addTeacher(user.token, data).then(res => {
          if (res.status == 200 || res.status == 304) {
            setData({
              email: "",
              deptId: "",
              gender: "",
              name: "",
              phoneNo: "",
              password: "00000000",
            })
            toast.success("Success");
            return;
          }
          toast.error("Fail");
        });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });

  }

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className="restarea bg-[#F2FAFB] w-full md:relative">
        <div className="p-4">
          <h2 className='font-bold text-xl  text-[#0A3C5F]'>Add Teacher</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input onChange={handleChange} id="email" name="email" value={data.email} type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input onChange={handleChange} id="name" name="name" value={data.name} type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Name" />
              </div>
              <div>
                <label htmlFor="deptId" className="sr-only">Department</label>
                <select onChange={handleChange} name="deptId" id="deptId" value={data.deptId} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Department">
                  <option value="">--Select Department--</option>
                  {departmentData.length ? departmentData.map((dept, i) => <option key={i} value={dept.dept_id}>{dept.dept_name}</option>) : <div></div>}
                </select>
              </div>
              <div>
                <label htmlFor="phoneNo" className="sr-only">Phone no.</label>
                <input onChange={handleChange} id="phoneNo" name="phoneNo" value={data.phoneNo} type="number" autoComplete="phoneNo" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Phone no." />
              </div>
              <div>
                <label htmlFor="gender" className="sr-only">Gender</label>
                <select onChange={handleChange} name="gender" id="gender" value={data.gender} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Gender">
                  <option value="">--Select Gender--</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input onChange={handleChange} id="password" name="password" value={data.password} type="password" autoComplete="current-password" disabled required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Password" />
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-3/4">
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

export default AddTeacher