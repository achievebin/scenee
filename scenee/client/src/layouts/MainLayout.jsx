import React from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}