module.exports = {
  pathPrefix: `/~cis197`,
  siteMetadata: {
    title: `CIS 197`,
    description: `Student-taught 19X course on JavaScript web development at the University of Pennsylvania.`, // eslint-disable-line
    author: `Cameron Cabo <ccabo@seas.upenn.edu>`,
    keywords: [
      'javascript',
      'js',
      '197',
      'cis197',
      'cis',
      'seas',
      'penn',
      'upenn',
      'university',
      'pennsylvania',
      'script',
      'react',
      'learn',
    ],
    image: `https://s3.amazonaws.com/riploventures/cis197-bg.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`, // eslint-disable-line
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown`,
        name: 'markdown',
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/json`,
        name: `json`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#0c417c`,
        display: `minimal-ui`,
        icon: `src/images/logo-square.png`, // Path is relative to site root
      },
    },
    {
      // For MD files...
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      // For MDX files...
      resolve: `gatsby-plugin-mdx`,
      options: {
        plugins: [`gatsby-remark-copy-linked-files`],
      },
    },
  ],
}
