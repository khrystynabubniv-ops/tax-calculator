import { defaultTaxSettings, recipientDefinitions } from '../config/tax'
import type {
  MilitaryTaxDefinition,
  RateKey,
  RecipientDefinition,
  RecipientType,
  ScenarioDefinition,
  TaxSettings,
} from '../types/tax'

const currencyFormatter = new Intl.NumberFormat('uk-UA', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('uk-UA', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number) {
  return `${currencyFormatter.format(value)} грн`
}

export function formatPercent(value: number) {
  return `${percentFormatter.format(value)}%`
}

export function formatEditableNumber(value: number) {
  return value.toFixed(2)
}

export function formatSettingsValue(value: number) {
  return value.toFixed(2)
}

export function parseLocalizedNumber(input: string) {
  const normalized = input.replace(/\s/g, '').replace(',', '.')
  const parsed = Number.parseFloat(normalized)

  if (Number.isNaN(parsed)) {
    return 0
  }

  return parsed
}

export function getRecipientDefinition(recipientType: RecipientType): RecipientDefinition {
  return recipientDefinitions.find((recipient) => recipient.id === recipientType) ?? recipientDefinitions[0]
}

export function getScenarioDefinition(recipientType: RecipientType, scenarioId: string): ScenarioDefinition {
  const recipient = getRecipientDefinition(recipientType)
  return recipient.scenarios.find((scenario) => scenario.id === scenarioId) ?? recipient.scenarios[0]
}

export function sumRates(settings: TaxSettings, rateKeys: RateKey[]) {
  return rateKeys.reduce((total, rateKey) => total + (settings[rateKey] ?? 0), 0)
}

export function getMilitaryTaxValue(
  settings: TaxSettings,
  militaryTax?: MilitaryTaxDefinition,
) {
  if (!militaryTax || militaryTax.mode === 'none' || !militaryTax.rateKey) {
    return 0
  }

  return settings[militaryTax.rateKey] ?? 0
}

export function calculateTotals(amount: number, baseRate: number, militaryTaxAmount: number) {
  const baseTaxAmount = (amount * baseRate) / 100
  const surcharge = baseTaxAmount + militaryTaxAmount
  const total = amount + surcharge

  return {
    baseTaxAmount,
    militaryTaxAmount,
    surcharge,
    total,
  }
}

export function buildDefaultSettings(): TaxSettings {
  return { ...defaultTaxSettings }
}
