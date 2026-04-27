import type { RecipientDefinition, RecipientType, ScenarioDefinition } from '../types/tax'

interface CalculatorFormProps {
  amount: string
  onAmountChange: (value: string) => void
  recipientType: RecipientType
  recipientOptions: RecipientDefinition[]
  onRecipientTypeChange: (value: RecipientType) => void
  selectedRecipient: RecipientDefinition
  selectedScenario: ScenarioDefinition
  onScenarioChange: (scenarioId: string) => void
  rateValue: string
  onRateChange: (value: string) => void
  onReset: () => void
  onRestoreAutoRate: () => void
  isManualRate: boolean
}

export function CalculatorForm({
  amount,
  onAmountChange,
  recipientType,
  recipientOptions,
  onRecipientTypeChange,
  selectedRecipient,
  selectedScenario,
  onScenarioChange,
  rateValue,
  onRateChange,
  onReset,
  onRestoreAutoRate,
  isManualRate,
}: CalculatorFormProps) {
  return (
    <section className="rounded-[30px] border border-white/10 bg-[#121212] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6ff4a]">
            Calculator
          </p>
          <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold text-white md:text-3xl">
            Порахувати суму до виставлення
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-stone-300 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
        >
          Скинути
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-stone-200">Сума без податків</span>
          <div className="relative">
            <input
              inputMode="decimal"
              value={amount}
              onChange={(event) => onAmountChange(event.target.value)}
              placeholder="Наприклад, 10000"
              className="w-full rounded-[22px] border border-white/10 bg-[#1a1a1a] px-4 py-3 pr-16 text-base text-white outline-none transition placeholder:text-stone-500 focus:border-[#d6ff4a] focus:ring-4 focus:ring-[#d6ff4a]/15"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-stone-500">
              грн
            </span>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-stone-200">Тип отримувача</span>
          <select
            value={recipientType}
            onChange={(event) => onRecipientTypeChange(event.target.value as RecipientType)}
            className="w-full rounded-[22px] border border-white/10 bg-[#1a1a1a] px-4 py-3 text-base text-white outline-none transition focus:border-[#d6ff4a] focus:ring-4 focus:ring-[#d6ff4a]/15"
          >
            {recipientOptions.map((recipient) => (
              <option key={recipient.id} value={recipient.id}>
                {recipient.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-stone-200">Група / система оподаткування</span>
        <select
          value={selectedScenario.id}
          onChange={(event) => onScenarioChange(event.target.value)}
          className="w-full rounded-[22px] border border-white/10 bg-[#1a1a1a] px-4 py-3 text-base text-white outline-none transition focus:border-[#d6ff4a] focus:ring-4 focus:ring-[#d6ff4a]/15"
        >
          {selectedRecipient.scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm leading-6 text-stone-400">{selectedScenario.helperText}</p>
      </label>

      <label className="mt-5 block">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="block text-sm font-medium text-stone-200">Податковий відсоток</span>
          {isManualRate ? (
            <button
              type="button"
              onClick={onRestoreAutoRate}
              className="text-sm font-medium text-[#d6ff4a] transition hover:text-[#efffbb]"
            >
              Повернути автоставку
            </button>
          ) : null}
        </div>
        <div className="relative">
          <input
            inputMode="decimal"
            value={rateValue}
            onChange={(event) => onRateChange(event.target.value)}
            className="w-full rounded-[22px] border border-white/10 bg-[#1a1a1a] px-4 py-3 pr-12 text-base text-white outline-none transition focus:border-[#d6ff4a] focus:ring-4 focus:ring-[#d6ff4a]/15"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-stone-500">
            %
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-stone-400">
          Ставка підтягується автоматично з налаштувань, але її можна відредагувати вручну для конкретного розрахунку.
        </p>
      </label>
    </section>
  )
}
