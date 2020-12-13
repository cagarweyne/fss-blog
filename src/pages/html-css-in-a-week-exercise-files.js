import React, { useState } from "react";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './index.styles.scss';

const HtmlCSSInWeek = () => {
  const [EMAIL, setEmail] = useState('');
  const [FNAME, setFname] = useState('');
  console.log(EMAIL, FNAME)
  return (
    <>
      <Header />
      <h1 className="home-page-h1">HTML & CSS In Week</h1>
      <div className="homepage-wrapper">
        <div>
        <p>First of all, I would like to thank you for buying the book: 
          HTML & CSS In A Week Or Less. As you will see, the book is comprised of two sections. 
          The first section is on HTML and the second section is on CSS.
        </p>
        <p>
          Please enter your name and email in the form below and I will send you the 
          link to download the exercise files:
        </p>
       </div>
      
        <form action="//fullstackstudent.us15.list-manage.com/subscribe/post?u=8ef9edf61ebb6ffe402ff9756&amp;id=776ddaa1d0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" noValidate>
          <div id="mc_embed_signup_scroll" className="form-group">
            <div className="mc-field-group">
              <div className="row">
                  <div className="form-group col-lg-4">
                      <input type="email" 
                        value={EMAIL}
                        name="EMAIL" 
                        className="form-control" 
                        id="mce-EMAIL" 
                        placeholder="Email Address" 
                        onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group col-lg-4">
                      <input 
                        type="text" 
                        value={FNAME}
                        name="FNAME" 
                        className="form-control" 
                        id="mce-FNAME" 
                        placeholder="First Name" 
                        onChange={e => setFname(e.target.value)} 
                      />
                  </div>
                  <div className="form-group col-lg-2">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="btn subscribe-btn" />
                  </div>
              </div>
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{display: "none"}}></div>
              <div className="response" id="mce-success-response" style={{display: "none" }}></div>
            </div>
            
            <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_8ef9edf61ebb6ffe402ff9756_776ddaa1d0" tabIndex="-1" value="" />
            </div>
          </div>
        </form>
        <div style={{marginBottom: "350px"}}></div>
      </div>
      <Footer />
    </>
  )
}

export default HtmlCSSInWeek;

