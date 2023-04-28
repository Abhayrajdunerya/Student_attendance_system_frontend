import React from 'react'
import backgroungImg from '../assets/Attendance-Management-System.png'

const Home = () => {
  return (
    <div className='w-full'>
      <div className="bg-[#F2FAFB] flex flex-col justify-center items-center lg:flex-row lg:h-[78vh]">

        <div className="text-center p-4 md:p-10 lg:p4 lg:text-left">
          <h1 className='text-3xl sm:text-5xl text-[#0A3C5F] font-extrabold'>Welcome to Student Attendance System</h1>
        </div>
        <div className="">
          <img src={backgroungImg} alt="" />
        </div>
        </div>
      </div>
  )
}

export default Home