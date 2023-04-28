import React, { useState } from 'react'
import TeacherSideBar from '../../sidebar/TeacherSideBar'

import { searchStudentByEmail, searchStudentByRollNo } from '../../../functions/student'
import TableRow from '../../table/TableRow';
import { useSelector } from 'react-redux';

const SearchStudentTeacher = () => {

    const { user } = useSelector((state) => ({ ...state }));

    const [email, setEmail] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [studentData, setStudentData] = useState([])


    const handleClick = (e) => {
        e.preventDefault();

        if (email.length == 0 && rollNo.length == 0) return;

        if (email.length > 0) {
            searchStudentByEmail(user.token, email).then(res => setStudentData(res.data))
            return;
        }

        searchStudentByRollNo(user.token, rollNo).then(res => setStudentData(res.data))

    }

    return (
        <div className='flex'>
            <TeacherSideBar />
            <div className="restarea bg-[#F2FAFB] w-full md:relative">
                <div className="p-4">
                <h2 className='font-bold text-xl  text-[#0A3C5F] my-2'>Search Students</h2>
                    <div className="flex">
                        <div className="rounded-md shadow-sm -space-y-px mx-2">
                            <div>
                                <input onChange={e => { setRollNo(''), setEmail(e.target.value) }} id="email" name="email" value={email} type="email" autoComplete="email" autoFocus={true} className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Enter email" />
                            </div>
                        </div>
                        or
                        <div className="rounded-md shadow-sm -space-y-px mx-2">
                            <div>
                                <input onChange={e => { setEmail(''), setRollNo(e.target.value) }} id="rollNo" name="rollNo" value={rollNo} type="text" autoComplete="rollNo" autoFocus={true} className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Enter roll no." />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick} className="group mx-2 my-2 relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                                            <TableRow td1={'Name'} td2={studentData.length && studentData[0].name} />
                                            <TableRow td1={'Email'} td2={studentData.length && studentData[0].email} />
                                            <TableRow td1={'Roll no.'} td2={studentData.length && studentData[0].roll_no} />
                                            <TableRow td1={'Branch'} td2={studentData.length && studentData[0].dept_name} />
                                            <TableRow td1={'Section'} td2={studentData.length && studentData[0].section} />
                                            <TableRow td1={'Year'} td2={studentData.length && studentData[0].year} />
                                            {/* <TableRow td1={'Sem'} td2={studentData.length && studentData[0].sem} /> */}
                                            <TableRow td1={'Phone no.'} td2={studentData.length && studentData[0].phone_no} />
                                            <TableRow td1={'Gender'} td2={studentData.length && studentData[0].gender} />                                          
            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchStudentTeacher