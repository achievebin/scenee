import React from 'react'
import Header from '../../components/Home/Header'
import EventBoard from '../../components/Home/EventBoard'
import NoticeBoard from '../../components/Home/NoticeBoard'
import Footer from '../../components/Home/Footer'
import PopularSection from '../../components/Home/PopularSection'
import MostReviewedSection from '../../components/Home/MostReviewedSection'
import MainSlider from '../../components/MainSlider'

//이용자가 처음으로 맞이하는 홈페이지
const HomePage = () => {
  return (
    <div>
      <Header/>
      <MainSlider/>
      <PopularSection/>
      <MostReviewedSection/>
      <NoticeBoard/>
      <EventBoard/>
      <Footer/>
    </div>
  )
}

export default HomePage
