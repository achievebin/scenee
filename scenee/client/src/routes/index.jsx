import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import SearchResultPage from "../pages/Search/SearchResultPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import MyPage from "../pages/MyPage/MyPage";
import DetailPage from "../pages/Detail/DetailPage";
import NotFound from "../pages/NotFound/NotFound";
import FindIdPage from "../pages/Login/FindIdPage";
import FindPwRequestPage from "../pages/Login/FindPwRequestPage";
import ResetPasswordPage from "../pages/Login/ResetPasswordPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ContactPage from "../pages/ContactPage";
import NoticePage from "../components/Home/NoticePage";
import NoticeDetailPage from "../components/Home/NoticeDetailPage";
import EventPage from "../components/Home/EventPage";
import EventDetailPage from "../components/Home/EventDetailPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="movie/:id" element={<DetailPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        <Route
          path="mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/find-id" element={<FindIdPage />} />
        <Route path="/find-password" element={<FindPwRequestPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
