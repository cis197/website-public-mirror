import React from 'react'
import { graphql } from 'gatsby'
import s from 'styled-components'
import PropTypes from 'prop-types'

import SEO from '../components/seo'
import Layout from './Layout'
import Lecture from './Lecture'
import { GRAY } from '../constants/colors'
import NotPublished from './shared/NotPublished'

const Timestamp = s.p`
  color: ${GRAY};
  opacity: 0.8;
  margin-bottom: calc(2rem + 2.5%);
`

const MarkdownTemplate = ({ data, location }) => {
  const {
    markdownRemark: { frontmatter, html },
  } = data

  const { title, date, hidden } = frontmatter

  if (hidden) {
    // console.log(title, date, hidden)
    return <NotPublished location={location} />
  }

  const isLecture = location.pathname.includes('lecture')

  if (isLecture) {
    return (
      <>
        <SEO title={title} />
        <Lecture location={location} title={title} date={date} html={html} />
      </>
    )
  }

  // Generic markdown page
  return (
    <Layout location={location}>
      <SEO title={title} />
      <h1>{title}</h1>
      {date && <Timestamp>Last updated: {date}</Timestamp>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

MarkdownTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        path: PropTypes.string,
        title: PropTypes.string,
        hidden: PropTypes.bool,
      }),
      html: PropTypes.string,
    }),
  }),
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        hidden
      }
    }
  }
`

export default MarkdownTemplate
