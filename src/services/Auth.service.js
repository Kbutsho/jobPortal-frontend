import axios from "axios";

export const LoginService = async (data) => {
    const response = await axios.post(`http://localhost:8000/api/user/login`, data)
    return response;
}