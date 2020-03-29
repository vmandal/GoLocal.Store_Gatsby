import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const web3Obj = {
  web3: new Web3(),
  torus: {},
  setweb3: function(provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
  },
  initialize: async function() {    
    
    const torus = new Torus(
      {buttonPosition: "bottom-right"}
    )
    await torus.init({ 
      /*network: {
        host: "rinkeby" // default : 'mainnet'
      }*/
      network: {
        host: "https://testnetv3.matic.network",
        networkName: "Matic Testnet v3"
      }
    })
    await torus.login()
    web3Obj.setweb3(torus.provider)
    web3Obj.torus = torus
    sessionStorage.setItem('torusLogin', true)
    //console.log('torus.provider', web3Obj.currentProvider.host)
    //console.dir(torus.provider)
    //console.dir(web3Obj.currentProvider)
  }
}
export default web3Obj
