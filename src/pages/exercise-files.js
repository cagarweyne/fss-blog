import React from "react";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './index.styles.scss';

const ExerciseFiles = () => {
  return (
    <>
      <Header />
      <h1 className="home-page-h1">Confirm your email address</h1>
      <div className="homepage-wrapper">
      <h2>Thank for you confirming your email address</h2>
      <p>Here is the link to download the exercise files:</p>
      <a href="https://drive.google.com/drive/folders/0B43aiptTjR3HVUVoSUNuelhGZXM?usp=sharing" target="_blank">https://drive.google.com/drive/folders/0B43aiptTjR3HVUVoSUNuelhGZXM?usp=sharing</a>
      </div>
      <Footer />
    </>
  )
}

export default ExerciseFiles;

