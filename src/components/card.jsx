import React from 'react'
import Body from './cardComponents/body';
import Footer from './cardComponents/footer';
import Header from './cardComponents/header';

export default function Card() {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
