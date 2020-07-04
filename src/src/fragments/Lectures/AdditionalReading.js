import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import s from 'styled-components'

const Wrapper = s.div`
  margin-top: 3rem;
`

const AdditionalReading = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {
            name: { eq: "additionalReading" }
            sourceInstanceName: { eq: "json" }
          }
        ) {
          edges {
            node {
              childrenAdditionalReadingJson {
                title
                author
                url
              }
            }
          }
        }
      }
    `}
    render={data => {
      const reading = data.allFile.edges[0].node.childrenAdditionalReadingJson

      return (
        <Wrapper>
          <h3>Additional Reading</h3>
          <ul>
            {reading.map(({ title, author, url }) => (
              <li key={title}>
                <a href={url}>
                  {title} {author && ` - ${author}`}
                </a>
              </li>
            ))}
          </ul>
        </Wrapper>
      )
    }}
  />
)

export default AdditionalReading
