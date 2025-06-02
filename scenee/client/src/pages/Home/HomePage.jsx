import React from 'react'
import Header from '../../components/Header'
import EventBoard from '../../components/EventBoard'
import NoticeBoard from '../../components/NoticeBoard'
import Footer from '../../components/Footer'
import PopularSection from '../../components/PopularSection'
import MostReviewedSection from '../../components/MostReviewedSection'
import MainSlider from '../../components/MainSlider'

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
