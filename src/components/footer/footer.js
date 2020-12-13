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
                <a href='/about'>About</a>
              </li>
              <li>
                <a href='/privacy-policy'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='/'>
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className='copyright-container'>
            <p className='copyright-tag'>Copyright © {year} All Rights Reserved by <a href="/">Fullstackstudent</a>.</p>
          </div>
        </div>
      </div>
    </footer>  
  );
}

export default Footer;