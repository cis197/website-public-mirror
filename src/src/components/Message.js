import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

import { PINK, RED, BLUE, SKY, POLLEN, GOLD } from '../constants/colors'
import { BORDER_RADIUS, minWidth, DESKTOP } from '../constants/widths'
import { AlertTriangleIcon, InfoIcon, AlertCircleIcon } from './Icons'

const ERROR = 'error'
const WARN = 'warn'
const INFO = 'info'

const typeColorMap = {
  [ERROR]: {
    bg: PINK,
    color: RED,
  },
  [WARN]: {
    bg: POLLEN,
    color: GOLD,
  },
  [INFO]: {
    bg: SKY,
    color: BLUE,
  },
}

const getTypeStyles = type => {
  const mapping = typeColorMap[type]
  if (!mapping) return ''
  const { bg, color } = mapping
  return `background: ${bg}; color: ${color}; border-color: ${color};`
}

const Wrapper = s.div`
  padding: 0.75rem;
  border-radius: ${BORDER_RADIUS};
  margin-bottom: 1.45rem;
  border-width: ${({ bordered }) => (bordered ? '2px' : '0')};
  border-style: solid;
  display: flex;

  p {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }

  ${minWidth(DESKTOP)} {
    padding: 1rem;
  }

  ${({ type }) => getTypeStyles(type)}
`

const IconWrapper = s.div`
  margin-right: 1rem;
  width: auto;

  // Do not let icon interfere with height of error message
  height: 0;
  overflow-y: visible;
`

const TextWrapper = s.div`
  flex: 1;
`

const messageGenerator = type => ({
  message,
  showIcon = true,
  children,
  ...props
}) => {
  if (!message && !children) return null
  const color = typeColorMap[type].color
  return (
    <Wrapper type={type} {...props}>
      {showIcon && (
        <IconWrapper color={color}>
          {type === ERROR ? (
            <AlertTriangleIcon />
          ) : type === WARN ? (
            <AlertCircleIcon />
          ) : (
            <InfoIcon />
          )}
        </IconWrapper>
      )}
      <TextWrapper>
        {message && <p>{message}</p>}
        {children}
      </TextWrapper>
    </Wrapper>
  )
}

export const ErrorMessage = messageGenerator(ERROR)
export const WarningMessage = messageGenerator(WARN)
export const InfoMessage = messageGenerator(INFO)

const defaultPropsInterface = {
  message: null,
  children: null,
  bordered: false,
  showIcon: false,
}

const propsInterface = {
  message: PropTypes.string,
  bordered: PropTypes.bool,
  showIcon: PropTypes.bool,
  children: PropTypes.node,
}

ErrorMessage.propTypes = propsInterface
ErrorMessage.defaultProps = defaultPropsInterface
WarningMessage.propTypes = propsInterface
WarningMessage.defaultProps = defaultPropsInterface
InfoMessage.propTypes = propsInterface
InfoMessage.defaultProps = defaultPropsInterface
