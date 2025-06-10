import React from "react";
import { useParams } from "react-router-dom";
import ReviewSection from "../../components/Detail/ReviewSection";
import MovieBasicInfo from "../../components/Detail/MovieBasicInfo";

//영화 상세정보와 리뷰, 별점을 확인할 수 있는 페이지
const DetailPage = () => {
  const { movieId } = useParams();
  return (
    <div>
      <MovieBasicInfo movieId={movieId} />
      <ReviewSection movieId={movieId} />
    </div>
  );
};

export default DetailPage;
