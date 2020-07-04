import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { BtnLink } from '../components'
import { HOME_ROUTE, CONTACT_ROUTE } from '../constants/routes'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="404: Not found" />
    <h1>Page not found</h1>
    <p>
      The page you were looking for was either moved or does not exist. If you
      think this is an error, please <a href={CONTACT_ROUTE}>contact us!</a>
    </p>
    <BtnLink to={HOME_ROUTE}>Back to home</BtnLink>
  </Layout>
)

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default NotFoundPage
