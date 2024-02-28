import axiosInstance from "../api";
import { getRoomByUserStart, getRoomByUserSuccess, getRoomByUserError } from "../redux/slices/RoomPrivateSlice";

const API_URL = "https://kcsonline.top/api/v1/room-private"
export const getRoomByUser = async (id, dispatch) => {
    dispatch(getRoomByUserStart())
    console.log(id);
    try {
        const response = await axiosInstance.get(`${API_URL}/${id}`)
        console.log("check data:", response.data)
        dispatch(getRoomByUserSuccess(response.data));
    } catch (error) {
        console.error(`Error fetching user with I:`, error);
        dispatch(getRoomByUserError())
    }
}
