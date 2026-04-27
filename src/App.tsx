import { useEffect, useState } from 'react'
import { CalculatorForm } from './components/CalculatorForm'
import { ResultsCard } from './components/ResultsCard'
import { SettingsPanel } from './components/SettingsPanel'
import heroImage from './assets/hero.png'
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
  const selectedRateMode = manualRate !== null ? 'Manual override' : 'Auto synced'

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
    <main className="min-h-screen bg-[#090909] px-4 py-4 text-stone-100 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#111111] px-6 py-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:px-8 md:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(213,255,74,0.24),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.12),_transparent_22%)]" />
          <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-white/10" />
          <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-[#d6ff4a]/12 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
                <span>Universe-inspired</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-stone-200">
                  Tax calculator
                </span>
              </div>

              <p className="mt-8 text-sm uppercase tracking-[0.32em] text-[#d6ff4a]">Simplify the invoice</p>
              <h1 className="mt-3 max-w-4xl font-['Space_Grotesk'] text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
                Податковий калькулятор
                <span className="block text-stone-400">для команд, які хочуть рахувати швидко й чисто.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-stone-300 md:text-lg">
                Введіть суму, оберіть форму отримувача та режим оподаткування. Інтерфейс
                автоматично підтягне базову ставку, покаже податкову надбавку й фінальну суму до
                виставлення без зайвої бухгалтерської рутини.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">Recipient</p>
                  <p className="mt-3 text-lg font-medium text-white">{selectedRecipient.label}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">Current rate</p>
                  <p className="mt-3 text-lg font-medium text-white">{formatPercent(currentRateValue)}</p>
                </div>
                <div className="rounded-[24px] border border-[#d6ff4a]/30 bg-[#d6ff4a]/8 p-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[#efffbb]">Mode</p>
                  <p className="mt-3 text-lg font-medium text-white">{selectedRateMode}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#181818]">
                <img
                  src={heroImage}
                  alt="Ілюстрація команди та продуктового середовища"
                  className="h-60 w-full object-cover opacity-90"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Важливо</p>
                  <p className="mt-3 text-sm leading-6 text-stone-200">
                    Калькулятор допомагає швидко оцінити суму інвойсу, але не замінює валідацію зі
                    сторони бухгалтера чи юриста.
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#d6ff4a]/35 bg-[#d6ff4a] p-5 text-[#0b0b0b]">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-black/65">Final total</p>
                  <p className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold">{formatCurrency(total)}</p>
                  <p className="mt-2 text-sm leading-6 text-black/75">Оновлюється миттєво при кожній зміні параметрів.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
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
            <section className="rounded-[30px] border border-white/10 bg-[#121212] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6ff4a]">
                Calculation logic
              </p>
              <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold text-white">
                Як працює розрахунок
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-stone-300">
                <p>1. Податкова надбавка = сума × відсоток / 100.</p>
                <p>2. Фінальна сума = сума + податкова надбавка.</p>
                <p>
                  3. Якщо режим включає кілька компонентів, як-от 3% + ПДВ або 18% + ПДВ, калькулятор
                  складає їх із налаштувань і дає загальний базовий відсоток.
                </p>
              </div>
            </section>

            <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,_#1b1b1b_0%,_#111111_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
                Rates note
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-300">
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
