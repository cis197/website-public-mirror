import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import s from 'styled-components'

import { BORDER, BLACK, WHITE } from '../../constants/colors'
import { maxWidth, TABLET } from '../../constants/widths'
import { Logo } from './Logo'
import { Links } from './Links'
import { Footer } from './Footer'
import { Bars } from './Bars'

const Z_INDEX = 1300
const MOBILE_NAV_HEIGHT = '53px'

const Shade = s.div`
  display: none;

  ${maxWidth(TABLET)} {
    display: ${({ active }) => (active ? 'block' : 'none')};
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    left: 0;
    top: 0;
    z-index: ${Z_INDEX - 1};
  }
`

const Nav = s.nav`
  position: fixed;
  width: 20%;
  padding: calc(1rem + 2.5%) 1rem;
  border-right: 1px solid ${BORDER};
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  ${maxWidth(TABLET)} {
    width: 100%;
    padding: 0.5rem 1rem;
    border-right: 0;
    border-bottom: 1px solid ${BORDER};
    min-height: 0;
    z-index: ${Z_INDEX};
    background: ${WHITE};
    overflow-y: hidden;

    max-height: ${({ active }) => (active ? '100vh' : MOBILE_NAV_HEIGHT)};
  }
`

const NavSpacer = s.div`
  width: 20%;

  ${maxWidth(TABLET)} {
    width: 100%;
    height: ${MOBILE_NAV_HEIGHT};
  }
`

const LogoText = s(Link)`
  color: ${BLACK} !important;
  text-decoration: none !important;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  display: block;

  ${maxWidth(TABLET)} {
    display: inline-block;
    vertical-align: top;
    margin-top: 0.375rem;
    margin-bottom: 0;
    font-size: 1.25rem;
  }
`

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    const { active } = this.state
    this.setState({ active: !active })
  }

  render() {
    const { siteTitle } = this.props
    const { active } = this.state

    return (
      <>
        <Nav active={active}>
          <Logo />

          <Bars handleClick={this.toggle} />

          <LogoText to="/">{siteTitle}</LogoText>

          <Links active={active} />

          <Footer active={active} />
        </Nav>

        <Shade active={active} onClick={this.toggle} />

        <NavSpacer />
      </>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
