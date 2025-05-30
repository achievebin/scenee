import axios from './axiosInstance';

//본인 정보 가져오기
export function fetchUserProfile() {
    return axios.get('/user/me');
    //axios.get(url, config)
    //URL, 설정 객체(headers, params) 순
}