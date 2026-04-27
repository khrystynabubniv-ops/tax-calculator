import type { RateDefinition, RecipientDefinition, TaxSettings } from '../types/tax'

export const TAX_SETTINGS_STORAGE_KEY = 'tax-calculator-settings-v2'

export const rateDefinitions: RateDefinition[] = [
  {
    key: 'fopGroup1',
    label: 'ФОП 1 група',
    shortLabel: 'ФОП 1 група',
    defaultValue: 0,
    helperText: 'Внутрішня робоча надбавка без урахування військового збору.',
  },
  {
    key: 'fopGroup2',
    label: 'ФОП 2 група',
    shortLabel: 'ФОП 2 група',
    defaultValue: 0,
    helperText: 'Внутрішня робоча надбавка без урахування військового збору.',
  },
  {
    key: 'militaryFopGroup1',
    label: 'Військовий збір ФОП 1 група',
    shortLabel: 'ВЗ ФОП 1',
    defaultValue: 800,
    helperText: 'Фіксований військовий збір у гривнях. Значення можна відредагувати вручну.',
    valueType: 'currency',
  },
  {
    key: 'militaryFopGroup2',
    label: 'Військовий збір ФОП 2 група',
    shortLabel: 'ВЗ ФОП 2',
    defaultValue: 800,
    helperText: 'Фіксований військовий збір у гривнях. Значення можна відредагувати вручну.',
    valueType: 'currency',
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
    key: 'militaryFopGroup3',
    label: 'Військовий збір ФОП 3 група',
    shortLabel: 'ВЗ ФОП 3',
    defaultValue: 1,
    helperText: 'Окремий військовий збір 1% від доходу.',
  },
  {
    key: 'fopGeneral',
    label: 'ФОП загальна система',
    shortLabel: 'ФОП загальна',
    defaultValue: 40,
    helperText: 'ПДФО 18% + ЄСВ 22% без військового збору.',
  },
  {
    key: 'militaryFopGeneral',
    label: 'Військовий збір ФОП загальна система',
    shortLabel: 'ВЗ ФОП загальна',
    defaultValue: 5,
    helperText: 'Окремий військовий збір 5% від доходу.',
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
    defaultValue: 40,
    helperText: 'ПДФО 18% + ЄСВ 22% без військового збору.',
  },
  {
    key: 'militaryNgoPayroll',
    label: 'Військовий збір ГО виплати працівникам',
    shortLabel: 'ВЗ ГО виплати',
    defaultValue: 5,
    helperText: 'Окремий військовий збір 5% для виплат працівникам.',
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
        militaryTax: { mode: 'fixed', rateKey: 'militaryFopGroup1' },
      },
      {
        id: 'fop-group-2',
        label: '2 група',
        helperText: 'Фіксовані платежі. Значення в налаштуваннях працює як внутрішня надбавка.',
        rateKeys: ['fopGroup2'],
        militaryTax: { mode: 'fixed', rateKey: 'militaryFopGroup2' },
      },
      {
        id: 'fop-group-3-five',
        label: '3 група: 5% від доходу',
        helperText: 'Класична модель єдиного податку 5% без ПДВ.',
        rateKeys: ['fopGroup3Five'],
        militaryTax: { mode: 'percent', rateKey: 'militaryFopGroup3' },
      },
      {
        id: 'fop-group-3-three-vat',
        label: '3 група: 3% + ПДВ',
        helperText: 'Сума ставки формується як 3% плюс компонент ПДВ.',
        rateKeys: ['fopGroup3Three', 'vat'],
        militaryTax: { mode: 'percent', rateKey: 'militaryFopGroup3' },
      },
      {
        id: 'fop-general',
        label: 'Загальна система',
        helperText: 'Робочий шаблон для ПДФО, військового збору та ЄСВ.',
        rateKeys: ['fopGeneral'],
        militaryTax: { mode: 'percent', rateKey: 'militaryFopGeneral' },
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
        militaryTax: { mode: 'percent', rateKey: 'militaryNgoPayroll' },
      },
    ],
  },
]
