import React from 'react'
import s from 'styled-components'

import logo from '../../images/logo.svg'
import { maxWidth, TABLET } from '../../constants/widths'

const Wrapper = s.img`
  width: 3.5rem;
  height: auto;

  ${maxWidth(TABLET)} {
    display: inline-block;
    margin-bottom: 0;
    margin-right: 1rem;
    width: auto;
    height: calc(26px + 0.5rem);
  }
`

export const Logo = () => <Wrapper src={logo} alt="CIS 197 Logo" />
