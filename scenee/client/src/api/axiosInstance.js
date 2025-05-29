import axios from 'axios';

//HTTP 요청을 관리하고 API 요청에 필요한 설정을 미리 설정하기 위함
//요청 코드가 간결해지고 재사용성을 높여 개발 효율 향상에 도움이 됨
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export default axiosInstance;