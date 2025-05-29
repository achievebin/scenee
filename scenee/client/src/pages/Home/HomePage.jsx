import React from 'react'
import Header from '../../components/Header'
import EventBoard from '../../components/EventBoard'
import NoticeBoard from '../../components/NoticeBoard'
import Footer from '../../components/Footer'
import PopularSection from '../../components/PopularSection'
import MostReviewedSection from '../../components/MostReviewedSection'

//이용자가 처음으로 맞이하는 홈페이지
const HomePage = () => {
  return (
    <div>
      <Header/>
      <PopularSection/>
      <MostReviewedSection/>
      <NoticeBoard/>
      <EventBoard/>
      <Footer/>
    </div>
  )
}

export default HomePage
