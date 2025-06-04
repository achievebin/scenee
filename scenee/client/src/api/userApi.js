import axios from './axiosInstance';

//본인 정보 가져오기
export function fetchUserProfile() {
    return axios.get('/user/me');
    //axios.get(url, config)
    //URL, 설정 객체(headers, params) 순
}

export function fetchInfoById(){
    return axios.get('/user/:id')
}

export function updateUser(){
    return axios.put('/user/:id')
}

export function deleteUser(){
    return axios.delete('user/:id')
}