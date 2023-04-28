import React, { useState, useEffect } from 'react'
import TeacherSideBar from '../../sidebar/TeacherSideBar'
import { getDepartments } from '../../../functions/department'
import { getSubjects } from '../../../functions/subject'
import { getLectureData } from '../../../functions/attendance'
import LectureCard from '../../cards/LectureCard'
import { useSelector } from 'react-redux'

const AttendanceReport = () => {

    const [departmentData, setDepartmentData] = useState([]);
    const [subjectData, setSubjectData] = useState([])
    const [lectureData, setLectureData] = useState([])

    const {user} = useSelector((state) => ({...state}));


    const [searchData, setSearchData] = useState({
        sem: "",
        deptId: "",
        section: "",

        year: "",
        subjectCode: "",
        teacherEmail: user.email,
        fromDate: "",
        toDate: "",
    })


    useEffect(() => {
        setSearchData({ ...searchData, teacherEmail: user.email });
    }, [])

    useEffect(() => {
        getDepartments().then(res => setDepartmentData(res.data));
    }, [])

    useEffect(() => {
        if (searchData.sem == 1 || searchData.sem == 2) {
            setSearchData({ ...searchData, year: 1 });
        } else if (searchData.sem == 3 || searchData.sem == 4) {
            setSearchData({ ...searchData, year: 2 });
        } else if (searchData.sem == 5 || searchData.sem == 6) {
            setSearchData({ ...searchData, year: 3 });
        } else if (searchData.sem == 7 || searchData.sem == 8) {
            setSearchData({ ...searchData, year: 4 });
        }
        getSubjects(searchData).then(res => setSubjectData(res.data));
    }, [searchData.sem, searchData.deptId])

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchData.deptId.length == 0 || searchData.section.length == 0 || searchData.sem.length == 0 || searchData.fromDate.length == 0 || searchData.toDate.length == 0 || searchData.subjectCode.length == 0 || searchData.teacherEmail.length == 0) {
            toast.error("All fields are required");
            return;
        }

        await getLectureData(user.token, searchData).then(res => {
            setLectureData(res.data)
        });
    }

    return (
        <div className='flex'>
            
            <TeacherSideBar />
            <div className="restarea bg-[#F2FAFB] w-full md:relative">

                <div className="p-4">
                    <h2 className='font-bold text-xl  text-[#0A3C5F]'>Attendance Report</h2>
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
                                    <select onChange={handleChange} name="section" id="section" value={searchData.section} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Section">
                                        <option value="">--Select Section--</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="subjectCode" className="sr-only">Subject</label>
                                    <select onChange={handleChange} name="subjectCode" id="subjectCode" value={searchData.subjectCode} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Subject">
                                        <option value="">--Select Subject--</option>
                                        {subjectData.length ? subjectData.map((sub, i) => <option key={i} value={sub.subject_code}>{sub.subject_name}</option>) : <div></div>}

                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="fromDate" className="sr-only">Date</label>
                                    <input type={'date'} placeholderText='--Select From Date--' id='fromDate' name='fromDate' value={searchData.fromDate} required onChange={(e) => setSearchData({ ...searchData, fromDate: e.target.value })} placeholder="From Date" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="toDate" className="sr-only">Date</label>
                                    <input type={'date'} placeholderText='--Select To Date--' id='toDate' name='toDate' value={searchData.toDate} required onChange={(e) => setSearchData({ ...searchData, toDate: e.target.value })} placeholder="To Date" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
                                </div>
                            </div>
                            <div className='flex space-x-2'>
                                <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-100">
                                    Show
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-wrap my-4">
                        {lectureData ? lectureData.map((lecture, i) => <LectureCard key={i} lecture={lecture} />) : "No lecture found"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceReport