import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

import { minWidth, TABLET } from '../../constants/widths'
import { BLACK } from '../../constants/colors'

const Wrapper = s.div`
  padding: 10px 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0.5rem;
  z-index: 1;

  &:hover {
    opacity: 0.5;
  }

  ${minWidth(TABLET)} {
    padding: 0;
    margin: 0;
    height: 0;
    width: 0;
    overflow: hidden;
    display: none;
  }
`

const Bar = s.span`
  width: 16px;
  height: 2px;
  margin-bottom: 3px;
  display: block;
  background: ${BLACK};

  &:first-child {
    margin-top: 3px;
  }
`

export const Bars = ({ handleClick }) => (
  <Wrapper onClick={handleClick}>
    <Bar />
    <Bar />
    <Bar />
  </Wrapper>
)

Bars.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
