import axios from "axios";

export const GetAllJob = async () => {
    const response = await axios.get(`/jobs?sort=-createdAt`)
    return response;
}