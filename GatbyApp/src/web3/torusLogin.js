import React, { useEffect, useContext } from "react"
import { Button } from "react-bootstrap"

import web3Obj from "./torusWeb3Obj"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const TorusLogin = (props) => {

    const dispatch = useContext(GlobalDispatchContext)
    const state = useContext(GlobalStateContext)
    //console.log(state);  console.log(dispatch);
    const torusState = state.torusState

    useEffect(() => {
        if (props.autoLoginWindow){
            const  torusLoginSession = sessionStorage.getItem('torusLogin')
            if (torusLoginSession) { // call torus status displayer etc    
                web3Obj.initialize().then(() => { 
                    let account = web3Obj.torus.web3.eth.accounts[0];
                    if (typeof account !== 'undefined'){
                        dispatch({ 
                            type: "TORUS_LOGIN_SUCCESS",
                            account: account
                        })
                        setStateInfo()
                    }
                })
            }
        }

    }, []);

    const enableTorus = async e => {
        e.preventDefault()
        try {
            await web3Obj.initialize().then(()=>{
                let account = web3Obj.torus.web3.eth.accounts[0];
                if (typeof account !== 'undefined'){
                    dispatch({ 
                        type: "TORUS_LOGIN_SUCCESS",
                        account: account
                    })
                    setStateInfo()
                }
            })
        } catch (error) {
          console.error(error)
        }
    }     

    const setStateInfo = async () => {
        
        if (torusState.email !== '') return; // set only it not set already
        web3Obj.torus.getUserInfo().then(function(userInfo){
            dispatch({ 
                type: "TORUS_UPDATE_USER_INFO",
                name: userInfo.name,
                email: userInfo.email, 
                verifier: userInfo.verifier,
                verifierId: userInfo.verifierId
            })
        })
    }

    const logoutTorus = () => {
        web3Obj.torus.cleanUp().then(() => {
            dispatch({ type: "TORUS_LOGOUT" })
            sessionStorage.setItem('torusLogin', false)
        })
    }

    return (
        <>
        
        {!torusState.torusLogin && (
            <>                        
            <Button onClick={enableTorus} variant="info">Login/SignUp</Button>
            </>
        )}

        {torusState.torusLogin && (
            <>                        
            <Button onClick={logoutTorus} variant="info">Logout</Button>
            </>
        )}

        </>
    )
      
}


export default TorusLogin