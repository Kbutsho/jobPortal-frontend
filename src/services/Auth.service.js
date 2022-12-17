import axios from "axios";

export const LoginService = async (data) => {
    const response = await axios.post(`https://jobportal-api.onrender.com/api/user/login`, data)
    return response;
}