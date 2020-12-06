import React from "react"
import Header from '../header/header'
import Footer from '../footer/footer'
import './layout.styles.scss'

const Layout = ({ location, children, cssClass }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <div >
      <Header />
      <div className={cssClass ? cssClass : " global-wrapper"} data-is-root-path={isRootPath}>
        <main className='main-container'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
