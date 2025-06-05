import axios from 'axios';
//axios 라이브러리 활용
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

//HTTP 요청을 관리하고 API 요청에 필요한 설정을 미리 설정하기 위함
//요청 코드가 간결해지고 재사용성을 높여 개발 효율 향상에 도움이 됨
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
    //쿠키, 인증 헤더, TLS 인증서 등의 정보를 요청과 함께 보냄: 쿠키 기반 세션 인증에 활용용
})

//요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    if (token) {
        //토큰이 존재할 경우 Authorization 헤더 설정
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        //토큰이 없다면 Authorization 헤더 삭제
        delete config.headers.Authorization;
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        console.warn('만료되거나 유효하지 않은 토큰');
        localStorage.removeItem(token);
    }
    return Promise.reject(error);
    //에러를 거절하는 Promise 반환
});

export default axiosInstance;