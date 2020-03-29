
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

// fix "window" is not available during server side rendering by skipping it
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /@toruslabs/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }


// add slug field to a blog
module.exports.onCreateNode = ({ node, actions, getNode }) => {
const { createNodeField } = actions

        // getting the blog posts which are stored under MarkdownRemark
    if (node.internal.type === 'MarkdownRemark') {  

        if (node.fileAbsolutePath.includes('/data/location')){ // 
            // remove path and  '.md'
            //let slug = node.fileAbsolutePath.replace('/home/vikram/Codes/GatsbyJS/GoLocal/GoLocal.Store/src/data/location', '') 
            //let slug = node.parent.relativePath.replace('.md', '')
            //slug = slug.replace(' ', '_')
            let slug = createFilePath({ node, getNode })
            slug = slug.replace(' ', '_')
            createNodeField({
                node,
                name: 'slug',
                value: slug
            })

        } /*else  if (node.fileAbsolutePath.includes('/data/blog_posts')){ //  // blog
            let slug = path.basename(node.fileAbsolutePath, '.md') // remove path and  '.md' 
            slug = slug.replace(' ', '_')
            createNodeField({
                node,
                name: 'slug',
                value: slug
            })

        }*/
    }

    if ((node.internal.type === 'Directory') && (node.sourceInstanceName === 'data-location')) {      
            let rPathRegex = `/(${node.relativePath})/`
            createNodeField({
                node,
                name: 'rPathRegex',
                value: rPathRegex
            })
    }

}


// create dynamic pages for individual blogs
module.exports.createPages   = async ({ graphql, actions }) => {
    const { createPage } = actions

    /*
    // create pages  for blog from Markdown files
    const blogTemplate = path.resolve("./src/templates/blog.js")    
    const resBlog = await graphql(`
        query  {
            allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(/data/blog_posts/)/"}}) {
                edges{
                    node{
                    fields{
                        slug
                        }
                    }
                }
            }
        }    
    `)
    resBlog.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })
    */

    // create pages for Markets from Markdown files 
    const marketTemplate = path.resolve("./src/templates/market.js")    
    const resMarket = await graphql(`
        query  {
            allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(data/location)/"}}) {
                edges{
                    node{
                    fields{
                        slug
                        }
                    }
                }
            }
        }    
    `)
    resMarket.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: marketTemplate,
            path: `${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })

    // create pages for dirs 
    const marketListTemplate = path.resolve("./src/templates/marketList.js");
    const resMarketList = await graphql(`
        query  {
            allDirectory(filter: { sourceInstanceName: { eq: "data-location" } }){
                edges {
                node {
                    relativePath
                    fields{
                        rPathRegex
                    }
                }
                }
            }    
        }      
    `)
    resMarketList.data.allDirectory.edges.forEach((edge) => {
        createPage({
            component: marketListTemplate,
            path: `/${edge.node.relativePath}`,
            context: {
                rPathRegex: edge.node.fields.rPathRegex
            }
        })
    })


}

