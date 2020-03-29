import React, { useEffect, useContext } from "react"
import { Button } from "react-bootstrap"

import web3Obj from "./torusWeb3Obj"
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider"

const TorusLogOut = (props) => {

    const dispatch = useContext(GlobalDispatchContext)
    const state = useContext(GlobalStateContext)
    const torusState = state.torusState

    useEffect(() => {
            const  torusLoginSession = sessionStorage.getItem('torusLogin')
            if (torusLoginSession) { // call torus status displayer etc    
                web3Obj.initialize().then(() => { 
                    let account = web3Obj.torus.web3.eth.accounts[0];
                    if (typeof account !== 'undefined'){
                        dispatch({ 
                            type: "TORUS_LOGIN_SUCCESS",
                            account: account
                        })
                        //setStateInfo()
                    }
                })
            }

    }, []);
    



    const logoutTorus = () => {
        web3Obj.torus.cleanUp().then(() => {
            dispatch({ type: "TORUS_LOGOUT" })
            sessionStorage.setItem('torusLogin', false)
        })
    }

    return (
        <>
        {torusState.torusLogin && (
            <>                        
            <Button onClick={logoutTorus} variant="info">Logout</Button>
            </>
        )}
        </>
    )
      
}


export default TorusLogOut