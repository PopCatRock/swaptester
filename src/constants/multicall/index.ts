import { ChainId } from '@popswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xFfdE59FCbe1AE8B2a5015C24d954a3C1bD14DFA4'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
