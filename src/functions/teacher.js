import axios from "axios";
const host = import.meta.env.VITE_API;

export const searchTeacherByEmail = async (authtoken, email) => {
    return await axios.get(host+`/teacher-by-email/${email}`, {
        headers: {
            authtoken,
        }
    });
}

export const searchTeacherByPhoneNo = async (authtoken, phoneNo) => {
    return await axios.get(host+`/teacher-by-phone/${phoneNo}`, {
        headers: {
            authtoken,
        }
    });
}

export const searchTeachers = async (authtoken, searchData) => {
    return await axios.post(host+`/get-teachers`, searchData, {
        headers: {
            authtoken,
        }
    });
}

export const addTeacher = async (authtoken, data) => {
    return await axios.post(host+`/add-teacher`, data, {
        headers: {
            authtoken,
        }
    });
}

export const removeTeacherByEmail = async (authtoken, email) => {
    return await axios.delete(host+`/teacher-by-email/${email}`, {
        headers: {
            authtoken,
        }
    });
}

export const removeTeacherByPhoneNo = async (authtoken, phoneNo) => {
    return await axios.delete(host+`/teacher-by-phone/${phoneNo}`, {
        headers: {
            authtoken,
        }
    });
}

export const getAdminByEmail = async (authtoken, email) => {
    return await axios.get(host+`/get-admin-by-email/${email}`, {
        headers: {
            authtoken,
        }
    });
}