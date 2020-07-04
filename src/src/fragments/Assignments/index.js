import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

export const Assignments = () => (
  <StaticQuery
    query={graphql`
      query {
        allMdx(
          sort: { order: ASC, fields: [frontmatter___title] }
          limit: 1000
          filter: { fileAbsolutePath: { regex: "/assignments/.*/" } }
        ) {
          edges {
            node {
              fileAbsolutePath
              frontmatter {
                path
                title
                hidden
                due(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {
        allMdx: { edges: assignments },
      } = data
      const visibleAssignments = assignments.filter(({ node }) => {
        const {
          frontmatter: { hidden },
        } = node
        return !hidden
      })

      return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Due date</th>
            </tr>
          </thead>

          <tbody>
            {visibleAssignments.map((a, idx) => {
              const {
                node: {
                  frontmatter: { title, path, due },
                },
              } = a

              return (
                <tr key={path}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={path}>{title}</Link>
                  </td>
                  <td>{due ? `${due}, 11:59:59PM` : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }}
  />
)
