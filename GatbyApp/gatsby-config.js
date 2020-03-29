module.exports = {
  pathPrefix: "",
  siteMetadata: {
    title: `GoLocal.Store`,
    description: `Find products at shops and markets near your`,
    author: `GoLocal`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-react-bootstrap`,
        short_name: `react-bootstrap`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: 'src/images/icon.jpg',
      },      
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data-location',
        path: `${__dirname}/src/data/location`
      }
    },    
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-plugin-loadable-components-ssr`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
