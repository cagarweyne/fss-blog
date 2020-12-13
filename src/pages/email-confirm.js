import React from "react";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './index.styles.scss';

const EmailConfirm = () => {
  return (
    <>
      <Header />
      <h1 className="home-page-h1">Confirm your email address</h1>
      <div className="homepage-wrapper">
        <p>Please confirm your email address by clicking on the link we just sent to your email address</p>
      </div>
      <Footer />
    </>
  )
}

export default EmailConfirm;

