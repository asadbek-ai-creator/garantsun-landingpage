import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/sectionTitle"

const PRICE_PER_KW = 10_000_000
const SUN_HOURS_PER_DAY = 5
const DAYS_PER_MONTH = 30

function formatUZS(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const CreditCalculator = () => {
  const [kw, setKw] = useState(5)
  const [monthlyBill, setMonthlyBill] = useState(500_000)

  const results = useMemo(() => {
    const monthlyGeneration = kw * SUN_HOURS_PER_DAY * DAYS_PER_MONTH
    const monthlySavings = monthlyBill
    const totalCost = kw * PRICE_PER_KW
    const paybackMonths = monthlySavings > 0 ? totalCost / monthlySavings : 0
    const paybackYears = paybackMonths / 12
    const savings1year = monthlySavings * 12
    const savings5year = monthlySavings * 12 * 5 - totalCost
    const savings10year = monthlySavings * 12 * 10 - totalCost
    const savings25year = monthlySavings * 12 * 25 - totalCost
    return { monthlyGeneration, monthlySavings, totalCost, paybackYears, savings1year, savings5year, savings10year, savings25year }
  }, [kw, monthlyBill])

  return (
    <section id="credit-calculator" className="credit-calc-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Калькулятор экономии</SectionTitle.SubTitle>
          <SectionTitle.Title>Рассчитайте вашу выгоду</SectionTitle.Title>
        </SectionTitle>

        <div className="row g-4 mt-4">
          {/* Inputs */}
          <div className="col-lg-5">
            <div className="credit-calc-card wow slideLeft">
              <h4 className="credit-calc-card__title">
                <i className="fas fa-solar-panel" /> Параметры системы
              </h4>

              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Мощность системы (кВт)
                </label>
                <div className="credit-calc-field__input-wrap">
                  <input
                    type="number"
                    className="credit-calc-field__input"
                    min={0.5}
                    max={500}
                    step={0.5}
                    value={kw}
                    onChange={(e) => setKw(Math.max(0.5, Number(e.target.value)))}
                  />
                  <span className="credit-calc-field__suffix">kW</span>
                </div>
                <small className="credit-calc-field__hint">
                  Выработка в месяц: {formatUZS(results.monthlyGeneration)} кВт·ч
                </small>
              </div>

              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Ежемесячный счёт за электроэнергию (сум)
                </label>
                <div className="credit-calc-field__input-wrap">
                  <input
                    type="number"
                    className="credit-calc-field__input"
                    min={0}
                    step={50000}
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Math.max(0, Number(e.target.value)))}
                    placeholder="500 000"
                  />
                  <span className="credit-calc-field__suffix">сўм</span>
                </div>
              </div>

              <div className="credit-calc-badge-banner">
                <i className="fas fa-info-circle" /> 5 ч солнца/день · {DAYS_PER_MONTH} дней/месяц · 100% экономия (автономная)
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="col-lg-7">
            <div className="credit-calc-results wow slideRight" data-delay=".3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${kw}-${monthlyBill}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="credit-calc-hero-stat">
                    <div className="credit-calc-hero-stat__label">
                      <i className="fas fa-piggy-bank" /> Ежемесячная экономия
                    </div>
                    <div className="credit-calc-hero-stat__value">
                      {formatUZS(results.monthlySavings)} <span>UZS</span>
                    </div>
                    <div className="credit-calc-hero-stat__sub">
                      <i className="fas fa-hourglass-half" /> Срок окупаемости: ~{results.paybackYears.toFixed(1)} лет
                    </div>
                  </div>

                  <div className="credit-calc-details">
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-chart-line" /> Прибыль за 1 год
                      </span>
                      <span className="credit-calc-details__value credit-calc-details__value--accent">
                        +{formatUZS(results.savings1year)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-chart-line" /> Прибыль за 5 лет
                      </span>
                      <span className={`credit-calc-details__value ${results.savings5year >= 0 ? "credit-calc-details__value--accent" : "credit-calc-details__value--warn"}`}>
                        {results.savings5year >= 0 ? "+" : ""}{formatUZS(results.savings5year)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-chart-line" /> Прибыль за 10 лет
                      </span>
                      <span className={`credit-calc-details__value ${results.savings10year >= 0 ? "credit-calc-details__value--accent" : "credit-calc-details__value--warn"}`}>
                        {results.savings10year >= 0 ? "+" : ""}{formatUZS(results.savings10year)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row credit-calc-details__row--total">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-star" /> Прибыль за 25 лет
                      </span>
                      <span className="credit-calc-details__value credit-calc-details__value--total">
                        +{formatUZS(results.savings25year)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-tag" /> Общая стоимость установки
                      </span>
                      <span className="credit-calc-details__value">
                        {formatUZS(results.totalCost)} UZS
                      </span>
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
