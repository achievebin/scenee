// src/pages/MyPage/MyPage.jsx
import React, { useState, useEffect } from "react";
import styles from "./MyPage.module.css";
import ProfileInfo from "../../components/MyPage/ProfileInfo";
import EditProfileForm from "../../components/MyPage/EditProfileForm";
import MyPageTabs from "../../components/MyPage/MyPageTabs";
import WishList from "../../components/MyPage/WishList";
import UserReviews from "../../components/MyPage/UserReviews";
import InquiryList from "../../components/MyPage/InquiryList";
import { fetchUserProfile } from "../../api/userApi";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("wish");

  useEffect(() => {
    fetchUserProfile().then(res => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <div className={styles.page}>
      {/* 프로필 카드 */}
      <div className={styles.card}>
        <ProfileInfo user={user} />
      </div>

      {/* 수정 폼 카드 */}
      <div className={styles.card}>
        <EditProfileForm user={user} onUpdate={setUser} />
      </div>

      {/* 탭 네비게이션 */}
      <div className={styles.card}>
        <MyPageTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* 탭별 콘텐츠 카드 */}
      <div className={styles.card}>
        {activeTab === "wish" && <WishList userId={user.id} />}
        {activeTab === "review" && <UserReviews userId={user.id} />}
        {activeTab === "inquiry" && <InquiryList userId={user.id} />}
      </div>
    </div>
  );
}
