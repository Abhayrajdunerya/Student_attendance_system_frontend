import React, {useState, useEffect} from 'react'
import AdminSidebar from '../../sidebar/AdminSideBar'
import ListCard from '../../cards/ListCard'
import {searchStudents} from '../../../functions/student'
import {getDepartments} from '../../../functions/department'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const ListStudents = () => {

  const { user } = useSelector((state) => ({ ...state }));

  const [allStudents, setAllStudents] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [searchData, setSearchData] = useState({
    sem: "",
    deptId: "",
    section: "",
  })

  useEffect(() => {
    getDepartments().then(res => setDepartmentData(res.data));
  }, [])

  const handleChange = (e) => {
    setSearchData({...searchData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchData.deptId.length == 0 || searchData.section.length == 0 || searchData.sem.length == 0) {
      toast.error("All fields are required");
      return;
    }

    searchStudents(user.token, searchData).then(res => setAllStudents(res.data));

  }

  return (
    <div className='flex'>
        <AdminSidebar />
        <div className="restarea bg-[#F2FAFB] w-full md:relative">
        <div className="p-4">
        <h2 className='font-bold text-xl  text-[#0A3C5F]'>List Students</h2>
          <div className="from">
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 md:w-3/4 w-full" method="POST">
            <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="deptId" className="sr-only">Branch</label>
                  <select onChange={handleChange} name="deptId" id="deptId" value={searchData.deptId} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Gender">
                    <option value="">--Select Branch--</option>
                    {departmentData.length ? departmentData.map((dept, i) => <option key={i} value={dept.dept_id}>{dept.dept_name}</option>) : <div></div>}
                  </select>
                </div>
                <div>
                  <label htmlFor="sem" className="sr-only">Sem</label>
                  <select onChange={handleChange} name="sem" id="sem" value={searchData.sem} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Gender">
                    <option value="">--Select Sem--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="section" className="sr-only">Section</label>
                  <select onChange={handleChange} name="section" id="section" value={searchData.section} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Gender">
                    <option value="">--Select Section--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
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
          <section className="text-gray-600 body-font">
            <div className="px-5 py-24 mx-auto">
              
              <div className="flex flex-wrap -m-2">
                {allStudents.length ? allStudents.map((student, i) => <ListCard key={i} name={student.name} rollNo={student.roll_no} email={student.email} gender={student.gender} role='student' />) : <div>No students found</div>}
                
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ListStudents