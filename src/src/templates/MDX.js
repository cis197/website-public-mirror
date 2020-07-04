import React from 'react'
import { graphql } from 'gatsby'
import s from 'styled-components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'

import SEO from '../components/seo'
import Layout from './Layout'
import { GRAY } from '../constants/colors'
import NotPublished from './shared/NotPublished'
import { ASSIGNMENT_ZIP_ROUTE } from '../constants/routes'

const Timestamp = s.p`
  color: ${GRAY};
  opacity: 0.8;
  margin-bottom: calc(2rem + 2.5%);
`

const MDXTemplate = ({ data, location }) => {
  const {
    mdx: { frontmatter, body },
  } = data

  const { title, date, metaTitle, due, hidden, hasZip } = frontmatter
  const isAssignment = location.pathname.includes('assignment')

  if (hidden) {
    return <NotPublished location={location} />
  }

  const renderZipPath = () => {
    // The zip path is based on what comes after "/assignments/" in the URL
    const parts = location.pathname.split('/')
    const numAsString = parts[parts.length - 1]
    return (
      <p>
        Download the implementation stub{' '}
        <a href={ASSIGNMENT_ZIP_ROUTE(numAsString)}>here.</a>
      </p>
    )
  }

  return (
    <Layout location={location}>
      <SEO title={metaTitle || title} />
      <h1>{title}</h1>
      {date && <Timestamp>Last updated: {date}</Timestamp>}
      {due && (
        <p>
          Due <strong>{due}, 11:59:59pm</strong>.
        </p>
      )}
      {isAssignment && hasZip !== false && renderZipPath()}
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}

MDXTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string,
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        due: PropTypes.string,
        path: PropTypes.string,
        hasZip: PropTypes.bool,
        title: PropTypes.string,
        metaTitle: PropTypes.string,
        hidden: PropTypes.bool,
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        due(formatString: "dddd, MMMM DD, YYYY")
        path
        hasZip
        title
        metaTitle
        hidden
      }
    }
  }
`

export default MDXTemplate
