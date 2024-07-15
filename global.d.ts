declare global {
  interface Ethereum {
    isMetaMask?: true
    on?: (event: string, callback: (...args: any[]) => void) => void
    removeListener?: (event: string, callback: (...args: any[]) => void) => void
    autoRefreshOnNetworkChange?: boolean
  }

  interface Window {
    ethereum?: Ethereum
    web3?: {}
  }
}

// Ensure this file is treated as a module
export {}
