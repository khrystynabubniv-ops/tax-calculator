import { useEffect, useState } from 'react'
import { CalculatorForm } from './components/CalculatorForm'
import { ResultsCard } from './components/ResultsCard'
import { SettingsPanel } from './components/SettingsPanel'
import {
  TAX_SETTINGS_STORAGE_KEY,
  defaultTaxSettings,
  recipientDefinitions,
} from './config/tax'
import {
  buildDefaultSettings,
  calculateTotals,
  formatCurrency,
  formatEditableNumber,
  formatPercent,
  getRecipientDefinition,
  getScenarioDefinition,
  parseLocalizedNumber,
  sumRates,
} from './lib/tax'
import type { RecipientType, TaxSettings } from './types/tax'

function App() {
  const [amount, setAmount] = useState('')
  const [recipientType, setRecipientType] = useState<RecipientType>('fop')
  const [scenarioId, setScenarioId] = useState(recipientDefinitions[0].scenarios[0].id)
  const [manualRate, setManualRate] = useState<string | null>(null)
  const [settings, setSettings] = useState<TaxSettings>(() => {
    if (typeof window === 'undefined') {
      return buildDefaultSettings()
    }

    const saved = window.localStorage.getItem(TAX_SETTINGS_STORAGE_KEY)

    if (!saved) {
      return buildDefaultSettings()
    }

    try {
      return { ...defaultTaxSettings, ...JSON.parse(saved) }
    } catch {
      return buildDefaultSettings()
    }
  })

  useEffect(() => {
    window.localStorage.setItem(TAX_SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const selectedRecipient = getRecipientDefinition(recipientType)
  const selectedScenario = getScenarioDefinition(recipientType, scenarioId)
  const automaticRate = sumRates(settings, selectedScenario.rateKeys)
  const currentRateInput = manualRate ?? formatEditableNumber(automaticRate)
  const amountValue = parseLocalizedNumber(amount)
  const currentRateValue = parseLocalizedNumber(currentRateInput)
  const { surcharge, total } = calculateTotals(amountValue, currentRateValue)

  const formulaLabel = `${formatCurrency(amountValue)} + (${formatCurrency(amountValue)} × ${formatPercent(
    currentRateValue,
  )} / 100) = ${formatCurrency(total)}`
  const explanationLabel = `Податкова надбавка = ${formatCurrency(amountValue)} × ${formatPercent(
    currentRateValue,
  )} / 100 = ${formatCurrency(surcharge)}.`

  function handleRecipientChange(nextRecipientType: RecipientType) {
    const nextRecipient = getRecipientDefinition(nextRecipientType)
    setRecipientType(nextRecipientType)
    setScenarioId(nextRecipient.scenarios[0].id)
    setManualRate(null)
  }

  function handleScenarioChange(nextScenarioId: string) {
    setScenarioId(nextScenarioId)
    setManualRate(null)
  }

  function handleReset() {
    setAmount('')
    setRecipientType('fop')
    setScenarioId(recipientDefinitions[0].scenarios[0].id)
    setManualRate(null)
  }

  function handleSettingChange(rateKey: keyof TaxSettings, value: string) {
    const parsed = parseLocalizedNumber(value)
    setSettings((currentSettings) => ({
      ...currentSettings,
      [rateKey]: parsed,
    }))
  }

  async function handleCopyResult() {
    const payload = [
      `Сума без податків: ${formatCurrency(amountValue)}`,
      `Тип отримувача: ${selectedRecipient.label}`,
      `Режим: ${selectedScenario.label}`,
      `Ставка: ${formatPercent(currentRateValue)}`,
      `Надбавка: ${formatCurrency(surcharge)}`,
      `Фінальна сума: ${formatCurrency(total)}`,
      `Формула: ${formulaLabel}`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(payload)
    } catch {
      window.alert('Не вдалося скопіювати результат. Спробуйте ще раз.')
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(135deg,_#f7f4eb_0%,_#eef9f4_46%,_#fef7e8_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 overflow-hidden rounded-[32px] border border-white/60 bg-white/72 p-6 shadow-[0_28px_90px_rgba(17,24,39,0.08)] backdrop-blur md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                Internal Tool
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
                Податковий калькулятор для швидкого виставлення рахунків
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Введіть суму, оберіть форму отримувача та систему оподаткування, а калькулятор
                автоматично підтягне базову ставку, порахує надбавку і покаже фінальну суму в
                гривні.
              </p>
            </div>

            <div className="rounded-[28px] border border-emerald-200/70 bg-emerald-50/80 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
                Важливо
              </p>
              <p className="mt-3 text-sm leading-6 text-emerald-950">
                Калькулятор не є податковою консультацією. Ставки потрібно підтверджувати з
                бухгалтером або юристом.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <CalculatorForm
            amount={amount}
            onAmountChange={setAmount}
            recipientType={recipientType}
            recipientOptions={recipientDefinitions}
            onRecipientTypeChange={handleRecipientChange}
            selectedRecipient={selectedRecipient}
            selectedScenario={selectedScenario}
            onScenarioChange={handleScenarioChange}
            rateValue={currentRateInput}
            onRateChange={setManualRate}
            onReset={handleReset}
            onRestoreAutoRate={() => setManualRate(null)}
            isManualRate={manualRate !== null}
          />

          <ResultsCard
            surchargeLabel={formatCurrency(surcharge)}
            totalLabel={formatCurrency(total)}
            formulaLabel={formulaLabel}
            explanationLabel={explanationLabel}
            onCopy={handleCopyResult}
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SettingsPanel settings={settings} onChange={handleSettingChange} />

          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[0_24px_80px_rgba(11,31,38,0.10)] backdrop-blur md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Пояснення логіки
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Як працює розрахунок</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <p>1. Податкова надбавка = сума × відсоток / 100.</p>
                <p>2. Фінальна сума = сума + податкова надбавка.</p>
                <p>
                  3. Якщо режим включає кілька компонентів, як-от 3% + ПДВ або 18% + ПДВ, калькулятор
                  складає їх із налаштувань і дає загальний базовий percent.
                </p>
              </div>
            </section>

            <section className="rounded-[28px] border border-amber-200/70 bg-amber-50/90 p-5 shadow-[0_24px_80px_rgba(11,31,38,0.08)] md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                Примітка щодо ставок
              </p>
              <p className="mt-3 text-sm leading-7 text-amber-950">
                Для ФОП 1 і 2 групи державні платежі у 2026 році мають фіксовану природу, тому в
                цьому інтерфейсі вони представлені як редагована внутрішня відсоткова надбавка для
                рахунків. Значення можна адаптувати під політику вашої команди.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
