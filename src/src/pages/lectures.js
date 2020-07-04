import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Lectures } from '../fragments'

const LecturesPage = ({ location }) => (
  <Layout location={location}>
    <SEO
      title="Lectures"
      description="Lectures for CIS 197: JavaScript at the University of Pennsylvania"
    />
    <h1>Lectures</h1>
    <Lectures />
  </Layout>
)

LecturesPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default LecturesPage
