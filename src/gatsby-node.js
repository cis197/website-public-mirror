/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  // Import react components used as templates for rendering pages
  const MDTemplate = path.resolve(`src/templates/Markdown.js`)
  const MDXTemplate = path.resolve(`src/templates/MDX.js`)

  return graphql(`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }

      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {
      data: {
        allMdx: { edges: mdxPages },
        allMarkdownRemark: { edges: mdPages },
      },
    } = result

    mdxPages.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: MDXTemplate,
        context: {},
      })
    })

    mdPages.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: MDTemplate,
        context: {},
      })
    })
  })
}
