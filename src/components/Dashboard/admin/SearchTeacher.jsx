import React, {useState} from 'react'
import {toast} from 'react-toastify'
import AdminSidebar from '../../sidebar/AdminSideBar'

import { searchTeacherByEmail, searchTeacherByPhoneNo, removeTeacherByEmail } from '../../../functions/teacher'
import TableRow from '../../table/TableRow';
import { useSelector } from 'react-redux';

const SearchTeacher = () => {

  const { user } = useSelector((state) => ({ ...state }));

  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [teacherData, setTeacherData] = useState([])

  const handleClick = (e) => {
    e.preventDefault();

    if (email.length == 0 && phoneNo.length == 0) return;

    if (email.length > 0) {
      searchTeacherByEmail(user.token, email).then(res => setTeacherData(res.data))
      return;
    }

    searchTeacherByPhoneNo(user.token, phoneNo).then(res => setTeacherData(res.data))
  }

  const handleRemove = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete teacher?")) {
      return;
    }

    if (teacherData.length > 0) {
      removeTeacherByEmail(user.token, teacherData[0].email).then(res => {
        if (res.data) {
          toast.success("Teacher is deleted");
          setTeacherData([]);
          return;
        }

        toast.error("Fail");
      })
    }

  }

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className="restarea bg-[#F2FAFB] w-full md:relative">
      <div className="p-4">
      <h2 className='font-bold text-xl mb-4  text-[#0A3C5F]'>Search Teacher</h2>
          <div className="flex">
            <div className="rounded-md shadow-sm -space-y-px mx-2">
              <div>
                <input onChange={e => { setPhoneNo(''), setEmail(e.target.value) }} id="email" name="email" value={email} type="email" autoComplete="email" autoFocus={true} className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Enter email" />
              </div>
            </div>
            or
            <div className="rounded-md shadow-sm -space-y-px mx-2">
              <div>
                <input onChange={e => { setEmail(''), setPhoneNo(e.target.value) }} id="phoneNo" name="phoneNo" value={phoneNo} type="number" autoComplete="phoneNo" autoFocus={true} className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Enter phone no." />
              </div>
            </div>
          </div>
          <button onClick={handleClick} className="group mx-2 my-2 relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Search
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <tbody>
                      <TableRow td1={'Name'} td2={teacherData.length && teacherData[0].name} />
                      <TableRow td1={'Email'} td2={teacherData.length && teacherData[0].email} />
                      <TableRow td1={'Phone no.'} td2={teacherData.length && teacherData[0].phone_no} />
                      <TableRow td1={'Gender'} td2={teacherData.length && teacherData[0].gender} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleRemove} disabled={teacherData.length == 0} className="group mx-2 my-2 relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchTeacher