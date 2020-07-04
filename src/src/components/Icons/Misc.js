import s, { css } from 'styled-components'
import { BLUE, NAVY } from '../../constants/colors'

export const IconCircle = s.span`
  background: ${BLUE};
  height: 1.8rem;
  width: 1.8rem;
  margin: 0;
  position: relative;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  font-size: 0;
  line-height: 0;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    background: ${NAVY};
  }

  svg {
    margin-top: 50%;
    transform: translateY(-50%) scale(0.8);
  }
`

export const Svg = s.svg(
  ({ sm, md, lg, strokeWidth }) => css`
    stroke-width: ${strokeWidth || 2}px;
    vertical-align: top;
    line-height: 1;
    transform: scale(${sm ? 0.6 : md ? 0.8 : lg ? 1 : 1});
  `
)
