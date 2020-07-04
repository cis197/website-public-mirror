import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Assignments } from '../fragments'

const AssignmentsPage = ({ location }) => (
  <Layout location={location}>
    <SEO
      title="Assignments"
      description="Assignments for CIS 197: JavaScript at the University of Pennsylvania"
    />
    <h1>Assignments</h1>
    <Assignments />
  </Layout>
)

AssignmentsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default AssignmentsPage
