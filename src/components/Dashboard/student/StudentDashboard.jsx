import React, { useState, useEffect } from 'react'
import StudentSidebar from '../../sidebar/StudentSidebar';

import { searchStudentByEmail } from '../../../functions/student';
import { useSelector } from 'react-redux';
import TableRow from '../../table/TableRow';

const StudentDashboard = () => {

  const { user } = useSelector((state) => ({ ...state }));
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      searchStudentByEmail(user.token, user.email).then(res => setStudentData(res.data));
    }
  }, [])

  return (
    <div className='flex'>
        <StudentSidebar />
        <div className="restarea bg-[#F2FAFB] w-full md:relative">
          <div className="p-4">
            <h2 className='font-bold text-xl  text-[#0A3C5F]'>Student Dashboard</h2>
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

export default StudentDashboard