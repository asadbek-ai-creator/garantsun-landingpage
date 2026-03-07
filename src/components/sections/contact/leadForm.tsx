import { useState, FormEvent, ChangeEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/sectionTitle"

const REGIONS = [
  "Нукус",
  "Ташкент",
  "Самарканд",
  "Бухара",
  "Андижан",
  "Фергана",
  "Наманган",
  "Кашкадарья",
  "Сурхандарья",
  "Хорезм",
  "Навои",
  "Джизак",
  "Сырдарья",
  "Каракалпакстан",
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

const LeadForm = () => {
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
    if (!fullName.trim()) newErrors.fullName = "Введите ваше имя"
    if (!isPhoneComplete(phone)) newErrors.phone = "Введите полный номер телефона"
    if (!region) newErrors.region = "Выберите регион"
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
          name: fullName.trim(),
          phone,
          region,
          address: address.trim() || null,
        }),
      })
      if (!res.ok) throw new Error("Submission failed")
      setStatus("success")
      setFullName("")
      setPhone("+998")
      setRegion("")
      setAddress("")
      setErrors({})
      alert("Ваша заявка принята! Мы свяжемся с вами.")
    } catch (error) {
      setStatus("error")
      console.error("Form submission error:", error)
      alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.")
    }
  }

  return (
    <section id="lead-form" className="lead-form-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Контакты</SectionTitle.SubTitle>
          <SectionTitle.Title>Оставить заявку</SectionTitle.Title>
        </SectionTitle>

        <div className="row mt-4 mt-md-5 justify-content-center">
          {/* Form */}
          <div className="col-lg-8">
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
                    <h3>Спасибо!</h3>
                    <p>Ваша заявка принята. Наш специалист свяжется с вами в ближайшее время.</p>
                    <button
                      type="button"
                      className="theme-btn mt-3"
                      onClick={() => setStatus("idle")}
                    >
                      Новая заявка <i className="fas fa-arrow-right" />
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
                          <label>Полное имя *</label>
                          <input
                            type="text"
                            placeholder="Имя и фамилия"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={errors.fullName ? "has-error" : ""}
                          />
                          {errors.fullName && <small className="lead-form-field__error">{errors.fullName}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".5">
                        <div className="lead-form-field">
                          <label>Номер телефона *</label>
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
                          <label>Регион / Город *</label>
                          <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className={errors.region ? "has-error" : ""}
                          >
                            <option value="">Выберите регион</option>
                            {REGIONS.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                          {errors.region && <small className="lead-form-field__error">{errors.region}</small>}
                        </div>
                      </div>

                      <div className="col-lg-6 wow slideUp" data-delay=".5">
                        <div className="lead-form-field">
                          <label>Адрес</label>
                          <input
                            type="text"
                            placeholder="Введите ваш адрес (необязательно)"
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
                            Произошла ошибка. Пожалуйста, попробуйте снова.
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
                              <span className="lead-form-spinner" /> Отправка...
                            </>
                          ) : (
                            <>
                              Оставить заявку <i className="fas fa-arrow-right" />
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
