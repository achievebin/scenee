//config: 프로젝트 전반에 사용하는 공통 파일 설정을 모아두는 공간

//React Router에서 활용할 path(경로 상수)
const routeConfig = {
  home: '/',
  login: '/login',
  register: '/register',
  movieDetail: (id) => `/movie/${id}`,
  category: (type) => `/category/${type}`,
};

export default routeConfig;