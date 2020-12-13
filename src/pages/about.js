import React from "react";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './index.styles.scss';

const About = ({ data }) => {
  console.log('data', data)
  return (
    <>
      <Header />
      <h1 className="home-page-h1">About Me</h1>
      <div className="global-wrapper">
        <div>

        </div>
        <p>I created Fullstackstudent as I couldn't find practical web development tutorials that I 
          can use right away in my day-to-day life as an Engineer.
        </p>
        <p>
        My name is Abdi Ahmed Cagarweyne and I'm fullstack Software Engineer. 
        As a former teacher and self taught Software Engineer I have a passion for 
        teaching and learning and my mission through FSS is to create practical written and 
        video tutorials that you can use to pick up skills and use them right away to solve 
        problems.
        </p>
        <p>
        I can promise you that the content on FSS will be relevant to real life scenarios and 
        will not include trivial tutorials and code examples that include a disclaimer like "you should not use this in production code".
        </p>
        <p>
        All of the tutorials and videos on FSS will follow best practices and is production ready examples.
        </p>

      </div>
      <Footer />
    </>
  )
}

export default About;

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
          featuredImage {
            childImageSharp {
              sizes(maxWidth: 630) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`