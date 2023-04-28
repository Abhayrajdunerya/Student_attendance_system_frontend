import React, { useState, useEffect } from 'react'
import StudentSidebar from '../../sidebar/StudentSidebar'
import { getPercentage } from '../../../functions/attendance'
import { useSelector } from 'react-redux';
import TableRow from '../../table/TableRow';

const Attendance = () => {
    

    const [percentageData, setPercentageData] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getPercentage(user.token, user.email).then(res => {
            setPercentageData(res.data);
        }).catch(err => console.log(err));
        console.log(percentageData);
    }, [])

    return (
        <div className='flex'>
            <StudentSidebar />
            <div className="restarea bg-[#F2FAFB] w-full md:relative">
                <div className="p-4">
                    <h2 className='font-bold text-xl  text-[#0A3C5F]'>Attendance</h2>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <tbody>
                                        {percentageData.length && percentageData.map((pData, i) => <TableRow key={i} td1={pData.subject_name} td2={Math.round((pData.attendance*100)/pData.total)+"%"} />)}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance