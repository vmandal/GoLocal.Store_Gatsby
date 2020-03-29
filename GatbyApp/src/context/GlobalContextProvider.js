import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  torusState : {
    account: null,
    name: '',
    email: '',
    verifier: '',
    verifierId: null,
    torusLogin: false
  },  
}

function reducer(state, action) {
  switch (action.type) {

    case "TORUS_LOGIN_SUCCESS": {
      return {
        ...state,
        torusState: {
          ...state.torusState,
          ...{
          torusLogin: true,
          account: action.account
          }          
        },
      }
    }

    case "TORUS_UPDATE_USER_INFO": {
      return {
        ...state,
        torusState: {
          ...state.torusState,
          ...{
          name: action.name,
          email: action.email,
          verifier: action.verifier,
          verifierId: action.verifierId,
          }          
        },
      }
    }

    case "TORUS_LOGOUT": {
      return {
        ...state,
        torusState: {
          account: null,
          name: '',
          email: '',
          verifier: '',
          verifierId: null,
          torusLogin: false
        },
      }
    }

    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
