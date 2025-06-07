import React from 'react';
import Header from '../../components/Home/Header';
import MainSlider from '../../components/Home/MainSlider';
import PopularSection from '../../components/Home/PopularSection';
import MostReviewedSection from '../../components/Home/MostReviewedSection';
import NoticeBoard from '../../components/Home/NoticeBoard';
import EventBoard from '../../components/Home/EventBoard';
import Footer from '../../components/Home/Footer';

//이용자가 처음으로 맞이하는 홈페이지
const HomePage = () => {
  return (
    <div>
      <Header />
      <MainSlider />
      <PopularSection />
      <MostReviewedSection />
      <NoticeBoard />
      <EventBoard />
      <Footer />
    </div>
  );
};

export default HomePage;
