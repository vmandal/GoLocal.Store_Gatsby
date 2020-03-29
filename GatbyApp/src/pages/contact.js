import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layouts/layout"
import SEO from "../components/layouts/seo"

const ContactPage = () => (
  <Layout pageInfo={{ pageName: "Contact" }}>
    <SEO title="Contact GoLocal.Store" />
    <h1>Contact us</h1>
    <p>Email us: <a href="mailto:hello@golocal.store">hello@GoLocal.Store</a></p>
    <Link to="/">back to Home</Link>
  </Layout>
)

export default ContactPage
