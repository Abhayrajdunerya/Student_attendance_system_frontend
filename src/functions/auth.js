import axios from 'axios';
const host = import.meta.env.VITE_API;

export const createOrUpdateUser = async (authtoken, userData) => {
    return await axios.post(host+'/create-or-update-user', {userData}, {
        headers: {
            authtoken,
        }
    })
}

export const currentStudent = async (authtoken) => {
    return await axios.post(host+'/current-student', {}, {
        headers: {
            authtoken,
        }
    })
}

export const currentTeacher = async (authtoken) => {
    return await axios.post(host+'/current-teacher', {}, {
        headers: {
            authtoken,
        }
    })
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(host+'/current-admin', {}, {
        headers: {
            authtoken,
        }
    })
}

export const getRole = async (email) => {
    return await axios.post(host+'/get-role', {email}, {
        // headers: {

        // }
    })
}