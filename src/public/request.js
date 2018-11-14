import Axios from 'axios';
import { baseUrl } from "../config/config";

export default function Ajax(api, method, data){
    let params = {
        method,
        url: `${baseUrl}${api}`,
        data
    };
    if(localStorage.token){
        params.headers = {
            'Authorization': 'Bearer ' + localStorage.token
        }
    }
    return Axios(params)
}
