import SectionTitle from "@/components/ui/sectionTitle"

const productsData = [
  {
    id: 1,
    title: "ERA Solar Eagle Pro-66HD",
    subtitle: "N-Type Bifacial Double Glass Solar Panel",
    image: "/img/project/01.jpg",
    specs: [
      { label: "Power Range", value: "695–720W" },
      { label: "Max Efficiency", value: "23.18%" },
      { label: "Cells", value: "132 cells, MBB Half-Cut, 210×105mm mono Si" },
      { label: "Power Tolerance", value: "0~+5W (positive)" },
      { label: "Voc / Isc", value: "48.43–49.24V / 18.30–18.55A" },
      { label: "Dimensions", value: "2384×1303×33/35mm" },
      { label: "Weight", value: "37.7/38 kg" },
      { label: "Features", value: "Dual-glass, IP68 junction box, bifacial" },
      { label: "Warranty", value: "15-yr product, 30-yr linear power" },
      { label: "Degradation", value: "<1% yr 1, <0.4% yrs 2–30" },
      { label: "Certifications", value: "IEC61215, IEC61730, IEC61701, ISO9001, ISO14001, ISO45001" },
    ],
    manufacturer: "Zhejiang ERA Solar Technology Co., Ltd.",
  },
  {
    id: 2,
    title: "GoodWe GT Series Inverter",
    subtitle: "String Inverter for Commercial & Industrial",
    image: "/img/project/02.jpg",
    specs: [
      { label: "Power", value: "100–125kW, three-phase" },
      { label: "Models", value: "GW100K-GT, GW110K-GT, GW125K-GT" },
      { label: "MPPTs", value: "8/10, max efficiency 99.0%" },
      { label: "Max Input Voltage", value: "1100V DC" },
      { label: "MPPT Range", value: "180–1000V" },
      { label: "Max Input Current", value: "21A per string" },
      { label: "DC Oversizing / AC Overloading", value: "150% / 110%" },
      { label: "Protection", value: "IP66, Type II SPD (AC & DC)" },
      { label: "Operating Temp", value: "-30°C to +60°C" },
      { label: "Weight / Dimensions", value: "85–88 kg / 930×650×300mm" },
      { label: "Communication", value: "RS485, WiFi+LAN, 4G, Modbus-RTU" },
      { label: "Features", value: "No derating at 45°C, smart fan, fuse-free" },
    ],
    manufacturer: "GoodWe",
  },
]

const Products = () => {
  return (
    <section id="products" className="project-section section-padding fix">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>Our Products</SectionTitle.SubTitle>
          <SectionTitle.Title>Premium Solar Equipment</SectionTitle.Title>
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
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: "220px", objectFit: "cover" }}
                  />
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
                  Manufacturer: {product.manufacturer}
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
