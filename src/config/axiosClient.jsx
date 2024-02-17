/* Cliente axios para facilitar el uso de axios */
import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
})

export default axiosClient