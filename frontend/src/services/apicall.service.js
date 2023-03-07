import axios from 'axios'
import { AuthLogout } from './auth.service';

const BASE_URL = "http://localhost:8080"

const APICall = async (url, data = null, method = "get") => {
    try {
        let res = await axios({
            method,
            url: BASE_URL + url,
            withCredentials: true,
            data: data
        });
        return res

    } catch (error) {
        console.log(error)
        if (error.response.status == 401) {
            await AuthLogout()
            window.location.href = "/login"
        }
    }
}
export default APICall