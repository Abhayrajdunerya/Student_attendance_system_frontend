import React, {useState, useEffect} from 'react'
import AdminSidebar from '../../sidebar/AdminSideBar'
import ListCard from '../../cards/ListCard'
import {searchTeachers} from '../../../functions/teacher'
import {getDepartments} from '../../../functions/department'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const ListTeacher = () => {

  const { user } = useSelector((state) => ({ ...state }));

  const [allTeachers, setAllTeachers] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [searchData, setSearchData] = useState({
    deptId: "",
  })

  useEffect(() => {
    getDepartments().then(res => setDepartmentData(res.data));
  }, [])

  const handleChange = (e) => {
    setSearchData({...searchData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchData.deptId.length == 0) {
      toast.error("Department is required");
      return;
    }

    searchTeachers(user.token, searchData).then(res => setAllTeachers(res.data));

  }

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className="restarea bg-[#F2FAFB] w-full md:relative">
          <div className="p-4">
          <h2 className='font-bold text-xl  text-[#0A3C5F]'>List Teachers</h2>
          <div className="from">
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 md:w-3/4 w-full" method="POST">
            <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="deptId" className="sr-only">Department</label>
                  <select onChange={handleChange} name="deptId" id="deptId" value={searchData.deptId} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Gender">
                    <option value="">--Select Department--</option>
                    {departmentData.length ? departmentData.map((dept, i) => <option key={i} value={dept.dept_id}>{dept.dept_name}</option>) : <div></div>}
                  </select>
                </div>
              </div>
              <div>
                <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Search
                </button>
              </div>
          </form>
          </div>
          <section class="text-gray-600 body-font">
            <div class="px-5 py-24 mx-auto">
              
              <div class="flex flex-wrap -m-2">
                {allTeachers.length ? allTeachers.map((teacher, i) => <ListCard key={i} name={teacher.name} rollNo={teacher.phone_no} email={teacher.email} gender={teacher.gender} role='teacher' />) : <div>No teachers found</div>}
                
              </div>
            </div>
          </section>
          </div>
      </div>
    </div>
  )
}

export default ListTeacher