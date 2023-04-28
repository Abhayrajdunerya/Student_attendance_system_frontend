import axios from 'axios';
const host = import.meta.env.VITE_API;

export const getSubjects = async (searchData) => {
    return await axios.post(host+'/getSubjects', {searchData}, {
        // headers: {
        //     authtoken,
        // }
    })
}