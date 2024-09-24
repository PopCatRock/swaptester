import { ChainId } from '@popswap/triangle'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xb6d47CcfAd34970076854866edBBd9bBFbfD65ee'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
