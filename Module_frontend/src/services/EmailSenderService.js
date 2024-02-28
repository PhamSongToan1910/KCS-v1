import axiosInstance from "../api";

const API_URL = "https://kcsonline.top/api/v1/sendEmail"

export const createVerificationCode = async (email) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/${email}`)
        console.log("check data:", response.data)
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with I:`, error);
        throw error;
    }
}

export const getVerificationCode = async (email) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${email}`)
        // console.log("check data:", response.data.id)
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with I:`, error);
        throw error;
    }
}
