import React from "react";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './index.styles.scss';

const ExerciseFiles = () => {
  return (
    <>
      <Header />
        <h1 className="home-page-h1">Privacy Policy</h1>
        <div className="homepage-wrapper">
          <p>Fullstackstudent operates the www.fullstackstudent.com website, which provides the SERVICE.</p>
          <p>
          This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the Fullstackstudent website.
          </p>
          <p>
          If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy
          </p>
          <p>
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at www.fullstackstudent.com, unless otherwise defined in this Privacy Policy. Our Privacy Policy was created with the help of the Privacy Policy Template and the Disclaimer Template.
          </p>
          <h2>Information Collection and Use</h2>
          <p>
            For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.
          </p>
          <h2>Log Data</h2>
          <p>
          We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
          </p>
        </div>
      <Footer />
    </>
  )
}

export default ExerciseFiles;