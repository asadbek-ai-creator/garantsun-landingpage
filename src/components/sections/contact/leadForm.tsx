import { useState, FormEvent, ChangeEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/sectionTitle"
import type { CreditResults } from "@/components/sections/calculator/creditCalculator"

interface LeadFormProps {
  creditResults?: CreditResults
}

const REGIONS = [
  "Нөкис",
  "Тошкент",
  "Самарқанд",
  "Бухоро",
  "Андижон",
  "Фарғона",
  "Наманган",
  "Қашқадарё",
  "Сурхондарё",
  "Хоразм",
  "Навоий",
  "Жиззах",
  "Сирдарё",
  "Қорақалпоғистон",
]

type FormStatus = "idle" | "loading" | "success" | "error"

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "")
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
  return digits.length === 12
}

function formatUZS(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const LeadForm = ({ creditResults }: LeadFormProps) => {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("+998")
  const [region, setRegion] = useState("")
  const [address, setAddress] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim()) newErrors.fullName = "Атыңызды киритиң"
    if (!isPhoneComplete(phone)) newErrors.phone = "Телефон номерди толық киритиң"
    if (!region) newErrors.region = "Аймақты таңлаң"
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
          region,
          address: address.trim() || null,
          calculatorResults: creditResults || null,
        }),
      })
      if (!res.ok) throw new Error("Submission failed")
      setStatus("success")
      setFullName("")
      setPhone("+998")
      setRegion("")
      setAddress("")
      setErrors({})
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="lead-form" className="lead-form-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Байланыс</SectionTitle.SubTitle>
          <SectionTitle.Title>Заявка қалдырыў</SectionTitle.Title>
        </SectionTitle>

        <div className="row mt-4 mt-md-5 justify-content-center">
          {/* Credit results summary */}
          {creditResults && creditResults.creditAmount > 0 && (
            <div className="col-lg-4 wow slideUp" data-delay=".2">
              <div className="lead-form-summary">
                <h4 className="lead-form-summary__title">
                  <i className="fas fa-calculator" /> Насия шартлары
                </h4>
                <ul className="lead-form-summary__list">
                  <li>
                    <span>Жәми баҳа</span>
                    <strong>{formatUZS(creditResults.totalPrice)} сўм</strong>
                  </li>
                  <li>
                    <span>Дәслепки төлем</span>
                    <strong>{formatUZS(creditResults.downPayment)} сўм</strong>
                  </li>
                  <li>
                    <span>Насия мүддети</span>
                    <strong>{creditResults.months} ай</strong>
                  </li>
                  <li>
                    <span>Айлық төлем</span>
                    <strong>{formatUZS(creditResults.monthlyPayment)} сўм</strong>
                  </li>
                  <li className="lead-form-summary__total">
                    <span>Жәми қайтарыў</span>
                    <strong>{formatUZS(creditResults.totalRepayment)} сўм</strong>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Form */}
          <div className={creditResults && creditResults.creditAmount > 0 ? "col-lg-8" : "col-lg-8"}>
            <div className="lead-form-card wow slideUp" data-delay=".3">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="lead-form-success"
                  >
                    <div className="lead-form-success__icon">
                      <i className="fas fa-check-circle" />
                    </div>
                    <h3>Рахмет!</h3>
                    <p>Сизиң мүрәжатыңыз қабыл етилди. Мутахассисимиз тез арада сиз бенен байланысады.</p>
                    <button
                      type="button"
                      className="theme-btn mt-3"
                      onClick={() => setStatus("idle")}
                    >
                      Жаңа мүрәжат <i className="fas fa-arrow-right" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="row g-4">
                      <div className="col-lg-6 wow slideUp" data-delay=".3">
                        <div className="lead-form-field">
                          <label>Толық аты-жөни *</label>
                          <input
                            type="text"
                            placeholder="Атыңыз ҳәм фамилияңыз"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={errors.fullName ? "has-error" : ""}
                          />
                          {errors.fullName && <small className="lead-form-field__error">{errors.fullName}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".5">
                        <div className="lead-form-field">
                          <label>Телефон номер *</label>
                          <input
                            type="tel"
                            placeholder="+998 XX XXX XX XX"
                            value={phone}
                            onChange={handlePhoneChange}
                            className={errors.phone ? "has-error" : ""}
                          />
                          {errors.phone && <small className="lead-form-field__error">{errors.phone}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".3">
                        <div className="lead-form-field">
                          <label>Аймақ / Қала *</label>
                          <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className={errors.region ? "has-error" : ""}
                          >
                            <option value="">Аймақты таңлаң</option>
                            {REGIONS.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                          {errors.region && <small className="lead-form-field__error">{errors.region}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".5">
                        <div className="lead-form-field">
                          <label>Мәнзил</label>
                          <input
                            type="text"
                            placeholder="Мәнзилиңизди киритиң (мәжбүрий емес)"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="col-12">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lead-form-error"
                          >
                            <i className="fas fa-exclamation-triangle" />{" "}
                            Қәтелик жүз берди. Илтимас, қайта урыныңыз.
                          </motion.div>
                        </div>
                      )}

                      <div className="col-12 wow slideUp" data-delay=".7">
                        <button
                          type="submit"
                          className="theme-btn lead-form-submit"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <>
                              <span className="lead-form-spinner" /> Жиберилмоқда...
                            </>
                          ) : (
                            <>
                              Заявка қалдырыў / Оставить заявку <i className="fas fa-arrow-right" />
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

export default LeadForm
