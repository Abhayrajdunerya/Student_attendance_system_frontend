import React, {useState, useEffect} from 'react'
import { update } from '../../functions/attendance'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux'

const ReportListCard = ({name, rollNo, email, showButtons, status, lectureId}) => {

    useEffect(() => {
        if (status == 'P') {
            setBgCSS({
                bgColor: "bg-green-200",
                border: "border-green-700",
            })
        } else {
            setBgCSS({
                bgColor: "bg-red-200",
                border: "border-red-700",
            })
        }
    }, [])

    const { user } = useSelector((state) => ({ ...state }));

    const [attendanceStatus, setAttendanceStatus] = useState(status);

    const [bgCSS, setBgCSS] = useState({
      bgColor: "bg-white",
      border: "border-gray-200",
    });

    const updateAttendance = (attendance) => {
        update(user.token, {email, lectureId, attendance}).then(res => {
            console.log(res.data);
            toast.success('Updated')
        }).catch(err => toast.error('Faild'))
    }

    const handlePresent = () => {
        setAttendanceStatus('P')
      setBgCSS({
        bgColor: "bg-green-200",
        border: "border-green-700",
      })

      updateAttendance('P');
    }

    const handleAbsent = () => {
        setAttendanceStatus('A')
      setBgCSS({
        bgColor: "bg-red-200",
        border: "border-red-700",
      })

      updateAttendance('A')
    }

  return (
    <div class={`p-2 w-full`}>
            <div class={`h-full flex items-center border p-4 rounded-lg ${bgCSS.border} ${bgCSS.bgColor}`}>
                
                
                <div class="flex-grow">
                    <h2 class="text-gray-900 title-font font-medium">Roll no.: {rollNo}</h2>
                    <p class="text-gray-500 font-medium">Name: {name}</p>
                    {!showButtons ? <div className='flex my-2 justify-between"'> <button className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  text-white ${status == 'P' ? ' bg-green-600 hover:bg-green-700' : ' bg-red-600 hover:bg-red-700'}`}>{attendanceStatus}</button> </div>:
                     <div className="flex my-2 justify-between">
                      <button onClick={handleAbsent} className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">A</button>
                      <button onClick={handlePresent} className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">P</button>
                    </div>}
                </div>
            </div>
    </div>
  )
}

export default ReportListCard