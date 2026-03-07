import SectionTitle from "@/components/ui/sectionTitle"

const AboutOne = () => {
  return (
    <section id="about" className="about-section section-padding fix">
      <div className="container">
        <div className="about-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-image-items">
                <div className="counter-shape float-bob-y">
                  <div className="icon">
                    <img src="/img/about/icon-1.svg" alt="icon-img" />
                  </div>
                  <div className="content">
                    <h3><span className="count">50</span>+</h3>
                    <p>Завершённых проектов</p>
                  </div>
                </div>
<div className="about-image-1 bg-cover wow slideLeft" data-delay=".3" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80")' }}>
                  <div className="about-image-2 wow slideUp" data-delay=".5">
                    <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80" alt="about-img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="about-content">
                <SectionTitle>
                  <SectionTitle.SubTitle>О нас</SectionTitle.SubTitle>
                  <SectionTitle.Title>Добро пожаловать в Garant Sun Energy</SectionTitle.Title>
                </SectionTitle>
                <p className="mt-3 mt-md-0 wow slideUp" data-delay=".5">
                  Garant Sun Energy — надёжный партнёр в области солнечной энергетики по всему Узбекистану. Мы поставляем высококачественные солнечные панели и инверторы, осуществляем профессиональный монтаж и обеспечиваем постоянную техническую поддержку. Наша миссия — сделать чистую и надёжную солнечную энергию доступной для домов, предприятий и промышленных объектов.
                </p>
                <div className="about-icon-items">
                  <div className="icon-items wow slideUp" data-delay=".7">
                    <div className="icon">
                      <img src="/img/about/icon-2.svg" alt="icon-img" />
                    </div>
                    <div className="content">
                      <h4>Надёжность и производительность</h4>
                      <p>
                        Высокоэффективные панели ERA Solar и инверторы GoodWe
                      </p>
                    </div>
                  </div>
                  <div className="icon-items wow slideUp" data-delay=".9">
                    <div className="icon">
                      <img src="/img/about/icon-3.svg" alt="icon-img" />
                    </div>
                    <div className="content">
                      <h4>Профессиональная поддержка</h4>
                      <p>
                        Монтаж, обслуживание и мониторинг по всему Каракалпакстану
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default AboutOne