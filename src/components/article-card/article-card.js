import React from 'react'
import { Link } from "gatsby"
import './article.styles.scss'

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
};

const ArticleCard = (props) => {
  const { slug, date, description, title } = props
  const excerpt = truncate(description, 120)
  return (
    <li key={slug} className='single-article-card'>
      <div className='post-image'>
        Post Image
      </div>
      <div className='post-details'>
        <div className='post-title-date-container'>
          <h5 className='blog-title'>
            <Link to={slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h5>
          <small className='blog-date'>{date}</small>
        </div>
        
        <section>
          <p
            className='blog-excerpt'
            dangerouslySetInnerHTML={{
              __html: excerpt,
            }}
            itemProp="description"
          />
        </section>
        
      </div>
    </li>
  );
}

export default ArticleCard