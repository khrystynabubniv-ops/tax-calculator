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
    <section className="rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[0_24px_80px_rgba(11,31,38,0.10)] backdrop-blur md:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Калькулятор
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
            Порахувати суму до виставлення
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          Скинути
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Сума без податків</span>
          <div className="relative">
            <input
              inputMode="decimal"
              value={amount}
              onChange={(event) => onAmountChange(event.target.value)}
              placeholder="Наприклад, 10000"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-16 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
              грн
            </span>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">Тип отримувача</span>
          <select
            value={recipientType}
            onChange={(event) => onRecipientTypeChange(event.target.value as RecipientType)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
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
        <span className="mb-2 block text-sm font-medium text-slate-800">Група / система оподаткування</span>
        <select
          value={selectedScenario.id}
          onChange={(event) => onScenarioChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        >
          {selectedRecipient.scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm leading-6 text-slate-500">{selectedScenario.helperText}</p>
      </label>

      <label className="mt-5 block">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="block text-sm font-medium text-slate-800">Податковий відсоток</span>
          {isManualRate ? (
            <button
              type="button"
              onClick={onRestoreAutoRate}
              className="text-sm font-medium text-emerald-700 transition hover:text-emerald-900"
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
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
            %
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Ставка підтягується автоматично з налаштувань, але її можна відредагувати вручну для конкретного розрахунку.
        </p>
      </label>
    </section>
  )
}
