import React from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'
import PropTypes from 'prop-types'

import home from '../images/home.svg'
import chevron from '../images/chevron.svg'
import { GRAY, DARK_GRAY, LIGHT_GRAY } from '../constants/colors'
import { HOME_ROUTE } from '../constants/routes'
import { BORDER_RADIUS } from '../constants/widths'

const BreadcrumbsWrapper = s.div`
  display: inline-block;
  margin-bottom: 1.5rem;
  background: ${LIGHT_GRAY};
  padding: 0.5rem 0 0.5rem 1rem;
  border-radius: ${BORDER_RADIUS};

  a {
    margin-right: 1rem;
    color: ${GRAY} !important;
    text-decoration: none;
    font-size: 0.8rem;

    :hover,
    :focus,
    :active {
      color: ${DARK_GRAY} !important;
      text-decoration: none;
    }
  }
`

const bgStyles = `
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

const Home = s.span`
  height: 0.8rem;
  width: 0.8rem;
  display: inline-block;
  margin: 0;
  background-image: url(${home});
  opacity: 0.8;
  vertical-align: text-top;
  ${bgStyles}

  &:hover {
    opacity: 1;
  }
`

const Chevron = s.span`
  height: 0.8rem;
  width: 0.45rem;
  display: inline-block;
  margin: 0 1rem 0 0;
  opacity: 0.5;
  background-image: url(${chevron});
  vertical-align: middle;
  ${bgStyles}
`

const StyledLink = s(Link)`
  text-transform: capitalize;
`

const Breadcrumbs = ({ location }) => {
  if (!location || !location.pathname) return null

  const { pathname } = location
  const paths = pathname
    .split('/')
    .filter(path => path !== '' && path !== '~cis197')

  let absPath = ''

  return (
    <BreadcrumbsWrapper>
      <Link to={HOME_ROUTE} key={absPath}>
        <Home />
      </Link>

      {paths.map(path => {
        absPath += `/${path}`

        return (
          <React.Fragment key={absPath}>
            <Chevron />
            <StyledLink to={absPath}>{path}</StyledLink>
          </React.Fragment>
        )
      })}
    </BreadcrumbsWrapper>
  )
}

Breadcrumbs.defaultProps = {
  location: {},
}

Breadcrumbs.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default Breadcrumbs
