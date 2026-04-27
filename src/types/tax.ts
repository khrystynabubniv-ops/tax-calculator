export type RecipientType = 'fop' | 'tov' | 'go'

export type RateKey =
  | 'fopGroup1'
  | 'fopGroup2'
  | 'fopGroup3Five'
  | 'fopGroup3Three'
  | 'fopGeneral'
  | 'militaryFopGroup1'
  | 'militaryFopGroup2'
  | 'militaryFopGroup3'
  | 'militaryFopGeneral'
  | 'tovSimplifiedFive'
  | 'tovSimplifiedThree'
  | 'tovGeneral'
  | 'vat'
  | 'ngoNonProfit'
  | 'ngoPayroll'
  | 'militaryNgoPayroll'

export type RateValueType = 'percent' | 'currency'

export interface RateDefinition {
  key: RateKey
  label: string
  shortLabel: string
  defaultValue: number
  helperText: string
  valueType?: RateValueType
}

export interface MilitaryTaxDefinition {
  mode: 'none' | 'percent' | 'fixed'
  rateKey?: RateKey
}

export interface ScenarioDefinition {
  id: string
  label: string
  helperText: string
  rateKeys: RateKey[]
  militaryTax?: MilitaryTaxDefinition
}

export interface RecipientDefinition {
  id: RecipientType
  label: string
  helperText: string
  scenarios: ScenarioDefinition[]
}

export type TaxSettings = Record<RateKey, number>
