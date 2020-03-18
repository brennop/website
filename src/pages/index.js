import React from "react"
import { Link, graphql } from "gatsby"
import "../styles.css"
import Footer from "../components/Footer"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <div className="layout">
    <SEO title="blog" />
    <div className="list">
      <h2 className="title">Blog</h2>
      {data &&
        data.allMarkdownRemark.edges.map(({ node }) => (
          <Link to={node.frontmatter.slug} key={node.id}>
            {node.frontmatter.date} {node.frontmatter.title}
          </Link>
        ))}
    </div>
    <Footer />
  </div>
)

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            slug
            date(formatString: "YY-MM-DD")
            title
          }
        }
      }
    }
  }
`

export default IndexPage
