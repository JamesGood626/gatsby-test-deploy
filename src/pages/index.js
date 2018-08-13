import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import styled from 'styled-components'
import gatsbyIcon from '../images/gatsby-icon.png'

import Layout from '../components/layout'

const H1 = styled.h1`
  color: #d40;
`

const IndexPage = ({ data }) => (
  <Layout>
    <H1>Gatsby V2</H1>
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <PostListing key={node.id} post={node} />
      ))}
    </div>
  </Layout>
)

const PostListing = ({ post }) => (
  <article>
    <h3>
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </h3>
    <span>{post.frontmatter.date}</span>
    <p>{post.excerpt}</p>
  </article>
)

// const IndexPage = ({ data }) => (

//     <H1>Hi people</H1>
//     <p>Welcome to your new Gatsby site. Layout a</p>
//     <p>Now go build something great.</p>
//     <img src={gatsbyIcon} alt="" />
//     <Link to="/page-2/">Go to page 2</Link>
//     <Link to="/about/">About</Link>
//     <Link to="/contact/">Contact</Link>
// )

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
