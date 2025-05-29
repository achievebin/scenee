import axios from './axiosInstance';
//작성한 axios 인스턴스를 가져옴

//회원가입 요청
export function registerUser(data) {
    return axios.post('auth/register', data);
    //axios.post(url, data, config)
    //URL, 본문 데이터, 설정 객체 순
}

//로그인 요청
export function loginUser(data) {
    return axios.post('auth/login', data);
}

//본인 정보 가져오기
export function fetchUserProfile() {
    return axios.get('/auth/me');
    //axios.get(url, config)
    //URL, 설정 객체(headers, params) 순
}