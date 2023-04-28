import React, { useState, useEffect } from 'react'
import firebase from "firebase/compat/app";
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';

const AdminSidebar = () => {

  const [position, setPosition] = useState('absolute');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('screen-width --> ', window.screen.width);
    if (window.screen.width <= 768) {
        setPosition('absolute')
    } else {
        setPosition('relative')
    }
}, [])

  const [isClickedOnHamberger, setIsClickedOnHamberger] = useState(false);

  // const { collapseSidebar } = useProSidebar();
  const dispatch = useDispatch();

  const handleClickOnHamberger = () => {
    setIsClickedOnHamberger(!isClickedOnHamberger);
  }

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/login')
  }

  return (
    <>
      <div onClick={handleClickOnHamberger} className="z-40 absolute top-6 left-3 md:hidden">
        <GiHamburgerMenu size={30} />
      </div>
      {/* <div className={`-left-72 transform transition-transform ${isClickedOnHamberger ? 'translate-x-full' : 'translate-x-0'}`}> */}
        <Sidebar style={{position: position}} className={`-left-64 custom transform transition-transform absolute ${isClickedOnHamberger ? 'translate-x-full' : 'translate-x-0'} md:translate-x-full md:relative z-10 bg-[#E6F5F7] h-[100vh] absolute`}>
          <Menu>
            <MenuItem> <Link to={'/admin/dashboard'}>Account</Link> </MenuItem>
            <SubMenu label="Student">
              <MenuItem> <Link to={'/admin/add-student'}>Add student</Link> </MenuItem>
              <MenuItem> <Link to={'/admin/search-student'}>Search student</Link> </MenuItem>
              <MenuItem> <Link to={'/admin/list-students'}>List students</Link> </MenuItem>
            </SubMenu>
            <SubMenu label="Teacher">
              <MenuItem> <Link to={'/admin/add-teacher'}>Add Teacher</Link> </MenuItem>
              <MenuItem> <Link to={'/admin/search-teacher'}>Search Teacher</Link> </MenuItem>
              <MenuItem> <Link to={'/admin/list-teachers'}>List Teachers</Link> </MenuItem>
            </SubMenu>
            <MenuItem onClick={() => logout()}> Logout </MenuItem>
          </Menu>
        </Sidebar>
      {/* </div> */}
    </>
  )
}

export default AdminSidebar