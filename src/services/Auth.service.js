import axios from "axios";

export const LoginService = async (data) => {
    const response = await axios.post(`/user/login`, data)
    return response;
}