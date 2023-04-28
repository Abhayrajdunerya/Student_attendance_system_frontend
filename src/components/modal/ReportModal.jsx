import React, {useState} from 'react'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';
import ReportListCard from '../cards/ReportListCard';


const ReportModal = ({open, onCloseModal, attendanceData, lectureId}) => {

    const [showButtons, setShowButtons] = useState(false);

    return (
        <div className="modal">

            <Modal open={open} onClose={onCloseModal} center>
                <div className="w-full">
                    <h2 className='font-bold text-xl'>Attendance status</h2>
                    <div className="students">
                        {attendanceData.length ? attendanceData.map((attendance, i) =>
                            <ReportListCard key={i} name={attendance.name} rollNo={attendance.roll_no} showButtons={showButtons} status={attendance.attendance_status} lectureId={lectureId} email={attendance.email} />
                        ) : <div>No data found</div>}
                    </div>
                    
                    <div className='flex space-x-2'>
                        <button onClick={() => setShowButtons(!showButtons)} className="group relative flex justify-center my-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-100">
                            Edit
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ReportModal