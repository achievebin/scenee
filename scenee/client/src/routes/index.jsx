import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import DetailPage from '../pages/Detail/DetailPage';
import SearchResultPage from '../pages/SearchResultPage';
import NotFound from '../pages/NotFound/NotFound';

//react-router-dom 라이브러리를 사용, Route 기능을 이용해 페이지별 path를 지정
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path="/movie/:id" element={<DetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
