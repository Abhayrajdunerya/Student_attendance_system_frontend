import axios from "axios";
const host = import.meta.env.VITE_API;

export const getDepartments = async () => {
    return await axios.get(host+`/get-departments`, {
        // headers: {
        //     authtoken,
        // }
    });
}