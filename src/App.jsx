import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'

import Home from './pages/Home'
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';

import AdminDashboard from './components/Dashboard/admin/AdminDashboard';
import TeacherDashboard from './components/Dashboard/teacher/TeacherDashboard';
import StudentDashboard from './components/Dashboard/student/StudentDashboard';

import AddStudent from './components/Dashboard/admin/AddStudent'
import SeacrhStudent from './components/Dashboard/admin/SeacrhStudent'
import ListStudents from './components/Dashboard/admin/ListStudents'

import AddTeacher from './components/Dashboard/admin/AddTeacher'
import SearchTeacher from './components/Dashboard/admin/SearchTeacher'
import ListTeacher from './components/Dashboard/admin/ListTeacher'

import TakeAttendance from './components/Dashboard/teacher/TakeAttendance'
import AttendanceReport from './components/Dashboard/teacher/AttendanceReport'
import SearchStudentTeacher from './components/Dashboard/teacher/SearchStudentTeacher'
import ListStudentsTeacher from './components/Dashboard/teacher/ListStudentsTeacher'


import Attendance from './components/Dashboard/student/Attendance'

import AdminRoute from './components/routes/AdminRoute'
import TeacherRoute from './components/routes/TeacherRoute'
import UserRoute from './components/routes/UserRoute'

import { getRole, currentAdmin, currentTeacher, currentStudent } from './functions/auth';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        getRole(user.email)
          .then((res) => {
            if (res.data.role === 'student') {
              currentStudent(idTokenResult.token)
                .then((result) => {
                  dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                      email: user.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      _id: res.data._id,
                    },
                  });
                })
                .catch(err => console.log(err))
            } else if (res.data.role === 'teacher') {
              currentTeacher(idTokenResult.token)
                .then((result) => {
                  dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                      email: user.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      _id: res.data._id,
                    },
                  });
                })
                .catch(err => console.log(err))
            } else if (res.data.role === 'admin') {
              currentAdmin(idTokenResult.token)
                .then((result) => {
                  dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                      email: user.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      _id: res.data._id,
                    },
                  });
                })
                .catch(err => console.log(err))
            }
        })
        .catch(error => console.log(error))
      }
    });

    return () => unsubscribe();

  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* General Routes */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />

        {/* User Routes */}
        <Route exact path='/student/dashboard' element={<UserRoute><StudentDashboard /></UserRoute>} />
        <Route exact path='/student/attendance' element={<UserRoute><Attendance /></UserRoute>} />

        {/* Teacher Routes */}
        <Route exact path='/teacher/dashboard' element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
        <Route exact path='/teacher/take-attendance' element={<TeacherRoute><TakeAttendance /></TeacherRoute>} />
        <Route exact path='/teacher/attendance-report' element={<TeacherRoute><AttendanceReport /></TeacherRoute>} />
        <Route exact path='/teacher/search-student' element={<TeacherRoute><SearchStudentTeacher /></TeacherRoute>} />
        <Route exact path='/teacher/list-students' element={<TeacherRoute><ListStudentsTeacher /></TeacherRoute>} />

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route path='/admin/add-student' element={<AdminRoute><AddStudent /></AdminRoute>} />
        <Route path='/admin/search-student' element={<AdminRoute><SeacrhStudent /></AdminRoute>} />
        <Route path='/admin/list-students' element={<AdminRoute><ListStudents /></AdminRoute>} />

        <Route path='/admin/add-teacher' element={<AdminRoute><AddTeacher /></AdminRoute>} />
        {/* <Route path='/admin/add-teacher' element={<AddTeacher />} /> */}
        <Route path='/admin/search-teacher' element={<AdminRoute><SearchTeacher /></AdminRoute>} />
        <Route path='/admin/list-teachers' element={<AdminRoute><ListTeacher /></AdminRoute>} />

      </Routes>
      <Footer />
    </>
  )
}

export default App