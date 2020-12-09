import React from 'react'
import { Link } from "gatsby"
import './article.styles.scss'

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

const ArticleCard = (props) => {
  const { title, slug, data, description, date } = props
  const excerpt = truncate(description, 120);
  return (
    <Link to={`${slug}`}>
      <div className="card" key={slug}>
        <div className="post-image">
          <img src="http://fullstackstudent.com/content/images/2018/11/generator.jpg"/>
        </div>
        <div className="card-body">
          <small className="post-tag">
          Development
          </small>
          <h5 className="post-title">{title}</h5>
          <p className="post-description">{description}</p>
          <small className="post-author">Abdi Cagarweyne</small>
        </div>
      </div>
    </Link>
    
  );
}

export default ArticleCard