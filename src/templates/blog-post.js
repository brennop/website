import React from "react"
import { graphql } from "gatsby"
import Footer from "../components/Footer"
import SEO from "../components/seo"

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD-MM-YY")
        slug
        title
      }
    }
  }
`

export default ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <div className="layout">
      <SEO title={post.frontmatter.title} />
      <div className="post">
        <div>
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
