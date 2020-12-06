import React from 'react';

import './footer.styles.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className='footer-container'>
        <div className='links-social-container'>
          <div className='links-container'>
            <ul>
              <li>
                <a href='http://www.fullstackstudent.com/about'>About</a>
              </li>
              <li>
                <a href='http://fullstackstudent.com/privacy-policy'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='http://fullstackstudent.com/'>
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className='copyright-container'>
            <p className='copyright-tag'>Copyright © {year} All Rights Reserved by <a href="http://fullstackstudent.com/">Fullstackstudent</a>.</p>
          </div>
        </div>
      </div>
    </footer>  
  );
}

export default Footer;