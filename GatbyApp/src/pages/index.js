import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layouts/layout"
import SEO from "../components/layouts/seo"

import ShopBox from "../components/shopBox"
import UserBox from "../components/userBox"
import SubscriberBox from "../components/subscriberBox"

//import { drizzleReactHooks } from "@drizzle/react-plugin";
//import { newContextComponents } from "@drizzle/react-components";

//const {useDrizzle} = drizzleReactHooks;
//const {useDrizzleState} = drizzleReactHooks;
//const { AccountData, ContractData } = newContextComponents;

const IndexPage = () => {

  //const { drizzle } = useDrizzle();
  //const drizzleState = useDrizzleState(state => state);

return (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`SuperShops`, `Local shops`, `Find products`]} />
    <Container className="text-center">
      <Row>
        <Col>
          <h2>Welcome to GoLocal.Store</h2>
          <h5><i>Local shops, sumermarkets and stores now online</i></h5>
          <p>
            <i>Find products quicker at shops and markets near your</i>
          </p>
         
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col md="8">
        <Container>
        <Row>
            <Col>
              <ShopBox />
            </Col>
          </Row>
          <Row style={{paddingTop: "20px"}}>
            <Col>
              <UserBox />
            </Col>
            <Col>
             <SubscriberBox />
            </Col>
          </Row>
        </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>
            Stay tuned as we role out the services.
          </h5>
          <p>
            [ Site is under construction ]
          </p>
        </Col>
      </Row>

    </Container>
  </Layout>
  )
}
export default IndexPage
