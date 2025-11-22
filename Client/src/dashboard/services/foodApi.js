// import axios from "axios";
// const API = "http://localhost:8000";


// export const getFoods = async () => {
//     const res = await axios.get(API);
//     return res.data;
// };

// // ADD food
// export const addFood = async (data) => {
//     const formData = new FormData();
//     formData.append("foodName", data.foodName);
//     formData.append("price", data.price);
//     formData.append("category", data.category);
//     formData.append("foodType", data.foodType);
//     formData.append("imageFile", data.imageFile);

//     const res = await axios.post(`${API}/add`, formData);
//     return res.data;
// };
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
        return res.data;    // returns array
    } catch (error) {
        console.log("Error while getting data", error);
        return [];
    }
};


export const deleteStudent = async () => {
    try {
        return await axios.get(`${URL}/delete`, data)
    } catch (error) {
        console.log("Error while getting data", error);
    }
}

