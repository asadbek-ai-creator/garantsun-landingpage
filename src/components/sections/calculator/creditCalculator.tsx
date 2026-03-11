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
  { id: 'subsidy', label: 'Субсидия',  rate: 0.19,  useSubsidyPrice: true,  tooltip: 'Выдаётся без первоначального взноса. Ставка 19% годовых.' },
  { id: 'fizlico', label: 'Физ. лицо', rate: 0.16,  useSubsidyPrice: false, tooltip: 'Стандартный банковский кредит. Ставка 16% годовых.' },
  { id: 'yurlico', label: 'Юр. лицо',  rate: 0.205, useSubsidyPrice: false, tooltip: 'Для предпринимателей и компаний. Ставка 20.5% годовых.' },
]

const LOAN_TERMS = [12, 24, 36, 60]

const MONTHLY_SUN_HOURS = [3.5, 4.5, 5.5, 7.0, 8.5, 9.5, 9.5, 8.5, 7.0, 5.5, 4.0, 3.0]
const MONTH_LABELS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

const T_BUY = 1000    // сум/кВт·ч — тариф покупки у государства
const T_SELL = 1000  // сум/кВт·ч — тариф продажи излишков государству

function formatUZS(value: number): string {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function getBarColor(monthIndex: number): string {
  // Nov(10), Dec(11), Jan(0), Feb(1) = light
  // Mar(2), Apr(3), Sep(8), Oct(9) = medium
  // May(4), Jun(5), Jul(6), Aug(7) = dark/peak
  if ([0, 1, 10, 11].includes(monthIndex)) return '#81c784'
  if ([2, 3, 8, 9].includes(monthIndex)) return '#4caf50'
  return '#2e7d32'
}

const CreditCalculator = () => {
  const [systemIdx, setSystemIdx]       = useState(1)
  const [creditTypeId, setCreditTypeId] = useState('subsidy')
  const [avansPercent, setAvansPercent]  = useState(0)
  const [months, setMonths]             = useState(36)
  const [monthlyBill, setMonthlyBill]   = useState(500_000)

  const system     = SYSTEMS[systemIdx]
  const creditType = CREDIT_TYPES.find(c => c.id === creditTypeId)!

  // Lock avans to 0 for subsidy
  const effectiveAvans = creditTypeId === 'subsidy' ? 0 : avansPercent

  const results = useMemo(() => {
    const basePrice   = creditType.useSubsidyPrice ? system.subsidyPrice : system.price
    const avansAmount = Math.round(basePrice * effectiveAvans / 100)
    const loanAmount  = basePrice - avansAmount

    const monthlyRate    = creditType.rate / 12
    const monthlyPayment = loanAmount > 0 && months > 0
      ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      : 0

    // Client monthly consumption in kWh
    const clientKwh = monthlyBill / T_BUY

    // Monthly generation per month
    const monthlyGeneration = MONTHLY_SUN_HOURS.map(h => system.kw * h * 30)

    // Calculate total annual value with dual tariff logic
    let totalAnnualValue = 0
    let totalSurplusKwh = 0
    let surplusMonths = 0
    for (let i = 0; i < 12; i++) {
      const panelKwh = monthlyGeneration[i]
      if (panelKwh <= clientKwh) {
        // Scenario A: panel produces less than client uses — savings only
        totalAnnualValue += panelKwh * T_BUY
      } else {
        // Scenario B: panel produces more — full savings + surplus income
        const savings = clientKwh * T_BUY
        const surplusKwh = panelKwh - clientKwh
        const surplusIncome = surplusKwh * T_SELL
        totalAnnualValue += savings + surplusIncome
        totalSurplusKwh += surplusKwh
        surplusMonths++
      }
    }

    // Final payback
    const paybackYears = totalAnnualValue > 0
      ? parseFloat((basePrice / totalAnnualValue).toFixed(1))
      : 0

    // Average monthly value
    const avgMonthlyValue = totalAnnualValue / 12

    // Coverage — use JULY (index 6, peak month) for display
    const julyPanel = system.kw * 9.5 * 30
    const coveragePercent = clientKwh > 0
      ? Math.min(100, Math.round((julyPanel / clientKwh) * 100))
      : 100
    const avgSurplusKwh = surplusMonths > 0 ? totalSurplusKwh / surplusMonths : 0

    const diff = monthlyPayment + monthlyBill

    return {
      basePrice, avansAmount, loanAmount,
      monthlyPayment, clientKwh,
      coveragePercent, julyPanel,
      avgSurplusKwh, avgMonthlyValue,
      diff, monthlyGeneration, paybackYears,
    }
  }, [system, creditType, effectiveAvans, months, monthlyBill])

  const maxGeneration = Math.max(...results.monthlyGeneration)

  const handleCTA = () => {
    const el = document.getElementById('lead-form') || document.getElementById('order') || document.getElementById('contact-form')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

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
                <i className="fas fa-sliders-h" /> Ваши параметры
              </h4>

              {/* Input 1 — Monthly bill */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Счёт за электричество в месяц (сум)
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
                  Ваше потребление: ~{formatUZS(results.clientKwh)} кВт·ч/мес
                </small>
              </div>

              {/* Input 2 — System size */}
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
                <small className="credit-calc-field__hint">
                  Era (двусторонний) · Goodwe · Гарантия 30 лет
                </small>
              </div>

              {/* Input 3 — Credit type */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">Тип кредита</label>
                <div className="credit-calc-periods">
                  {CREDIT_TYPES.map(ct => (
                    <button
                      key={ct.id}
                      type="button"
                      className={`credit-calc-periods__btn credit-calc-periods__btn--tooltip${creditTypeId === ct.id ? ' active' : ''}`}
                      onClick={() => {
                        setCreditTypeId(ct.id)
                        if (ct.id === 'subsidy') setAvansPercent(0)
                      }}
                      title={ct.tooltip}
                    >
                      {ct.label}
                      <span className="calc-tooltip-icon">?</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 4 — Loan term */}
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

              {/* Input 5 — Down payment */}
              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Первоначальный взнос: <strong>{effectiveAvans}%</strong>
                  {' '}({formatUZS(results.avansAmount)} сўм)
                </label>
                {creditTypeId === 'subsidy' ? (
                  <div className="credit-calc-field__subsidy-note">
                    (без первоначального взноса)
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Results ── */}
          <div className="col-lg-7">
            <div className="credit-calc-results wow slideRight" data-delay=".3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${systemIdx}-${creditTypeId}-${effectiveAvans}-${months}-${monthlyBill}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >

                  {/* CARD 1 — Coverage status (based on July peak) */}
                  {results.julyPanel >= results.clientKwh ? (
                    <div className="calc-coverage-card calc-coverage-card--green">
                      <div className="calc-coverage-card__icon">&#x2705;</div>
                      <div className="calc-coverage-card__text">
                        <div className="calc-coverage-card__title">Летом покрывает 100% + продаёт излишки</div>
                        <div className="calc-coverage-card__sub">
                          Средний излишек: {formatUZS(results.avgSurplusKwh)} кВт·ч/мес &rarr; доход по {formatUZS(results.avgSurplusKwh * T_SELL)} сум/мес
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="calc-coverage-card calc-coverage-card--orange">
                      <div className="calc-coverage-card__icon">&#x26A1;</div>
                      <div className="calc-coverage-card__text">
                        <div className="calc-coverage-card__title">
                          Покрывает {results.coveragePercent}% расхода летом
                        </div>
                        <div className="calc-coverage-card__sub">
                          Среднемесячная выгода: {formatUZS(results.avgMonthlyValue)} сум
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CARD 2 — Credit marketing block */}
                  <div className="calc-credit-compare">
                    <div className="calc-credit-compare__title">Кредитный платёж vs ваши расходы</div>
                    <div className="calc-credit-compare__row">
                      <span>Текущий счёт за свет:</span>
                      <span>{formatUZS(monthlyBill)} сум/мес</span>
                    </div>
                    <div className="calc-credit-compare__row">
                      <span>Платёж по кредиту:</span>
                      <span>{formatUZS(results.monthlyPayment)} сум/мес</span>
                    </div>
                    <div className="calc-credit-compare__divider" />
                    {results.diff > 0 ? (
                      <div className="calc-diff-negative">
                        <div className="calc-diff-negative__main">
                          Доплата из кармана: всего {formatUZS(results.diff)} сум/мес
                        </div>
                        <div className="calc-diff-negative__sub">
                          Через {months} мес панель станет вашей — платёж 0 сум!
                        </div>
                      </div>
                    ) : (
                      <div className="calc-diff-positive">
                        <div className="calc-diff-positive__main">
                          &#x2713; Кредит ДЕШЕВЛЕ вашего счёта за свет на {formatUZS(Math.abs(results.diff))} сум/мес!
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CARD 3 — System price */}
                  <div className="calc-credit-compare calc-credit-compare--simple">
                    <div className="calc-credit-compare__row">
                      <span>Стоимость системы:</span>
                      <span>{formatUZS(results.basePrice)} сум</span>
                    </div>
                    <div className="calc-credit-compare__row">
                      <span>Сумма кредита:</span>
                      <span>{formatUZS(results.loanAmount)} сум</span>
                    </div>
                    <div className="calc-credit-compare__row">
                      <span>Среднемесячная выгода:</span>
                      <span>{formatUZS(results.avgMonthlyValue)} сум</span>
                    </div>
                    <div className="calc-credit-compare__row">
                      <span>Срок окупаемости:</span>
                      <span>{results.paybackYears > 0 ? `${results.paybackYears} лет` : '—'}</span>
                    </div>
                  </div>

                  {/* SEASONALITY CHART */}
                  <div className="calc-chart-container">
                    <div className="calc-chart-container__title">
                      Выработка по месяцам vs Ваше потребление
                    </div>
                    <div className="calc-chart-container__ylabel">кВт·ч</div>
                    <div className="calc-chart-container__chart">
                      {/* Consumption dashed line */}
                      <div
                        className="calc-consumption-line"
                        style={{
                          bottom: `${(results.clientKwh / maxGeneration) * 200}px`,
                        }}
                      >
                        <span className="calc-consumption-line__label">{Math.round(results.clientKwh)}</span>
                      </div>
                      {/* Bars */}
                      {results.monthlyGeneration.map((kwh, i) => (
                        <div key={i} className="calc-chart-bar-wrap">
                          <div className="calc-chart-bar__value">{Math.round(kwh)}</div>
                          <div
                            className="calc-chart-bar"
                            style={{
                              height: `${(kwh / maxGeneration) * 200}px`,
                              background: getBarColor(i),
                            }}
                          />
                          <div className="calc-chart-bar__label">{MONTH_LABELS[i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* REAL CASE CARD */}
                  <div className="calc-real-case-card">
                    <img
                      src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80"
                      alt="Солнечные панели на крыше дома"
                      className="calc-real-case-card__img"
                    />
                    <div className="calc-real-case-card__content">
                      <div className="calc-real-case-card__badge">РЕАЛЬНЫЙ КЕЙС: Семья из Нукуса</div>
                      <div className="calc-real-case-card__sub">Семья 4 человека · Система 5 кВт</div>
                      <div className="calc-real-case-card__stats">
                        <div className="calc-real-case-card__stat">
                          <span>Раньше платили:</span>
                          <span className="calc-real-case-card__stat--old">600 000 сум/мес</span>
                        </div>
                        <div className="calc-real-case-card__stat">
                          <span>Сейчас платят:</span>
                          <span className="calc-real-case-card__stat--new">0 сум/мес</span>
                        </div>
                        <div className="calc-real-case-card__stat">
                          <span>Доход от излишков:</span>
                          <span className="calc-real-case-card__stat--profit">+200 000 сум/мес</span>
                        </div>
                        <div className="calc-real-case-card__stat">
                          <span>Окупаемость:</span>
                          <span>3 года</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="calc-cta-button"
                        onClick={handleCTA}
                      >
                        ХОЧУ ТАК ЖЕ — ОСТАВИТЬ ЗАЯВКУ &rarr;
                      </button>
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
