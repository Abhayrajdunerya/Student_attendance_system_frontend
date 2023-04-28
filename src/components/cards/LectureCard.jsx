import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { getAttendanceReport } from '../../functions/attendance';
import ReportModal from '../modal/ReportModal';


const LectureCard = ({lecture}) => {

    const { user } = useSelector((state) => ({ ...state }));

    const [attendanceData, setAttendanceData] = useState([]);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleModal = async (lectureId) => {
        await getAttendanceReport(user.token, lectureId).then(res => {
            setAttendanceData(res.data);
            onOpenModal();
        })
    }

    return (
        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <ReportModal open={open} onCloseModal={onCloseModal} attendanceData={attendanceData} lectureId={lecture.lecture_id} />
            <div onClick={() => handleModal(lecture.lecture_id)} class="h-full flex items-center border-gray-200 border shadow p-4 rounded-lg cursor-pointer bg-white hover:bg-[#E6F5F7] hover:border-green-200">
                <div class="flex-grow">
                    <h2 class="text-gray-900 title-font font-medium">Date: {lecture.date.substring(0, 10)}</h2>
                    {/* <h2 class="text-gray-900 title-font font-medium">Date: {lecture.date}</h2> */}
                    <p class="text-gray-500"><span className=' text-black'>Branch</span>: {lecture.dept_name}</p>
                    <p class="text-gray-500"><span className=' text-black'>Sem</span>: {lecture.sem}</p>
                    <p class="text-gray-500"><span className=' text-black'>Section</span>: {lecture.section} </p>
                    <p class="text-gray-500"><span className=' text-black'>Subject</span>: {lecture.subject_name}</p>
                </div>
            </div>
        </div>
    )
}

export default LectureCard