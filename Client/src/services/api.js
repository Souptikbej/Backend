import axios from "axios";
const URL = 'http://localhost:8000' // Back-end URL


export const addStudent = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data);
    } catch (error) {
        console.log("Error While Connecting API", error);
    }
}
export const getStudents = async () => {
    try {
        return await axios.get(`${URL}/all`)
    } catch (error) {
        console.log("Error while getting data", error);
    }
}

