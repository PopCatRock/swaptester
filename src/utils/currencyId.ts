import { Currency, ETHER, Token } from '@popswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'BROCK'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
