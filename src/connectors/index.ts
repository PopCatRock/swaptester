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
  supportedChainIds: [1213]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1213: 'https://dataseed.popcateum.org' },
  bridge: '',
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: 'https://dataseed.popcateum.org',
  appName: 'PopSwap',
  appLogoUrl: 'https://raw.githubusercontent.com/Excoinsevm/token-list/refs/heads/main/src/tokens/CoinLogos/0xdcE5726e3Bc8E1F574416978279bb0AE62AB3c15.png'
})
