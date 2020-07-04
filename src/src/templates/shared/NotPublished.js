import React from 'react'
import PropTypes from 'prop-types'

import SEO from '../../components/seo'
import Layout from '../Layout'
import { BtnLink } from '../../components'

const NotPublished = ({ location }) => (
  <Layout location={location}>
    <SEO title="Not Published" />
    <h1>Not Published</h1>
    <p>
      This content is not available yet. It will be published as the course
      progresses.
    </p>
    <BtnLink to="/">Back to home</BtnLink>
  </Layout>
)

NotPublished.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default NotPublished
