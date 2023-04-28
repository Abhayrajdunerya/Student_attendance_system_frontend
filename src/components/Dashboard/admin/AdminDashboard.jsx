import React, { useState, useEffect } from 'react'

import AdminSidebar from '../../sidebar/AdminSideBar';
import { getAdminByEmail } from '../../../functions/teacher';
import { useSelector } from 'react-redux';
import TableRow from '../../table/TableRow';

const AdminDashboard = () => {

  const { user } = useSelector((state) => ({ ...state }));
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      getAdminByEmail(user.token, user.email).then(res => {
        console.log(res.data);
        setAdminData(res.data)
      });
    }
  }, [])

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className="restarea bg-[#F2FAFB] w-full md:relative">
        <div className="p-4">
          <h2 h2 className='font-bold text-xl  text-[#0A3C5F]'>Admin Dashboard</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <tbody>
                      <TableRow td1={'Name'} td2={adminData.length && adminData[0].name} />
                      <TableRow td1={'Email'} td2={adminData.length && adminData[0].email} />
                      <TableRow td1={'Phone no.'} td2={adminData.length && adminData[0].phone_no} />
                      <TableRow td1={'Gender'} td2={adminData.length && adminData[0].gender} />
                      <TableRow td1={'Department'} td2={adminData.length && adminData[0].dept_name} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
        {JSON.stringify(adminData)}
      </div>
    </div>
  )
}

export default AdminDashboard