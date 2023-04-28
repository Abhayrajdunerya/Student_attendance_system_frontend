import axios from "axios";
const host = import.meta.env.VITE_API;

export const searchStudentByEmail = async (authtoken, email) => {
    return await axios.get(host+`/student-by-email/${email}`, {
        headers: {
            authtoken,
        }
    });
}

export const searchStudentByRollNo = async (authtoken, rollNo) => {
    return await axios.get(host+`/student-by-rollNo/${rollNo}`, {
        headers: {
            authtoken,
        }
    });
}

export const searchStudents = async (authtoken, searchData) => {
    return await axios.post(host+`/get-students`, searchData, {
        headers: {
            authtoken,
        }
    });
}

export const addStudent = async (authtoken, data) => {
    return await axios.post(host+`/add-student`, data, {
        headers: {
            authtoken,
        }
    });
}

export const removeStudentByEmail = async (authtoken, email) => {
    return await axios.delete(host+`/student-by-email/${email}`, {
        headers: {
            authtoken,
        }
    });
}

export const removeStudentByRollNo = async (authtoken, rollNo) => {
    return await axios.delete(host+`/student-by-rollNo/${rollNo}`, {
        headers: {
            authtoken,
        }
    });
}