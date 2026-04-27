import type { RateDefinition, RecipientDefinition, TaxSettings } from '../types/tax'

export const TAX_SETTINGS_STORAGE_KEY = 'tax-calculator-settings-v1'

export const rateDefinitions: RateDefinition[] = [
  {
    key: 'fopGroup1',
    label: 'ФОП 1 група',
    shortLabel: 'ФОП 1 група',
    defaultValue: 0,
    helperText:
      'Фіксовані платежі у 2026 році, тому тут варто задати внутрішню effective-надбавку команди.',
  },
  {
    key: 'fopGroup2',
    label: 'ФОП 2 група',
    shortLabel: 'ФОП 2 група',
    defaultValue: 0,
    helperText:
      'Фіксовані платежі у 2026 році, тому значення зручно використовувати як внутрішню надбавку.',
  },
  {
    key: 'fopGroup3Five',
    label: 'ФОП 3 група 5%',
    shortLabel: 'ФОП 3 група 5%',
    defaultValue: 5,
    helperText: 'Єдиний податок 5% від доходу.',
  },
  {
    key: 'fopGroup3Three',
    label: 'ФОП 3 група 3% + ПДВ',
    shortLabel: 'ФОП 3 група 3%',
    defaultValue: 3,
    helperText: 'База для режиму 3% плюс окремий компонент ПДВ.',
  },
  {
    key: 'fopGeneral',
    label: 'ФОП загальна система',
    shortLabel: 'ФОП загальна',
    defaultValue: 45,
    helperText: 'ПДФО 18% + військовий збір 5% + ЄСВ 22% як робоча сума для калькулятора.',
  },
  {
    key: 'tovSimplifiedFive',
    label: 'ТОВ спрощена 5%',
    shortLabel: 'ТОВ 5%',
    defaultValue: 5,
    helperText: 'Спрощена система, 3 група, без ПДВ.',
  },
  {
    key: 'tovSimplifiedThree',
    label: 'ТОВ спрощена 3% + ПДВ',
    shortLabel: 'ТОВ 3%',
    defaultValue: 3,
    helperText: 'База для спрощеної системи 3% плюс окремий компонент ПДВ.',
  },
  {
    key: 'tovGeneral',
    label: 'ТОВ загальна система',
    shortLabel: 'ТОВ загальна',
    defaultValue: 18,
    helperText: 'Податок на прибуток 18%.',
  },
  {
    key: 'vat',
    label: 'ТОВ ПДВ',
    shortLabel: 'ПДВ',
    defaultValue: 20,
    helperText: 'Окремий компонент ПДВ, який підсумовується з вибраними режимами.',
  },
  {
    key: 'ngoNonProfit',
    label: 'ГО неприбуткова',
    shortLabel: 'ГО неприбуткова',
    defaultValue: 0,
    helperText: '0%, якщо доходи використовуються на статутну діяльність.',
  },
  {
    key: 'ngoPayroll',
    label: 'ГО виплати працівникам',
    shortLabel: 'ГО виплати',
    defaultValue: 45,
    helperText: 'ПДФО 18% + військовий збір 5% + ЄСВ 22% як спрощена ставка для надбавки.',
  },
]

export const defaultTaxSettings: TaxSettings = rateDefinitions.reduce(
  (accumulator, definition) => {
    accumulator[definition.key] = definition.defaultValue
    return accumulator
  },
  {} as TaxSettings,
)

export const recipientDefinitions: RecipientDefinition[] = [
  {
    id: 'fop',
    label: 'ФОП',
    helperText: 'Гнучкий режим для роботи з групами єдиного податку та загальною системою.',
    scenarios: [
      {
        id: 'fop-group-1',
        label: '1 група',
        helperText: 'Фіксований ЄП, військовий збір та ЄСВ. Рекомендується виставити внутрішній percent-policy.',
        rateKeys: ['fopGroup1'],
      },
      {
        id: 'fop-group-2',
        label: '2 група',
        helperText: 'Фіксовані платежі. Значення в налаштуваннях працює як внутрішня надбавка.',
        rateKeys: ['fopGroup2'],
      },
      {
        id: 'fop-group-3-five',
        label: '3 група: 5% від доходу',
        helperText: 'Класична модель єдиного податку 5% без ПДВ.',
        rateKeys: ['fopGroup3Five'],
      },
      {
        id: 'fop-group-3-three-vat',
        label: '3 група: 3% + ПДВ',
        helperText: 'Сума ставки формується як 3% плюс компонент ПДВ.',
        rateKeys: ['fopGroup3Three', 'vat'],
      },
      {
        id: 'fop-general',
        label: 'Загальна система',
        helperText: 'Робочий шаблон для ПДФО, військового збору та ЄСВ.',
        rateKeys: ['fopGeneral'],
      },
    ],
  },
  {
    id: 'tov',
    label: 'ТОВ',
    helperText: 'Підтримує спрощену та загальну систему з окремим ПДВ-компонентом.',
    scenarios: [
      {
        id: 'tov-simplified-five',
        label: 'Спрощена система: 5% без ПДВ',
        helperText: 'Єдиний податок 5% для юрособи.',
        rateKeys: ['tovSimplifiedFive'],
      },
      {
        id: 'tov-simplified-three-vat',
        label: 'Спрощена система: 3% + ПДВ',
        helperText: 'Працює як сума 3% та окремого ПДВ.',
        rateKeys: ['tovSimplifiedThree', 'vat'],
      },
      {
        id: 'tov-general',
        label: 'Загальна система: 18%',
        helperText: 'Податок на прибуток без ПДВ-компонента.',
        rateKeys: ['tovGeneral'],
      },
      {
        id: 'tov-general-vat',
        label: 'Загальна система + ПДВ 20%',
        helperText: 'Для кейсів, коли потрібно додати ПДВ зверху до базової ставки.',
        rateKeys: ['tovGeneral', 'vat'],
      },
    ],
  },
  {
    id: 'go',
    label: 'ГО',
    helperText: 'Окремі режими для неприбуткової діяльності та виплат працівникам.',
    scenarios: [
      {
        id: 'ngo-non-profit',
        label: 'Неприбуткова організація: 0%',
        helperText: 'Ставка 0%, якщо кошти використовуються на статутну діяльність.',
        rateKeys: ['ngoNonProfit'],
      },
      {
        id: 'ngo-payroll',
        label: 'Виплати працівникам',
        helperText: 'Спрощена робоча модель для ПДФО, військового збору та ЄСВ.',
        rateKeys: ['ngoPayroll'],
      },
    ],
  },
]
