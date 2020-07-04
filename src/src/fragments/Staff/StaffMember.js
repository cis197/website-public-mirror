import React from 'react'
import s from 'styled-components'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

import { LIGHT_GRAY } from '../../constants/colors'
import { Col } from '../../components'

const ImgWrapper = s.div`
  width: 100%;
  margin-bottom: 1rem;
`

const Name = s.h3`
  margin-bottom: 0.75rem;
`

const Email = s.p`
  margin-bottom: 0.5rem;
`

const Role = s.span`
  background: ${LIGHT_GRAY};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
`

const StaffMember = ({ margin, name, role, image, email, officeHours }) => (
  <Col lg={4} md={6} sm={12} margin={margin}>
    <ImgWrapper>
      <Img fluid={image.src.childImageSharp.fluid} />
    </ImgWrapper>

    <Name>{name}</Name>
    <Role>{role}</Role>
    <br />
    {email && (
      <Email>
        <a href={`mailto:${email}`}>{email}</a>
      </Email>
    )}
    {officeHours && (
      <p>
        <strong>Office hours:</strong>
        <br />
        {officeHours}
      </p>
    )}
  </Col>
)

StaffMember.propTypes = {
  margin: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object,
      }),
    }),
  }).isRequired,
  email: PropTypes.string.isRequired,
  officeHours: PropTypes.string.isRequired,
}

export default StaffMember
