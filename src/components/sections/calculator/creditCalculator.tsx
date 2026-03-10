import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/sectionTitle"

const SYSTEMS = [
  { kw: 3,  price: 12500000, subsidyPrice: 10000000, minKwh: 450,  maxKwh: 540  },
  { kw: 5,  price: 18500000, subsidyPrice: 14800000, minKwh: 750,  maxKwh: 900  },
  { kw: 10, price: 38000000, subsidyPrice: 30400000, minKwh: 1500, maxKwh: 1800 },
  { kw: 15, price: 55000000, subsidyPrice: 44000000, minKwh: 2250, maxKwh: 2700 },
  { kw: 20, price: 75000000, subsidyPrice: 60000000, minKwh: 3000, maxKwh: 3600 },
]

const CREDIT_TYPES = [
  { id: 'subsidy', label: 'Субсидия',  rate: 0.19,  useSubsidyPrice: true  },
  { id: 'fizlico', label: 'Физ. лицо', rate: 0.16,  useSubsidyPrice: false },
  { id: 'yurlico', label: 'Юр. лицо',  rate: 0.205, useSubsidyPrice: false },
]

const LOAN_TERMS = [12, 24, 36, 60]

// Average peak sun hours per day by month for Uzbekistan
const MONTHLY_SUN_HOURS = [3.5, 4.0, 5.0, 6.0, 7.0, 8.0, 8.0, 7.5, 6.5, 5.0, 3.8, 3.2]
const MONTH_LABELS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

function formatUZS(value: number): string {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const CreditCalculator = () => {
  const [systemIdx, setSystemIdx]       = useState(1)         // default 5 kW
  const [creditTypeId, setCreditTypeId] = useState('subsidy')
  const [avansPercent, setAvansPercent] = useState(20)
  const [months, setMonths]             = useState(36)
  const [monthlyBill, setMonthlyBill]   = useState(500_000)

  const system     = SYSTEMS[systemIdx]
  const creditType = CREDIT_TYPES.find(c => c.id === creditTypeId)!

  const results = useMemo(() => {
    const basePrice   = creditType.useSubsidyPrice ? system.subsidyPrice : system.price
    const avansAmount = Math.round(basePrice * avansPercent / 100)
    const loanAmount  = basePrice - avansAmount

    const monthlyRate    = creditType.rate / 12
    const monthlyPayment = loanAmount > 0 && months > 0
      ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      : 0

    const avgKwh                 = (system.minKwh + system.maxKwh) / 2
    const electricityPricePerKwh = avgKwh > 0 ? monthlyBill / avgKwh : 0
    const monthlySavings         = monthlyBill // 100% savings (autonomous)

    const monthlyGeneration  = MONTHLY_SUN_HOURS.map(h => system.kw * h * 30)
    const netMonthlyCashflow = monthlySavings - monthlyPayment
    const totalLoanCost      = monthlyPayment * months + avansAmount

    const profit1y  = monthlySavings * 12      - totalLoanCost
    const profit5y  = monthlySavings * 12 * 5  - totalLoanCost
    const profit25y = monthlySavings * 12 * 25 - totalLoanCost

    // Break-even: first month when cumulative savings >= totalLoanCost
    let breakEvenMonth = 0
    for (let m = 1; m <= 360; m++) {
      if (monthlySavings * m >= totalLoanCost) { breakEvenMonth = m; break }
    }

    return {
      basePrice, avansAmount, loanAmount,
      monthlyPayment, monthlySavings, netMonthlyCashflow,
      totalLoanCost, profit1y, profit5y, profit25y,
      breakEvenMonth, monthlyGeneration,
      avgKwh, electricityPricePerKwh,
    }
  }, [system, creditType, avansPercent, months, monthlyBill])

  const maxGeneration = Math.max(...results.monthlyGeneration)

  return (
    <section id="credit-calculator" className="credit-calc-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Калькулятор экономии</SectionTitle.SubTitle>
          <SectionTitle.Title>Рассчитайте вашу выгоду</SectionTitle.Title>
        </SectionTitle>

        <div className="row g-4 mt-4">

          {/* ── LEFT: Inputs ── */}
          <div className="col-lg-5">
            <div className="credit-calc-card wow slideLeft">
              <h4 className="credit-calc-card__title">
                <i className="fas fa-solar-panel" /> Параметры системы
              </h4>

              {/* System size */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">Мощность системы</label>
                <div className="credit-calc-periods">
                  {SYSTEMS.map((s, i) => (
                    <button
                      key={s.kw}
                      type="button"
                      className={`credit-calc-periods__btn${systemIdx === i ? ' active' : ''}`}
                      onClick={() => setSystemIdx(i)}
                    >
                      {s.kw} кВт
                    </button>
                  ))}
                </div>
              </div>

              {/* Credit type */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">Тип кредита</label>
                <div className="credit-calc-periods">
                  {CREDIT_TYPES.map(ct => (
                    <button
                      key={ct.id}
                      type="button"
                      className={`credit-calc-periods__btn${creditTypeId === ct.id ? ' active' : ''}`}
                      onClick={() => setCreditTypeId(ct.id)}
                    >
                      {ct.label} {(ct.rate * 100).toFixed(0)}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Down payment */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Первоначальный взнос: <strong>{avansPercent}%</strong>
                  {' '}({formatUZS(results.avansAmount)} сўм)
                </label>
                <input
                  type="range"
                  className="credit-calc-field__slider"
                  min={0}
                  max={50}
                  step={5}
                  value={avansPercent}
                  onChange={e => setAvansPercent(Number(e.target.value))}
                />
                <div className="credit-calc-field__range-labels">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan term */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">Срок кредита</label>
                <div className="credit-calc-periods">
                  {LOAN_TERMS.map(m => (
                    <button
                      key={m}
                      type="button"
                      className={`credit-calc-periods__btn${months === m ? ' active' : ''}`}
                      onClick={() => setMonths(m)}
                    >
                      {m} мес
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly electricity bill */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Счёт за электричество в месяц
                </label>
                <div className="credit-calc-field__input-wrap">
                  <input
                    type="number"
                    className="credit-calc-field__input"
                    min={0}
                    step={50000}
                    value={monthlyBill}
                    onChange={e => setMonthlyBill(Math.max(0, Number(e.target.value)))}
                    placeholder="500 000"
                  />
                  <span className="credit-calc-field__suffix">сўм</span>
                </div>
                <small className="credit-calc-field__hint">
                  ~{formatUZS(results.avgKwh)} кВт·ч/мес · {results.electricityPricePerKwh.toFixed(0)} сўм/кВт·ч
                </small>
              </div>

              {/* Example scenario box */}
              <div className="credit-calc-example">
                <div className="credit-calc-example__title">
                  💡 Пример: Жилой дом
                </div>
                <div className="credit-calc-example__rows">
                  <div className="credit-calc-example__row">
                    <span>Система</span><span>5 кВт (Субсидия)</span>
                  </div>
                  <div className="credit-calc-example__row">
                    <span>Стоимость</span><span>14 800 000 сум</span>
                  </div>
                  <div className="credit-calc-example__row">
                    <span>Аванс 20%</span><span>2 960 000 сум</span>
                  </div>
                  <div className="credit-calc-example__row">
                    <span>Кредит (36 мес)</span><span>11 840 000 сум</span>
                  </div>
                  <div className="credit-calc-example__row">
                    <span>Платёж / мес</span><span>~434 000 сум</span>
                  </div>
                  <div className="credit-calc-example__row">
                    <span>Экономия / мес</span><span>500 000 сум</span>
                  </div>
                  <div className="credit-calc-example__row credit-calc-example__row--highlight">
                    <span>Чистый поток</span><span>+66 000 сум/мес</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Results ── */}
          <div className="col-lg-7">
            <div className="credit-calc-results wow slideRight" data-delay=".3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${systemIdx}-${creditTypeId}-${avansPercent}-${months}-${monthlyBill}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Hero: monthly payment */}
                  <div className="credit-calc-hero-stat">
                    <div className="credit-calc-hero-stat__label">
                      <i className="fas fa-credit-card" /> Ежемесячный платёж по кредиту
                    </div>
                    <div className="credit-calc-hero-stat__value">
                      {formatUZS(results.monthlyPayment)} <span>сўм</span>
                    </div>
                    <div className="credit-calc-hero-stat__sub">
                      <i className="fas fa-piggy-bank" /> Ежемесячная экономия: {formatUZS(results.monthlySavings)} сўм
                    </div>
                  </div>

                  {/* Net cashflow + break-even */}
                  <div className="credit-calc-cashflow-row">
                    <div className={`credit-calc-cashflow${results.netMonthlyCashflow >= 0 ? ' credit-calc-cashflow--positive' : ' credit-calc-cashflow--negative'}`}>
                      <div className="credit-calc-cashflow__label">Чистый поток / мес</div>
                      <div className="credit-calc-cashflow__value">
                        {results.netMonthlyCashflow >= 0 ? '+' : ''}{formatUZS(results.netMonthlyCashflow)} сўм
                      </div>
                    </div>
                    <div className="credit-calc-cashflow credit-calc-cashflow--neutral">
                      <div className="credit-calc-cashflow__label">Окупаемость</div>
                      <div className="credit-calc-cashflow__value">
                        {results.breakEvenMonth > 0 ? `${results.breakEvenMonth} мес` : '—'}
                      </div>
                    </div>
                  </div>

                  {/* Profit rows */}
                  <div className="credit-calc-details">
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-chart-line" /> Прибыль за 1 год
                      </span>
                      <span className={`credit-calc-details__value ${results.profit1y >= 0 ? 'credit-calc-details__value--accent' : 'credit-calc-details__value--warn'}`}>
                        {results.profit1y >= 0 ? '+' : ''}{formatUZS(results.profit1y)} сўм
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-chart-line" /> Прибыль за 5 лет
                      </span>
                      <span className={`credit-calc-details__value ${results.profit5y >= 0 ? 'credit-calc-details__value--accent' : 'credit-calc-details__value--warn'}`}>
                        {results.profit5y >= 0 ? '+' : ''}{formatUZS(results.profit5y)} сўм
                      </span>
                    </div>
                    <div className="credit-calc-details__row credit-calc-details__row--total">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-star" /> Прибыль за 25 лет
                      </span>
                      <span className={`credit-calc-details__value ${results.profit25y >= 0 ? 'credit-calc-details__value--total' : 'credit-calc-details__value--warn'}`}>
                        {results.profit25y >= 0 ? '+' : ''}{formatUZS(results.profit25y)} сўм
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-tag" /> Цена системы
                      </span>
                      <span className="credit-calc-details__value">
                        {formatUZS(results.basePrice)} сўм
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-money-bill-wave" /> Итого по кредиту
                      </span>
                      <span className="credit-calc-details__value">
                        {formatUZS(results.totalLoanCost)} сўм
                      </span>
                    </div>
                  </div>

                  {/* Monthly generation chart */}
                  <div className="credit-calc-chart">
                    <div className="credit-calc-chart__title">
                      <i className="fas fa-sun" /> Выработка по месяцам (кВт·ч)
                    </div>
                    <div className="credit-calc-chart__bars">
                      {results.monthlyGeneration.map((kwh, i) => (
                        <div key={i} className="credit-calc-chart__bar-wrap">
                          <div className="credit-calc-chart__bar-value">
                            {Math.round(kwh)}
                          </div>
                          <div
                            className="credit-calc-chart__bar"
                            style={{ height: `${(kwh / maxGeneration) * 100}%` }}
                            title={`${MONTH_LABELS[i]}: ${Math.round(kwh)} кВт·ч`}
                          />
                          <div className="credit-calc-chart__bar-label">{MONTH_LABELS[i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CreditCalculator
