import axios from "axios";

export const GetAllJob = async () => {
    const response = await axios.get(`http://localhost:8000/api/jobs?sort=-createdAt`)
    return response;
}