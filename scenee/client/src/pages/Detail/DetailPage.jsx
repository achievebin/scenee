import React from 'react'
import MovieDetail from '../../components/Detail/MovieDetail'
import ReviewSection from '../../components/Detail/ReviewSection'

//영화 상세정보와 리뷰, 별점을 확인할 수 있는 페이지
const DetailPage = () => {
  return (
    <div>
      <MovieDetail/>
      <ReviewSection/>
    </div>
  )
}

export default DetailPage
