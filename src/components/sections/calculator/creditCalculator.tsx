import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/sectionTitle"

export interface CreditResults {
  totalPrice: number
  downPayment: number
  creditAmount: number
  months: number
  interestRate: number
  monthlyPayment: number
  overpayment: number
  totalRepayment: number
}

const CREDIT_PERIODS = [6, 12, 18, 24] as const
const PRICE_PER_KW = 10_000_000

function formatUZS(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

interface Props {
  onResultsChange?: (results: CreditResults) => void
}

const CreditCalculator = ({ onResultsChange }: Props) => {
  const [panelKw, setPanelKw] = useState(5)
  const [totalPrice, setTotalPrice] = useState(50_000_000)
  const [downPayment, setDownPayment] = useState(0)
  const [months, setMonths] = useState<number>(12)
  const [interestRate, setInterestRate] = useState(0)

  // Price input as formatted string for display
  const [priceDisplay, setPriceDisplay] = useState("50 000 000")
  const [downDisplay, setDownDisplay] = useState("0")

  const handleKwChange = (kw: number) => {
    const clamped = Math.min(100, Math.max(0, kw))
    setPanelKw(clamped)
    const newPrice = clamped * PRICE_PER_KW
    setTotalPrice(newPrice)
    setPriceDisplay(newPrice ? formatUZS(newPrice) : "0")
  }

  const results = useMemo<CreditResults>(() => {
    const creditAmount = Math.max(0, totalPrice - downPayment)

    let monthlyPayment: number
    let overpayment: number

    if (interestRate > 0 && months > 0 && creditAmount > 0) {
      const monthlyRate = interestRate / 12 / 100
      const factor = Math.pow(1 + monthlyRate, months)
      monthlyPayment = creditAmount * (monthlyRate * factor) / (factor - 1)
      overpayment = monthlyPayment * months - creditAmount
    } else if (months > 0 && creditAmount > 0) {
      monthlyPayment = creditAmount / months
      overpayment = 0
    } else {
      monthlyPayment = 0
      overpayment = 0
    }

    const totalRepayment = creditAmount + overpayment

    return {
      totalPrice,
      downPayment,
      creditAmount,
      months,
      interestRate,
      monthlyPayment,
      overpayment,
      totalRepayment,
    }
  }, [totalPrice, downPayment, months, interestRate])

  useEffect(() => {
    onResultsChange?.(results)
  }, [results, onResultsChange])

  const handlePriceInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    const num = digits ? parseInt(digits, 10) : 0
    setTotalPrice(num)
    setPriceDisplay(num ? formatUZS(num) : "")
  }

  const handleDownInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    const num = digits ? parseInt(digits, 10) : 0
    setDownPayment(num)
    setDownDisplay(num ? formatUZS(num) : "")
  }

  const downPercent = totalPrice > 0 ? Math.round((downPayment / totalPrice) * 100) : 0

  return (
    <section id="credit-calculator" className="credit-calc-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Credit Calculator</SectionTitle.SubTitle>
          <SectionTitle.Title>Calculate Your Installment Plan</SectionTitle.Title>
        </SectionTitle>

        <div className="row g-4 mt-4">
          {/* Inputs */}
          <div className="col-lg-5">
            <div className="credit-calc-card wow slideLeft">
              <h4 className="credit-calc-card__title">
                <i className="fas fa-calculator" /> Parameters
              </h4>

              <div className="credit-calc-field">
                <label className="credit-calc-field__label text-black">
                  Panel Power (kW)
                </label>
                <div className="credit-calc-field__input-wrap">
                  <input
                    type="number"
                    className="credit-calc-field__input text-black"
                    min={1}
                    max={100}
                    step={0.5}
                    value={panelKw}
                    onChange={(e) => handleKwChange(Number(e.target.value))}
                  />
                  <span className="credit-calc-field__suffix">kW</span>
                </div>
                <small className="credit-calc-field__hint">
                  {panelKw} kW = {formatUZS(panelKw * PRICE_PER_KW)} UZS
                </small>
              </div>

              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Total Price (UZS)
                </label>
                <div className="credit-calc-field__input-wrap">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="credit-calc-field__input text-black"
                    value={priceDisplay}
                    onChange={(e) => handlePriceInput(e.target.value)}
                    placeholder="50 000 000"
                  />
                  <span className="credit-calc-field__suffix">сўм</span>
                </div>
              </div>

              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Down Payment (UZS)
                  {downPercent > 0 && (
                    <span className="credit-calc-field__badge">{downPercent}%</span>
                  )}
                </label>
                <div className="credit-calc-field__input-wrap">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="credit-calc-field__input text-black"
                    value={downDisplay}
                    onChange={(e) => handleDownInput(e.target.value)}
                    placeholder="0"
                  />
                  <span className="credit-calc-field__suffix">сўм</span>
                </div>
                {downPayment > totalPrice && (
                  <small className="credit-calc-field__error">
                    Down payment cannot exceed total price
                  </small>
                )}
              </div>

              <div className="credit-calc-field">
                <label className="credit-calc-field__label">Credit Period</label>
                <div className="credit-calc-periods">
                  {CREDIT_PERIODS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`credit-calc-periods__btn ${months === p ? "active" : ""}`}
                      onClick={() => setMonths(p)}
                    >
                      {p} mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="credit-calc-field">
                <label className="credit-calc-field__label">
                  Annual Interest Rate: <strong>{interestRate}%</strong>
                </label>
                <input
                  type="range"
                  className="credit-calc-field__slider text-black"
                  min={0}
                  max={36}
                  step={0.5}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
                <div className="credit-calc-field__range-labels">
                  <span>0%</span>
                  <span>36%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="col-lg-7">
            <div className="credit-calc-results wow slideRight" data-delay=".3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${totalPrice}-${downPayment}-${months}-${interestRate}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Monthly Payment - hero stat */}
                  <div className="credit-calc-hero-stat">
                    <div className="credit-calc-hero-stat__label">
                      <i className="fas fa-calendar-check" /> Monthly Payment
                    </div>
                    <div className="credit-calc-hero-stat__value">
                      {formatUZS(results.monthlyPayment)} <span>UZS</span>
                    </div>
                    <div className="credit-calc-hero-stat__sub">
                      {months} months • {interestRate === 0 ? "0% interest" : `${interestRate}% annual`}
                    </div>
                  </div>

                  {/* Detail rows */}
                  <div className="credit-calc-details">
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-tag" /> Total Price
                      </span>
                      <span className="credit-calc-details__value">
                        {formatUZS(results.totalPrice)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-hand-holding-usd" /> Down Payment
                      </span>
                      <span className="credit-calc-details__value">
                        {formatUZS(results.downPayment)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-file-invoice-dollar" /> Credit Amount
                      </span>
                      <span className="credit-calc-details__value credit-calc-details__value--accent">
                        {formatUZS(results.creditAmount)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-percentage" /> Overpayment (Interest)
                      </span>
                      <span className={`credit-calc-details__value ${results.overpayment > 0 ? "credit-calc-details__value--warn" : "credit-calc-details__value--green"}`}>
                        {results.overpayment > 0 ? "+" : ""}{formatUZS(results.overpayment)} UZS
                      </span>
                    </div>
                    <div className="credit-calc-details__row credit-calc-details__row--total">
                      <span className="credit-calc-details__label">
                        <i className="fas fa-coins" /> Total Repayment
                      </span>
                      <span className="credit-calc-details__value credit-calc-details__value--total">
                        {formatUZS(results.totalRepayment)} UZS
                      </span>
                    </div>
                  </div>

                  {interestRate === 0 && (
                    <div className="credit-calc-badge-banner">
                      <i className="fas fa-check-circle" /> 0% installment — no extra charges!
                    </div>
                  )}
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
