/*
import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/layouts/layout"

// this creates the dynamic page
// it looks for the content by filtering on slug: {eq: $slug}
export const query = graphql`
    query ( $slug: String ) {
        markdownRemark(fields: {slug: {eq: $slug}}){
            frontmatter{
                title
                
            }
            html    
        }
    }
`

// the result from above query gets passed as props 
const Blog = (props) => {

    return (
        <Layout>
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            
            <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}} ></div>
        </Layout>
    )
}

export default Blog
*/