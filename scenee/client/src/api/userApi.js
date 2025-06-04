import axios from './axiosInstance';

//본인 정보 가져오기
export function fetchUserProfile() {
    return axios.get('/user/me');
    //axios.get(url, config)
    //URL, 설정 객체(headers, params) 순
}

//이용자 정보 가져오기
export function getUserInfoById(id){
    return axios.get(`/user/${id}`)
}

//이용자 정보 수정하기
export function updateUser(id, userData){
    return axios.put(`/user/${id}`, userData)
}

//이용자 정보 삭제하기
export function deleteUser(id){
    return axios.delete(`/user/${id}`)
}