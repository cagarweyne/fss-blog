import React from "react";
import { graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout/layout";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import SEO from "../components/seo";
import ArticleCard from '../components/article-card/article-card';
import './index.styles.scss';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <>
      <Header />
      <h1 className="home-page-h1">Latest Tutorials</h1>
      <div className="homepage-wrapper">
        {/* <SEO title="All posts" /> */}
          {posts.map(post => {
            const { fields: { slug }, frontmatter: { date, description, title }, excerpt } = post
            return (
            <ArticleCard 
              {...{ title, slug, data, description, excerpt, date }} 
            />
            )
          })}
      </div>
      <Footer />
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
