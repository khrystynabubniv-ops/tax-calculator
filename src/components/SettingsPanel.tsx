import { rateDefinitions } from '../config/tax'
import type { TaxSettings } from '../types/tax'

interface SettingsPanelProps {
  settings: TaxSettings
  onChange: (rateKey: keyof TaxSettings, value: string) => void
}

export function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  return (
    <section className="rounded-[30px] border border-white/10 bg-[#121212] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-7">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6ff4a]">
          Rates setup
        </p>
        <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold text-white md:text-3xl">
          Дефолтні ставки зберігаються локально
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-400">
          Усі значення нижче зберігаються в <code className="rounded bg-white/8 px-1.5 py-0.5 text-sm text-stone-200">localStorage</code>.
          Для ФОП 1 та 2 групи з фіксованими платежами рекомендується ставити внутрішню робочу надбавку, а не буквальну податкову формулу.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {rateDefinitions.map((definition) => (
          <label
            key={definition.key}
            className="rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{definition.label}</p>
                <p className="mt-1 text-sm leading-6 text-stone-400">{definition.helperText}</p>
              </div>
              <div className="relative w-28 shrink-0">
                <input
                  inputMode="decimal"
                  value={settings[definition.key].toFixed(2)}
                  onChange={(event) => onChange(definition.key, event.target.value)}
                  className="w-full rounded-[18px] border border-white/10 bg-[#1a1a1a] px-3 py-2 pr-8 text-right text-sm font-medium text-white outline-none transition focus:border-[#d6ff4a] focus:ring-4 focus:ring-[#d6ff4a]/15"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-500">
                  %
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </section>
  )
}
