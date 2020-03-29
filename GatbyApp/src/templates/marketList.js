import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from "../components/layouts/layout"

export const query = graphql`
    query ($rPathRegex: String) {        
        allMarkdownRemark(filter: {fileAbsolutePath: { regex: $rPathRegex }, frontmatter: {publish: {eq: "true"}}}) {
            nodes {
              fields {
                slug
              }
              frontmatter {
                title
                publish
              }              
            }
          }
    }    
`

// the result from above query gets passed as props 
const MarketList = (props) => {

    //console.dir(props.data.allMarkdownRemark.nodes)

    return (
    <Layout>
        <h2>Markets</h2>
        {props.data.allMarkdownRemark.nodes.map(node=>(
        <li key={node.fields.slug} >
        <Link to={node.fields.slug} >{node.frontmatter.title}</Link>
        </li>
        ))}
    </Layout>
    )
}

export default MarketList