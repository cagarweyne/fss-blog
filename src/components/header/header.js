import React from 'react';
import { Link } from 'gatsby'
import logo from '../../../content/assets/logo.png'
import './header.styles.scss'

const Header = () => {  
  return (
    <header className="fss-wrapper header navigation-links">
      <div className="logo-container">
        <Link className="logo-container" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="menu-items">
        <ul>
          <li>
            <Link to="/">
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header