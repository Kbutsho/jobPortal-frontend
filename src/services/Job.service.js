import axios from "axios";

export const GetAllJob = async () => {
    const response = await axios.get(`https://jobportal-api.onrender.com/api/jobs?sort=-createdAt`)
    return response;
}