import React, {useState, useEffect} from 'react'
import TeacherSideBar from '../../sidebar/TeacherSideBar'
import { searchTeacherByEmail } from '../../../functions/teacher';
import { useSelector } from 'react-redux';
import TableRow from '../../table/TableRow';

const TeacherDashboard = () => {

  const {user} = useSelector((state) => ({...state}));
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      searchTeacherByEmail(user.token, user.email).then(res => setTeacherData(res.data));
    }
  }, [])

  return (
    <div className='flex min-h-full'>
      <TeacherSideBar />
      <div className="restarea bg-[#F2FAFB] w-full md:relative">
        <div className="p-4">
          <h2 className='font-bold text-xl  text-[#0A3C5F]'>Teacher Dashboard</h2>
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
                      <TableRow td1={'Department'} td2={teacherData.length && teacherData[0].dept_name} />
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

export default TeacherDashboard