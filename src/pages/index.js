import React from "react"
import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => (
  <div className="layout">
    <div className="list">
      <h2 className="title">posts</h2>
      {data &&
        data.allMarkdownRemark.edges.map(({ node }) => (
          <Link to={node.frontmatter.slug} key={node.id}>
            {node.frontmatter.date} {node.frontmatter.title}
          </Link>
        ))}
    </div>
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
