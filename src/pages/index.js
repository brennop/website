import React from "react"
import { Link, graphql } from "gatsby"
import "../styles.css"
import Footer from "../components/Footer"

const IndexPage = ({ data }) => (
  <div className="layout">
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
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "blog" } } }) {
      edges {
        node {
          id
          frontmatter {
            slug
            date
            title
          }
        }
      }
    }
  }
`

export default IndexPage
