import axios from './axiosInstance';
//작성한 axios 인스턴스를 가져옴
import { TOKEN_KEY } from '../constants/localStorageKeys';

//회원가입 요청 - /api/auth/register
export function registerUser(data) {
    return axios.post('auth/register', data);
    //axios.post(url, data, config)
    //URL, 본문 데이터, 설정 객체 순
}

//로그인 요청 - /api/auth/login
export function loginUser(data) {
    return axios.post('auth/login', data);
}

//로그아웃
export function logoutUser() {
    localStorage.removeItem(TOKEN_KEY);
}