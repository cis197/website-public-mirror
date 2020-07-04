import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

import { GRAY } from '../../constants/colors'
import { maxWidth, TABLET } from '../../constants/widths'

const Wrapper = s.div`
  ${maxWidth(TABLET)} {
    ${({ active }) => (active ? `max-height: 4rem;` : `max-height: 0;`)}
  }
`

const FooterTag = s.footer`
  width: 100%;
  padding: 1rem 0;
  color: ${GRAY};
  font-size: 0.8rem;
  position: absolute;
  bottom: 0;

  ${maxWidth(TABLET)} {
    position: relative;
    padding: 1rem 0 0.5rem 0;
  }
`

export const Footer = ({ active }) => (
  <Wrapper active={active}>
    <FooterTag>CIS 197 Staff &copy; {new Date().getFullYear()}</FooterTag>
  </Wrapper>
)

Footer.propTypes = {
  active: PropTypes.bool.isRequired,
}
