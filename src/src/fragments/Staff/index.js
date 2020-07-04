import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import StaffMember from './StaffMember'
import { Row } from '../../components'

const MARGIN = '0.5rem'

export const Staff = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: { name: { eq: "staff" }, sourceInstanceName: { eq: "json" } }
        ) {
          edges {
            node {
              childrenStaffJson {
                name
                role
                email
                officeHours
                image {
                  src {
                    childImageSharp {
                      fluid(maxWidth: 600, maxHeight: 600) {
                        ...GatsbyImageSharpFluid
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {
        node: { childrenStaffJson: staff },
      } = data.allFile.edges[0]

      return (
        <Row margin={MARGIN} justify="start">
          {staff.map(s => (
            <StaffMember margin={MARGIN} key={s.name} {...s} />
          ))}
        </Row>
      )
    }}
  />
)
