import React from 'react'
import ReviewForm from './ReviewForm'

//리뷰 관련 컴포넌트가 담겨 있는 공간
const ReviewSection = () => {
  return (
    <div>
      <ReviewForm/>
      <ReviewLIst/>
    </div>
  )
}

export default ReviewSection
