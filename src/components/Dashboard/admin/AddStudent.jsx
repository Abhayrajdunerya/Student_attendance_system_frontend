import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AdminSidebar from '../../sidebar/AdminSideBar'
import { getDepartments } from '../../../functions/department'
import { addStudent } from '../../../functions/student'

// import {auth} from '../../../firebase'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector } from 'react-redux'

const auth = getAuth();

const AddStudent = () => {

  const { user } = useSelector((state) => ({ ...state }));

  const [departmentData, setDepartmentData] = useState([]);
  const [data, setData] = useState({
    email: "",
    name: "",
    rollNo: "",
    deptId: "",
    year: "",
    sem: "",
    section: "",
    phoneNo: "",
    gender: "",
    password: "00000000",
  })

  useEffect(() => {
    getDepartments().then(res => setDepartmentData(res.data));
  }, [])

  useEffect(() => {
    if (data.sem == 1 || data.sem == 2) {
      setData({ ...data, year: 1 });
    } else if (data.sem == 3 || data.sem == 4) {
      setData({ ...data, year: 2 });
    } else if (data.sem == 5 || data.sem == 6) {
      setData({ ...data, year: 3 });
    } else if (data.sem == 7 || data.sem == 8) {
      setData({ ...data, year: 4 });
    }
}, [data.sem])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.rollNo.length == 0 || data.deptId.length == 0 || data.email.length == 0 || data.gender.length == 0 || data.name.length == 0 || data.phoneNo.length == 0 || data.year.length == 0 || data.sem.length == 0 || data.section.length == 0) {
      toast.error("All fields are required");
      return;
    }

    // -------------------------------------------------------------------------

    if (data.phoneNo.length != 10) {
      toast.error('Phone no. must have 10 digits');
      return;
    }

    if (data.rollNo.length != 7) {
      toast.error('Roll no. must have 7 characters');
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

        addStudent(user.token, data).then(res => {
          if (res.data) {
            setData({
              email: "",
              deptId: "",
              gender: "",
              name: "",
              phoneNo: "",
              rollNo: "",
              section: "",
              sem: "",
              year: "",
              password: "00000000"
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
          <h2 className='font-bold text-xl  text-[#0A3C5F]'>Add Student</h2>
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
                <label htmlFor="rollNo" className="sr-only">Roll no.</label>
                <input onChange={handleChange} id="rollNo" name="rollNo" value={data.rollNo} type="text" autoComplete="rollNo" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Roll no." />
              </div>
              <div>
                <label htmlFor="deptId" className="sr-only">Branch</label>
                <select onChange={handleChange} name="deptId" id="deptId" value={data.deptId} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Branch">
                  <option value="">--Select Department--</option>
                  {departmentData.length ? departmentData.map((dept, i) => <option key={i} value={dept.dept_id}>{dept.dept_name}</option>) : <div></div>}
                </select>
              </div>
              {/* <div>
                <label htmlFor="year" className="sr-only">Year</label>
                <select onChange={handleChange} name="year" id="year" value={data.year} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Year">
                  <option value="">--Select Year--</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div> */}
              <div>
                <label htmlFor="sem" className="sr-only">Sem</label>
                <select onChange={handleChange} name="sem" id="sem" value={data.sem} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Sem">
                  <option value="">--Select Sem--</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </select>
              </div>
              <div>
                <label htmlFor="section" className="sr-only">Section</label>
                <select onChange={handleChange} name="section" id="section" value={data.section} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:w-3/4" placeholder="Section">
                  <option value="">--Select Section--</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
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

export default AddStudent