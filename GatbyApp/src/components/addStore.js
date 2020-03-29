import React, { useState, useEffect, useContext }  from "react"
import { Card, Button, Form, Alert } from "react-bootstrap"
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Validator from 'Validator'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imgPersonFinger from "../images/person-finger.png"

//import { newContextComponents } from "@drizzle/react-components";
import { GlobalStateContext } from "../context/GlobalContextProvider"

import web3Obj from "../web3/torusWeb3Obj"
import TorusLogin from "../web3/torusLogin"


const AddStore = props => {


    const globalState = useContext(GlobalStateContext)

    var flippyBox    
    const [hasError, setHasError] = useState(false); // by defualt form is not filled and so 
    const [disableSubmit, setDisableSubmit] = useState(true);  
    const [formErrors, setFormErrors] = useState({});
    const [formValues, setFormValues] = useState({});
  
    // validation rules
    const rules = {
      phone: 'required|numeric',
      shopname: 'required',
      address: 'required',
      email: 'required' 
    };
  
    function hashCode(str) {
      return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
    }

    const handleFormSubmit = e => {

      e.preventDefault()
      setDisableSubmit(true) // disable submit btn after one click

      // todo

      /*
        console.log('values being submitted: ', 
        document.forms['shopForm'].shopname.value, 
        globalState.torusState.email,
        document.forms['shopForm'].phone.value, 
        props.countryCode,
        props.locationCode,
        props.marketCode,
        */

      

  }
     
  const handleEdit = event => {
    const value = event.target.value
    const fieldName = event.target.name

    let tmpformValues = {...formValues}
    tmpformValues[fieldName] = value
    setFormValues(tmpformValues)

    if (!(fieldName in rules)) return; // no validation needed

    let vObj = {}
    vObj[fieldName] = value
    let rObj = {}
    rObj[fieldName] = rules[fieldName]

    let v = Validator.make(vObj, rObj);
    let nObj = {...formErrors}
    if (typeof nObj[fieldName] === "undefined"){
      nObj[fieldName] = {}; // init
      nObj[fieldName]['error'] = true; 
    }

    if (v.fails()) {
      setHasError(true)
      const errors = v.getErrors();
      nObj[fieldName]['errorMsg'] = []
      var id
      var i; // creating a unique id to over come unique 'key' warning 
      for (i = 0; i<errors[fieldName].length ; i++){
        id = 'i' + hashCode(errors[fieldName][i]); 
        nObj[fieldName]['errorMsg'][id] = errors[fieldName][i]
      }      
      nObj[fieldName]['error'] = true
      nObj[fieldName]['className'] = 'inputRequired'
    }else{
      nObj[fieldName]['errorMsg'] = []
      nObj[fieldName]['error'] = false
      nObj[fieldName]['className'] = 'inputOkay'
    }

    setFormErrors(nObj) // update error state

    var err = false; //  look for error in any field
    Object.keys(nObj).forEach((fieldName, index) => {    
      if (nObj[fieldName]['error']){
        err = true
      }
    }) 
    setHasError(err)

    if (err) {
      setDisableSubmit(true)
    }else{  // check if all fields checked with rules
      var AllFieldsChecked = true
      Object.keys(rules).forEach((fieldName, index) => {    
        if (typeof nObj[fieldName] === "undefined"){ // init
          AllFieldsChecked = false;
        }                        
      }) 
      setDisableSubmit(!AllFieldsChecked)
    }
    
  }    

    return (
              <Flippy
                flipOnHover={false} 
                flipOnClick={false} 
                flipDirection="horizontal"
                ref={(r) => flippyBox = r} 
              >
                <FrontSide >
                  <Card style={{height: 'inherit'}}>
                    <Card.Img variant="top" src={imgPersonFinger} />
                    <Card.Body>
                      <Card.Title>Shop Registration</Card.Title>
                      <Card.Text>
                        Stay informed to development as it happens 
                        Get email updates on SuperShops events and progress.             
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    {globalState.torusState.torusLogin && (
                      <Button onClick={() => flippyBox.toggle()} variant="info" >Add Store</Button>
                    )}
                    {!globalState.torusState.torusLogin && (
                      <>
                      To add your store <TorusLogin autoLoginWindow="false" />
                      </>                      
                    )}
                    
                    </Card.Footer>
                  </Card> 
                </FrontSide>
                <BackSide>

                    <Card style={{height: 'inherit'}}>
                      <Card.Body>
                        <Card.Title style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} >
                          Enter Shop details
                          <FontAwesomeIcon icon="window-close" style={{color:"red"}} 
                            onClick={() => flippyBox.toggle()}  />  
                        </Card.Title>

                        <div id="shopFormDiv" >                     

                          <Form name="shopForm" id="shopForm" >
                            <Form.Group className="mb-3">
                              <Form.Control placeholder="Name of Business" name="shopname" 
                                className={(formErrors['shopname'] && formErrors['shopname']['className'])? formErrors['shopname']['className']:'inputRequired'}
                                onChange={handleEdit} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Control placeholder="Contact number" name="phone"
                                className={(formErrors['phone'] && formErrors['phone']['className'])? formErrors['phone']['className']:'inputRequired'}
                                onChange={handleEdit} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Control placeholder="Store number, road name, near by etc." name="address"
                                className={(formErrors['address'] && formErrors['address']['className'])? formErrors['address']['className']:'inputRequired'}
                                onChange={handleEdit} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Control placeholder="Login to allow access to your email id" name="email"
                              className={(formErrors['email'] && formErrors['email']['className'])? formErrors['email']['className']:'inputRequired'}
                              onChange={handleEdit}
                              value={globalState.torusState.email} />

                                {!globalState.torusState.email && (
                                  <>
                                  <br/>
                                  <Alert variant="danger">
                                    Confirm permission to access your email. 
                                    <br/>Logout and login again to get to the confirmation screen again
                                  </Alert>
                                  </>
                                )}                      
                            </Form.Group>
                          </Form>                          

                        </div>

                        <Alert variant="danger" id="shopFormAlert" className={hasError?"visible":"invisible"}>
                          {Object.keys(formErrors).map((objKey, index) => {          
                            return (
                              <ul id={objKey} key={objKey}>
                              {formErrors[objKey]['error'] && Object.keys(formErrors[objKey]['errorMsg']).map((hash) => {
                                return (
                                  <li key={hash}>{formErrors[objKey]['errorMsg'][hash]}</li>
                                )
                              })}
                              </ul>                            
                            )
                          })}                            
                        </Alert>                        
                      </Card.Body>
                      <Card.Footer>
                      <Button disabled={disableSubmit} onClick={handleFormSubmit} id="btn" variant={disableSubmit?`danger`:`info`}>Submit</Button>

                      </Card.Footer>
                    </Card> 
                  
                </BackSide>
              </Flippy>
    )};
    
    export default AddStore;