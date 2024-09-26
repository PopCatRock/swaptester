import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

import { NetworkConnector } from './NetworkConnector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [Number(process.env.REACT_APP_CHAIN_ID)]: NETWORK_URL }
})

export const injected = new InjectedConnector({
  supportedChainIds: [616]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 616: 'https://e1u27ubrmz:1gWHLvZ9gf2kXoJjaanxlB_005uVxpvDaz8yXzQytf0@e1rbkfpfh2-e1py4v2ayj-rpc.eu1-azure.kaleido.io/' },
  bridge: 'https://passport.meter.io/#/',
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: 'https://e1u27ubrmz:1gWHLvZ9gf2kXoJjaanxlB_005uVxpvDaz8yXzQytf0@e1rbkfpfh2-e1py4v2ayj-rpc.eu1-azure.kaleido.io/',
  appName: 'CubeSwap',
  appLogoUrl: 'https://cubes.lol/cubeswap-300h.png'
})
