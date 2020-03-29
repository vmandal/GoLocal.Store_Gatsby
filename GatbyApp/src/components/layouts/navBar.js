import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        <Link to="/" activeClassName="link-active">
          <Navbar.Brand as="span">Home</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={pageInfo && pageInfo.pageName}>
            <Link to="/contact" activeClassName="link-active">
              <Nav.Link as="span" eventKey="contact">Contact Us</Nav.Link>
            </Link>
          </Nav>

          <Nav className="ml-auto">
            <Form inline onSubmit={e => e.preventDefault()}>
              <Form.Group>
                <FormControl
                  type="text"
                  placeholder="coming soon..."
                  className="mr-2"
                />
              </Form.Group>
              <Button>Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default CustomNavbar
