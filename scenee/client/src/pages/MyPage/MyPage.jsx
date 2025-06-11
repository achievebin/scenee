import React, { useState, useEffect } from "react";
import UserReviews from "../../components/MyPage/UserReviews";
import ProfileInfo from "../../components/MyPage/ProfileInfo";
import EditProfileForm from "../../components/MyPage/EditProfileForm";
import { fetchUserProfile } from "../../api/userApi";

const MyPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserProfile()
      .then((res) => setUser(res.data))
      .catch((err) => console.error("이용자 정보를 가져오지 못했습니다.", err));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <ProfileInfo user={user} />
      <EditProfileForm user={user} onUpdate={setUser} />
      <UserReviews userId={user.id} />
    </div>
  );
};

export default MyPage;
