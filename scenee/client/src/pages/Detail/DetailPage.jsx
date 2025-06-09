import React from 'react';
import ReviewSection from '../../components/Detail/ReviewSection';
import MovieBasicInfo from '../../components/Detail/MovieBasicInfo';

//영화 상세정보와 리뷰, 별점을 확인할 수 있는 페이지
const DetailPage = () => {
  return (
    <div>
      <MovieBasicInfo />
      <ReviewSection />
    </div>
  );
};

export default DetailPage;
