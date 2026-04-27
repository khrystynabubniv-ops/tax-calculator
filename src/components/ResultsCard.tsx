interface ResultsCardProps {
  baseTaxLabel: string
  militaryTaxLabel: string
  militaryTaxDescription: string
  surchargeLabel: string
  totalLabel: string
  formulaLabel: string
  explanationLabel: string
  onCopy: () => void
}

export function ResultsCard({
  baseTaxLabel,
  militaryTaxLabel,
  militaryTaxDescription,
  surchargeLabel,
  totalLabel,
  formulaLabel,
  explanationLabel,
  onCopy,
}: ResultsCardProps) {
  return (
    <section className="rounded-[28px] border border-slate-900/10 bg-slate-950 px-5 py-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.24)] md:px-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Результат
          </p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Скільки виставити</h2>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          Скопіювати результат
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-300">Загальна сума податків</p>
          <p className="mt-3 text-3xl font-semibold text-white">{surchargeLabel}</p>
        </div>
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
          <p className="text-sm text-emerald-100">Фінальна сума до виставлення</p>
          <p className="mt-3 text-3xl font-semibold text-white">{totalLabel}</p>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm font-medium text-slate-200">Податки</p>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span>Базові податки</span>
            <span className="font-medium text-white">{baseTaxLabel}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{militaryTaxDescription}</span>
            <span className="font-medium text-white">{militaryTaxLabel}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm font-medium text-slate-200">Формула</p>
        <p className="mt-3 text-lg leading-8 text-white">{formulaLabel}</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">{explanationLabel}</p>
      </div>
    </section>
  )
}
