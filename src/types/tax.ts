export type RecipientType = 'fop' | 'tov' | 'go'

export type RateKey =
  | 'fopGroup1'
  | 'fopGroup2'
  | 'fopGroup3Five'
  | 'fopGroup3Three'
  | 'fopGeneral'
  | 'tovSimplifiedFive'
  | 'tovSimplifiedThree'
  | 'tovGeneral'
  | 'vat'
  | 'ngoNonProfit'
  | 'ngoPayroll'

export interface RateDefinition {
  key: RateKey
  label: string
  shortLabel: string
  defaultValue: number
  helperText: string
}

export interface ScenarioDefinition {
  id: string
  label: string
  helperText: string
  rateKeys: RateKey[]
}

export interface RecipientDefinition {
  id: RecipientType
  label: string
  helperText: string
  scenarios: ScenarioDefinition[]
}

export type TaxSettings = Record<RateKey, number>
