import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

// This was the first odd query I found
// fileName: file(relativePath: { eq: "images/gatsby-icon.png" }) {
//   childImageSharp {
//     sizes(maxWidth: 1240) {
//       ...GatsbyImageSharpSizes
//     }
//   }
// }
// What result that gets passed into Img sizes prop
// sizes={data.fileName.childImageSharp.sizes.srcSet}
// **************************************************************
// And this is the second way it can be done
// background: file(relativePath: { regex: "/panda.jpg/" }) {
//   childImageSharp {
//     fluid(maxWidth: 1240) {
//       ...GatsbyImageSharpSizes
//     }
//   }
// }
const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            desc
          }
        }
        background: file(relativePath: { regex: "/panda.jpg/" }) {
          childImageSharp {
            sizes(maxWidth: 1240) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <p>{data.site.siteMetadata.desc}</p>
        <Img
          style={{
            width: '20rem',
            height: '20rem',
          }}
          sizes={data.background.childImageSharp.sizes}
          alt=""
        />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
