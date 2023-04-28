import axios from 'axios';
const host = import.meta.env.VITE_API;

export const createLecture = async (authtoken, lectureData) => {
    return await axios.post(host+'/create-lecture', lectureData, {
        headers: {
            authtoken,
        }
    })
}

export const takeAttendance = async (authtoken, temp) => {
    return await axios.post(host+'/take-attendance', temp, {
        headers: {
            authtoken,
        }
    })
}

export const update = async (authtoken, attendanceData) => {
    return await axios.post(host+'/update-attendance', attendanceData, {
        headers: {
            authtoken,
        }
    })
}

export const getLectureData = async (authtoken, data) => {
    return await axios.post(host+'/get-lecture-data', data, {
        headers: {
            authtoken,
        }
    })
}

export const getAttendanceReport = async (authtoken, lectureId) => {
    return await axios.post(host+'/get-attendance-report', {lectureId}, {
        headers: {
            authtoken,
        }
    })
}

export const getPercentage = async (authtoken, email) => {
    return await axios.get(host+`/get-percentage/${email}`, {}, {
        headers: {
            authtoken,
        }
    })
}