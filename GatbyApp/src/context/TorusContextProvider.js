import React from 'react'

import { Drizzle } from "@drizzle/store"
import { drizzleReactHooks } from "@drizzle/react-plugin";
import loadable from "@loadable/component";

const web3Obj = loadable(() => import("../web3/torusWeb3Obj"),
  {
    fallback: "Torus Loading..."
  }
);

const{ DrizzleProvider } = drizzleReactHooks

const TorusContextProvider = ({ children }) => {

  const{ DrizzleProvider } = drizzleReactHooks
  const drizzleOptions = {
    web3: {
      customProvider: web3Obj.web3
    },
    contracts: [],
    polls: {
      accounts: 1500,
    },
  };  

  const drizzle = new Drizzle(drizzleOptions)

  return (
    <DrizzleProvider drizzle={drizzle}>
      {children}
    </DrizzleProvider>
    )

  }
  
  export default TorusContextProvider