import axios from "axios";

export const LoginService = async (data) => {
    const response = await axios.post(`/user/login`, data, {
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    // console.log(response)
    return response;
}