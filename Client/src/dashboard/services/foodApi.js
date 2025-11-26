import axios from "axios";
const URL = 'http://localhost:8000'


export const addFood = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data);
    } catch (error) {
        console.log("Error While Connecting API", error);
    }
}
export const getItems = async () => {
    try {
        const res = await axios.get(`${URL}/all`);
        return res.data;
    } catch (error) {
        console.log("Error while getting data", error);
        return [];
    }
};


export const getItemById = async (id) => {
    const res = await axios.get(`${URL}/item/${id}`);
    return res.data;
};

export const updateItem = async (id, formData) => {
    return await axios.put(`${URL}/item/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
