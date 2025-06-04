import axios from "./axiosInstance";

export function getIdByEmail(data){
    return axios.post('/find/id', data);
}

export function getPasswordReset(data){
    return axios.post('/find/password/request', data);
}

export function getPassword(data){
    return axios.post('/find/password/reset', data);
}