import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Staff } from '../fragments'

const StaffPage = ({ location }) => (
  <Layout location={location}>
    <SEO
      title="Staff"
      description="Course staff for CIS 197: JavaScript at the University of Pennsylvania"
    />
    <h1>Course Staff</h1>
    <Staff />
  </Layout>
)

StaffPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default StaffPage
