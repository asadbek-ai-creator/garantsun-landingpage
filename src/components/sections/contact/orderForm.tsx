import { useState, FormEvent, ChangeEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/sectionTitle"
import type { CalculatorResults } from "@/components/sections/calculator/solarCalculator"

interface OrderFormProps {
  calculatorResults?: CalculatorResults
}

const REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Xorazm",
  "Navoiy",
  "Jizzax",
  "Sirdaryo",
  "Qoraqalpog'iston",
]

type FormStatus = "idle" | "loading" | "success" | "error"

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "")
  // Remove leading 998 if user typed it (we already show +998)
  const local = digits.startsWith("998") ? digits.slice(3) : digits
  const d = local.slice(0, 9)
  let formatted = "+998"
  if (d.length > 0) formatted += " " + d.slice(0, 2)
  if (d.length > 2) formatted += " " + d.slice(2, 5)
  if (d.length > 5) formatted += " " + d.slice(5, 7)
  if (d.length > 7) formatted += " " + d.slice(7, 9)
  return formatted
}

const isPhoneComplete = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "")
  return digits.length === 12 // 998 + 9 digits
}

const OrderForm = ({ calculatorResults }: OrderFormProps) => {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("+998")
  const [address, setAddress] = useState("")
  const [region, setRegion] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim()) newErrors.fullName = "Ismingizni kiriting"
    if (!isPhoneComplete(phone)) newErrors.phone = "Telefon raqamni to'liq kiriting"
    if (!address.trim()) newErrors.address = "Manzilingizni kiriting"
    if (!region) newErrors.region = "Viloyatni tanlang"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus("loading")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone,
          address: address.trim(),
          region,
          calculatorResults: calculatorResults || null,
        }),
      })
      if (!res.ok) throw new Error("Submission failed")
      setStatus("success")
      setFullName("")
      setPhone("+998")
      setAddress("")
      setRegion("")
      setErrors({})
    } catch (error) {
      setStatus("error")
      console.error("Form submission error:", error)
    }
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("uz-UZ") + " so'm"

  return (
    <section id="order" className="order-form-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Buyurtma berish</SectionTitle.SubTitle>
          <SectionTitle.Title>Bepul konsultatsiya oling</SectionTitle.Title>
        </SectionTitle>

        <div className="row mt-4 mt-md-5 justify-content-center">
          {calculatorResults && (
            <div className="col-lg-5 wow slideUp" data-delay=".2">
              <div className="order-form-results-card">
                <h4 className="results-card-title">
                  <i className="fa-solid fa-solar-panel" /> Kalkulyator natijalari
                </h4>
                <ul className="results-list">
                  <li>
                    <span className="results-label">Panellar soni</span>
                    <span className="results-value">{calculatorResults.panelCount} dona</span>
                  </li>
                  <li>
                    <span className="results-label">Inverter modeli</span>
                    <span className="results-value">{calculatorResults.inverterModel}</span>
                  </li>
                  <li>
                    <span className="results-label">Tizim quvvati</span>
                    <span className="results-value">{calculatorResults.systemCapacity} kW</span>
                  </li>
                  <li>
                    <span className="results-label">Oylik ishlab chiqarish</span>
                    <span className="results-value">{calculatorResults.monthlyGeneration} kWh</span>
                  </li>
                  <li>
                    <span className="results-label">Oylik tejamkorlik</span>
                    <span className="results-value">{formatCurrency(calculatorResults.monthlySavings)}</span>
                  </li>
                  <li>
                    <span className="results-label">O'zini qoplash</span>
                    <span className="results-value">{calculatorResults.paybackPeriod} yil</span>
                  </li>
                  <li className="total-row">
                    <span className="results-label">Umumiy narx</span>
                    <span className="results-value">{formatCurrency(calculatorResults.totalCost)}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className={calculatorResults ? "col-lg-7" : "col-lg-8"}>
            <div className="order-form-card wow slideUp" data-delay=".3">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="order-form-message success-message"
                  >
                    <div className="success-icon">
                      <i className="fa-solid fa-circle-check" />
                    </div>
                    <h3>Rahmat!</h3>
                    <p>Sizning so'rovingiz qabul qilindi. Mutaxassisimiz tez orada siz bilan bog'lanadi.</p>
                    <button
                      type="button"
                      className="theme-btn mt-3"
                      onClick={() => setStatus("idle")}
                    >
                      Yangi so'rov <i className="fa-solid fa-arrow-right-long" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="contact-form-items"
                    noValidate
                  >
                    <div className="row g-4">
                      <div className="col-lg-6 wow slideUp" data-delay=".3">
                        <div className="form-clt">
                          <span>To'liq ism *</span>
                          <input
                            type="text"
                            placeholder="Ismingiz va familiyangiz"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={errors.fullName ? "input-error" : ""}
                          />
                          {errors.fullName && <small className="field-error">{errors.fullName}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".5">
                        <div className="form-clt">
                          <span>Telefon raqam *</span>
                          <input
                            type="tel"
                            placeholder="+998 XX XXX XX XX"
                            value={phone}
                            onChange={handlePhoneChange}
                            className={errors.phone ? "input-error" : ""}
                          />
                          {errors.phone && <small className="field-error">{errors.phone}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".3">
                        <div className="form-clt">
                          <span>Manzil *</span>
                          <input
                            type="text"
                            placeholder="Manzilingizni kiriting"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={errors.address ? "input-error" : ""}
                          />
                          {errors.address && <small className="field-error">{errors.address}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".5">
                        <div className="form-clt">
                          <span>Viloyat *</span>
                          <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className={errors.region ? "input-error" : ""}
                          >
                            <option value="">Viloyatni tanlang</option>
                            {REGIONS.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                          {errors.region && <small className="field-error">{errors.region}</small>}
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="col-12">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="order-form-message error-inline"
                          >
                            <i className="fa-solid fa-triangle-exclamation" />{" "}
                            Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
                          </motion.div>
                        </div>
                      )}

                      <div className="col-lg-12 wow slideUp" data-delay=".7">
                        <button
                          type="submit"
                          className="theme-btn"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <>
                              <span className="order-form-spinner" /> Yuborilmoqda...
                            </>
                          ) : (
                            <>
                              Buyurtma berish <i className="fa-solid fa-arrow-right-long" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderForm
