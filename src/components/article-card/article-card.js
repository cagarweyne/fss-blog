import React from 'react'
import { Link } from "gatsby"
import './article.styles.scss'

const ArticleCard = (props) => {
  const { title, slug, description, src } = props;
  return (
    <Link to={`${slug}`}>
      <div className="card" key={slug}>
        <div className="post-image">
          <img src={src} alt="featured"/>
        </div>
        <div className="card-body">
          {/* <small className="post-tag">
          Development
          </small> */}
          <h5 className="post-title">{title}</h5>
          <p className="post-description">{description}</p>
          <small className="post-author">Author: Abdi Cagarweyne</small>
        </div>
      </div>
    </Link>
    
  );
}

export default ArticleCard