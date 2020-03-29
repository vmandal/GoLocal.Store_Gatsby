import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/layouts/layout"
//import { Button } from "react-bootstrap"
import AddStore from "../components/addStore"
import ListStores from "../components/listStores"

// this creates the dynamic page
// it looks for the content by filtering on slug: {eq: $slug}
export const query = graphql`
    query ( $slug: String ) {
        markdownRemark(fields: {slug: {eq: $slug}}){
            frontmatter{
                title
            }
            frontmatter {
                title
                marketCode
                locationCode
                countryCode
            }              
            html    
        }
    }
`

// the result from above query gets passed as props 
const Market = (props) => {

    return (
        <Layout  pageInfo={{ pageName: "market" }}>            
            <h1>Market: {props.data.markdownRemark.frontmatter.title}</h1> 
            <h3>Market ID: {props.data.markdownRemark.frontmatter.marketCode}</h3>           
            
            <ListStores 
                marketCode={props.data.markdownRemark.frontmatter.marketCode}
                locationCode={props.data.markdownRemark.frontmatter.locationCode}
                countryCode={props.data.markdownRemark.frontmatter.countryCode}
            />
            
            <br/><br/>
            <p>TO DO: Retrive list of stores based on market key</p>
            <br/><br/>
            <AddStore 
                marketCode={props.data.markdownRemark.frontmatter.marketCode}
                locationCode={props.data.markdownRemark.frontmatter.locationCode}
                countryCode={props.data.markdownRemark.frontmatter.countryCode}
            />

        </Layout>
    )
}

export default Market