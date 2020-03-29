
import "./src/styles/style.scss"

import React from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import LoadingContainer from "./LoadingContainer.js" 
import GlobalContextProvider from "./src/context/GlobalContextProvider"
//import TorusContextProvider from "./src/context/TorusContextProvider"

import loadable from "@loadable/component";

const TorusContextProvider = loadable(() => import("./src/context/TorusContextProvider"),
  {
    fallback: "Loading..."
  }
);

export const wrapRootElement = ({ element }) => {

  library.add(faWindowClose)

  return(
    <GlobalContextProvider>
      <TorusContextProvider>
      
        <LoadingContainer>
          {element}
        </LoadingContainer> 
      
      </TorusContextProvider>
    </GlobalContextProvider>
  )

}