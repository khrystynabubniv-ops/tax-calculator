import { rateDefinitions } from '../config/tax'
import type { TaxSettings } from '../types/tax'

interface SettingsPanelProps {
  settings: TaxSettings
  onChange: (rateKey: keyof TaxSettings, value: string) => void
}

export function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  return (
    <section className="rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[0_24px_80px_rgba(11,31,38,0.10)] backdrop-blur md:p-7">
      <div className="grid gap-4 lg:grid-cols-2">
        {rateDefinitions.map((definition) => (
          <label
            key={definition.key}
            className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-slate-900">{definition.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{definition.helperText}</p>
              </div>
              <div className="relative w-28 shrink-0">
                <input
                  inputMode="decimal"
                  value={settings[definition.key].toFixed(2)}
                  onChange={(event) => onChange(definition.key, event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 pr-8 text-right text-sm font-medium text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
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
