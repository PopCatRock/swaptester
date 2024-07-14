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
  supportedChainIds: [7171]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 7171: 'https://connect.bit-rock.io' },
  bridge: 'https://bridge.bit-rock.io',
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: 'https://connect.bit-rock.io',
  appName: 'PopSwap',
  appLogoUrl:
    'https://popcatrock.xyz/assets/popcatr.png'
})
