import { useState, useEffect, useCallback } from "react"
import CountUp from "react-countup"
import SectionTitle from "@/components/ui/sectionTitle"

export interface CalculatorResults {
  panelCount: number
  systemCapacity: number
  monthlyGeneration: number
  monthlySavings: number
  totalCost: number
  paybackPeriod: number
  inverterModel: string
  roofArea: number
  location: string
  monthlyBill: number
}

const IRRADIANCE: Record<string, number> = {
  Tashkent: 4.8,
  Samarkand: 5.2,
  Bukhara: 5.5,
  Fergana: 4.7,
  Namangan: 4.6,
  Andijan: 4.5,
  Kashkadarya: 5.3,
  Surkhandarya: 5.4,
  Khorezm: 5.0,
  Navoi: 5.6,
  Jizzakh: 5.1,
  Syrdarya: 4.9,
  Karakalpakstan: 5.0,
}

const REGIONS = Object.keys(IRRADIANCE)

const PANEL_WATTAGE = 0.55 // kW
const PANEL_FOOTPRINT = 2.2 // m²
const USABLE_ROOF_FACTOR = 0.7
const PERFORMANCE_RATIO = 0.8
const ELECTRICITY_RATE = 345 // UZS/kWh
const PANEL_COST_UZS = 2_200_000
const INVERTER_COST_RATIO = 0.15
const INSTALLATION_COST_RATIO = 0.10

function getInverterModel(capacityKw: number): string {
  if (capacityKw < 6) return "GoodWe GW3000-GT / GW5000-GT (3–6 kW)"
  if (capacityKw <= 10) return "GoodWe GW8000-GT / GW10K-GT (8–10 kW)"
  return "GoodWe GW15K-GT / GW20K-GT (15–20 kW)"
}

function formatUZS(value: number): string {
  return value.toLocaleString("ru-RU")
}

interface Props {
  onResultsChange?: (results: CalculatorResults) => void
}

const SolarCalculator = ({ onResultsChange }: Props) => {
  const [roofArea, setRoofArea] = useState(50)
  const [location, setLocation] = useState("Tashkent")
  const [monthlyBill, setMonthlyBill] = useState(500_000)
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [calculated, setCalculated] = useState(false)

  const calculate = useCallback(() => {
    const irradiance = IRRADIANCE[location]
    const usableArea = roofArea * USABLE_ROOF_FACTOR
    const panelCount = Math.floor(usableArea / PANEL_FOOTPRINT)

    if (panelCount <= 0) {
      setResults(null)
      setCalculated(true)
      return
    }

    const systemCapacity = panelCount * PANEL_WATTAGE
    const dailyGeneration = systemCapacity * irradiance * PERFORMANCE_RATIO
    const monthlyGeneration = dailyGeneration * 30

    const effectiveRate = monthlyBill > 0 ? monthlyBill / (monthlyBill / ELECTRICITY_RATE) : ELECTRICITY_RATE
    const monthlySavings = monthlyGeneration * effectiveRate

    const panelCost = panelCount * PANEL_COST_UZS
    const inverterCost = panelCost * INVERTER_COST_RATIO
    const installationCost = (panelCost + inverterCost) * INSTALLATION_COST_RATIO
    const totalCost = panelCost + inverterCost + installationCost

    const annualSavings = monthlySavings * 12
    const paybackPeriod = annualSavings > 0 ? totalCost / annualSavings : 0

    const inverterModel = getInverterModel(systemCapacity)

    const newResults: CalculatorResults = {
      panelCount,
      systemCapacity: Math.round(systemCapacity * 100) / 100,
      monthlyGeneration: Math.round(monthlyGeneration),
      monthlySavings: Math.round(monthlySavings),
      totalCost: Math.round(totalCost),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      inverterModel,
      roofArea,
      location,
      monthlyBill,
    }

    setResults(newResults)
    setCalculated(true)
  }, [roofArea, location, monthlyBill])

  useEffect(() => {
    if (results && onResultsChange) {
      onResultsChange(results)
    }
  }, [results, onResultsChange])

  return (
    <section id="calculator" className="calculator-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Solar Calculator</SectionTitle.SubTitle>
          <SectionTitle.Title>Calculate Your Solar Savings</SectionTitle.Title>
        </SectionTitle>

        <div className="row g-4 mt-4">
          {/* Input Form */}
          <div className="col-lg-5 wow slideLeft">
            <div className="calculator-card">
              <h4 className="calculator-card__title">
                <i className="fas fa-sliders-h" /> System Parameters
              </h4>

              <div className="calculator-field">
                <label className="calculator-field__label" htmlFor="roofArea">
                  Roof Area: <strong>{roofArea} m²</strong>
                </label>
                <input
                  id="roofArea"
                  type="range"
                  className="calculator-field__slider"
                  min={10}
                  max={500}
                  step={5}
                  value={roofArea}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                />
                <div className="calculator-field__range-labels">
                  <span>10 m²</span>
                  <span>500 m²</span>
                </div>
              </div>

              <div className="calculator-field">
                <label className="calculator-field__label" htmlFor="location">
                  Location (Region)
                </label>
                <select
                  id="location"
                  className="calculator-field__select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region} ({IRRADIANCE[region]} kWh/m²/day)
                    </option>
                  ))}
                </select>
              </div>

              <div className="calculator-field">
                <label className="calculator-field__label" htmlFor="monthlyBill">
                  Monthly Electricity Bill (UZS)
                </label>
                <input
                  id="monthlyBill"
                  type="number"
                  className="calculator-field__input"
                  min={0}
                  step={50000}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                />
              </div>

              <button
                type="button"
                className="theme-btn calculator-btn"
                onClick={calculate}
              >
                <span className="button-content-wrapper d-flex align-items-center">
                  <span className="button-icon">
                    <i className="fas fa-calculator" />
                  </span>
                  <span className="button-text">Calculate Savings</span>
                </span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="col-lg-7 wow slideRight" data-delay=".3">
            {calculated && results ? (
              <div className="calculator-results">
                {/* Top stats row */}
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <div className="calculator-stat calculator-stat--primary">
                      <div className="calculator-stat__icon">
                        <i className="fas fa-solar-panel" />
                      </div>
                      <div className="calculator-stat__value">
                        <CountUp end={results.panelCount} duration={1.5} />
                      </div>
                      <div className="calculator-stat__label">
                        ERA Solar Eagle Pro-66HD Panels
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="calculator-stat calculator-stat--accent">
                      <div className="calculator-stat__icon">
                        <i className="fas fa-bolt" />
                      </div>
                      <div className="calculator-stat__value">
                        <CountUp
                          end={results.systemCapacity}
                          decimals={1}
                          duration={1.5}
                        />{" "}
                        <span className="calculator-stat__unit">kW</span>
                      </div>
                      <div className="calculator-stat__label">
                        System Capacity
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <div className="calculator-stat calculator-stat--success">
                      <div className="calculator-stat__icon">
                        <i className="fas fa-plug" />
                      </div>
                      <div className="calculator-stat__value">
                        <CountUp
                          end={results.monthlyGeneration}
                          separator=","
                          duration={1.5}
                        />{" "}
                        <span className="calculator-stat__unit">kWh</span>
                      </div>
                      <div className="calculator-stat__label">
                        Monthly Generation
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="calculator-stat calculator-stat--savings">
                      <div className="calculator-stat__icon">
                        <i className="fas fa-piggy-bank" />
                      </div>
                      <div className="calculator-stat__value">
                        <CountUp
                          end={results.monthlySavings}
                          separator=","
                          duration={1.5}
                        />{" "}
                        <span className="calculator-stat__unit">UZS</span>
                      </div>
                      <div className="calculator-stat__label">
                        Monthly Savings
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom detail card */}
                <div className="calculator-detail-card">
                  <div className="calculator-detail-card__row">
                    <span className="calculator-detail-card__label">
                      <i className="fas fa-microchip" /> Inverter
                    </span>
                    <span className="calculator-detail-card__value">
                      {results.inverterModel}
                    </span>
                  </div>
                  <div className="calculator-detail-card__row">
                    <span className="calculator-detail-card__label">
                      <i className="fas fa-money-bill-wave" /> Total Cost
                    </span>
                    <span className="calculator-detail-card__value calculator-detail-card__value--highlight">
                      {formatUZS(results.totalCost)} UZS
                    </span>
                  </div>
                  <div className="calculator-detail-card__row">
                    <span className="calculator-detail-card__label">
                      <i className="fas fa-hourglass-half" /> Payback Period
                    </span>
                    <span className="calculator-detail-card__value calculator-detail-card__value--highlight">
                      ~{results.paybackPeriod} years
                    </span>
                  </div>
                </div>
              </div>
            ) : calculated && !results ? (
              <div className="calculator-empty">
                <i className="fas fa-exclamation-triangle" />
                <p>
                  The roof area is too small to fit any panels. Please increase
                  the roof area to at least 7 m².
                </p>
              </div>
            ) : (
              <div className="calculator-empty">
                <i className="fas fa-sun" />
                <h4>See Your Solar Potential</h4>
                <p>
                  Enter your roof area, location, and current electricity bill,
                  then click <strong>Calculate Savings</strong> to see how much
                  you can save with solar energy.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolarCalculator
