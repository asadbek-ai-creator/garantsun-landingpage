import SectionTitle from "@/components/ui/sectionTitle"

const productsData = [
  {
    id: 1,
    title: "ERA Solar Eagle Pro-66HD",
    subtitle: "Двусторонняя двустекольная солнечная панель N-типа",
    specs: [
      { label: "Диапазон мощности", value: "695–720 Вт" },
      { label: "Макс. КПД", value: "23.18%" },
      { label: "Элементы", value: "132 шт., MBB Half-Cut, 210×105мм, моно Si" },
      { label: "Допуск мощности", value: "0~+5 Вт (положительный)" },
      { label: "Vxx / Iкз", value: "48.43–49.24 В / 18.30–18.55 А" },
      { label: "Габариты", value: "2384×1303×33/35 мм" },
      { label: "Вес", value: "37.7/38 кг" },
      { label: "Особенности", value: "Двойное стекло, IP68, двустороннее" },
      { label: "Гарантия", value: "15 лет на продукт, 30 лет на мощность" },
      { label: "Деградация", value: "<1% в 1-й год, <0.4% со 2-го по 30-й" },
      { label: "Сертификаты", value: "IEC61215, IEC61730, IEC61701, ISO9001, ISO14001, ISO45001" },
    ],
    manufacturer: "Zhejiang ERA Solar Technology Co., Ltd.",
  },
  {
    id: 2,
    title: "GoodWe GT Series Inverter",
    subtitle: "Сетевой инвертор для коммерческих и промышленных объектов",
    specs: [
      { label: "Мощность", value: "100–125 кВт, трёхфазный" },
      { label: "Модели", value: "GW100K-GT, GW110K-GT, GW125K-GT" },
      { label: "МРТП", value: "8/10, макс. КПД 99.0%" },
      { label: "Макс. входное напряжение", value: "1100 В DC" },
      { label: "Диапазон МРТП", value: "180–1000 В" },
      { label: "Макс. входной ток", value: "21 А на строку" },
      { label: "Перегрузка DC / AC", value: "150% / 110%" },
      { label: "Защита", value: "IP66, УЗИП тип II (AC и DC)" },
      { label: "Раб. температура", value: "-30°C до +60°C" },
      { label: "Вес / Габариты", value: "85–88 кг / 930×650×300 мм" },
      { label: "Связь", value: "RS485, WiFi+LAN, 4G, Modbus-RTU" },
      { label: "Особенности", value: "Без деградации при 45°C, умный вентилятор, без предохранителей" },
    ],
    manufacturer: "GoodWe",
  },
]

const Products = () => {
  return (
    <section id="products" className="project-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Наша продукция</SectionTitle.SubTitle>
          <SectionTitle.Title>Премиальное солнечное оборудование</SectionTitle.Title>
        </SectionTitle>
        <div className="row g-4 mt-4">
          {productsData.map((product) => (
            <div key={product.id} className="col-lg-6 wow slideUp">
              <div
                className="service-box-items"
                style={{
                  padding: "30px",
                  borderRadius: "10px",
                  background: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  height: "100%",
                }}
              >
                <div style={{ marginBottom: "20px", borderRadius: "8px", overflow: "hidden" }}>
                </div>
                <h3 style={{ marginBottom: "5px", color: "#1a1a2e" }}>{product.title}</h3>
                <p style={{ marginBottom: "15px", color: "#f6a000", fontWeight: 600 }}>
                  {product.subtitle}
                </p>
                <table style={{ width: "100%", fontSize: "14px" }}>
                  <tbody>
                    {product.specs.map((spec, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <td
                          style={{
                            padding: "6px 8px 6px 0",
                            fontWeight: 600,
                            color: "#333",
                            whiteSpace: "nowrap",
                            verticalAlign: "top",
                            width: "40%",
                          }}
                        >
                          {spec.label}
                        </td>
                        <td style={{ padding: "6px 0", color: "#666" }}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ marginTop: "12px", fontSize: "13px", color: "#999" }}>
                  Производитель: {product.manufacturer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
