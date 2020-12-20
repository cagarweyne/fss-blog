import React from "react";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './index.styles.scss';

const ExerciseFiles = () => {
  return (
    <>
      <Header />
      <h1 className="home-page-h1">Thank for you confirming your email address</h1>
      <div className="confirm-email">
        <p>Here is the link to download the exercise files:</p>
        <div>
          <a href="https://drive.google.com/drive/folders/0B43aiptTjR3HVUVoSUNuelhGZXM?usp=sharing" target="_blank">https://drive.google.com/drive/folders/0B43aiptTjR3HVUVoSUNuelhGZXM?usp=sharing</a>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ExerciseFiles;

