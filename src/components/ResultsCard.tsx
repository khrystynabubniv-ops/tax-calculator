interface ResultsCardProps {
  surchargeLabel: string
  totalLabel: string
  formulaLabel: string
  explanationLabel: string
  onCopy: () => void
}

export function ResultsCard({
  surchargeLabel,
  totalLabel,
  formulaLabel,
  explanationLabel,
  onCopy,
}: ResultsCardProps) {
  return (
    <section className="rounded-[30px] border border-[#d6ff4a]/20 bg-[linear-gradient(180deg,_#171717_0%,_#0c0c0c_100%)] px-5 py-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.35)] md:px-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6ff4a]">
            Result
          </p>
          <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold md:text-3xl">
            Скільки виставити
          </h2>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/12"
        >
          Скопіювати результат
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-stone-400">Сума податку / надбавки</p>
          <p className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold text-white">{surchargeLabel}</p>
        </div>
        <div className="rounded-[26px] border border-[#d6ff4a]/25 bg-[#d6ff4a] p-5 text-[#090909]">
          <p className="text-sm text-black/70">Фінальна сума до виставлення</p>
          <p className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold">{totalLabel}</p>
        </div>
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-white/5 p-5">
        <p className="text-sm font-medium text-stone-300">Формула</p>
        <p className="mt-3 text-lg leading-8 text-white">{formulaLabel}</p>
        <p className="mt-3 text-sm leading-6 text-stone-400">{explanationLabel}</p>
      </div>
    </section>
  )
}
