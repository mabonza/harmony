import { useState } from 'react';
import './App.css';

const services = [
  {
    title: 'Family Planning',
    price: 'From R100',
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Baby Vaccines',
    price: 'From R150',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'STI Treatment',
    price: 'From R350',
    image:
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1200&q=80',
  },
];

const aboutCards = [
  {
    title: 'Meet the Team',
    image:
      'https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Corporate Profile',
    image:
      'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'The Network',
    image:
      'https://images.unsplash.com/photo-1524492412937-4961d66aa114?auto=format&fit=crop&w=1200&q=80',
  },
];

const partners = [
  'Peotona Holdings',
  'Shoprite',
  'Checkers',
  'Medirite',
  'Western Cape Government',
  'Bolt',
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <img src="/header-logo.png" alt="Harmony Health" />
          </div>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#hero">Home</a>
            <a href="#services">Services</a>
            <a href="#network">Clinics</a>
            <a href="#about">Health</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="pill primary booking-btn">Make a Booking</button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-copy">
            <div className="price-pill">From R390</div>
            <h1>
              Get Better
              <span>Primary Healthcare</span>
            </h1>
            <p>
              HarmonyHealth brings together doctors and nurse specialists to
              deliver affordable, quality care. Visit your nearest clinic for
              better care, better service, and better outcomes.
            </p>
            <div className="hero-actions">
              <button className="pill primary">Make a Booking</button>
              <button className="pill ghost">View All Services</button>
            </div>
          </div>
          <div className="hero-figure">
            <div className="consultation-card">
              <span>Consultation</span>
              <strong>+</strong>
              <span>Medication</span>
            </div>
            <div className="team-photo" />
          </div>
        </section>

        <section id="services" className="section services">
          <div className="section-heading">
            <h2>Featured Services</h2>
            <p>
              Preventative, curative, chronic and occupational healthcare for
              families, communities, and businesses.
            </p>
            <button className="pill ghost">View All Services</button>
          </div>
          <div className="card-grid">
            {services.map((service) => (
              <article
                key={service.title}
                className="service-card"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="service-overlay" />
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="network" className="section network">
          <h2>National Clinic Network</h2>
          <p>
            We operate a growing network of community clinics and occupational
            healthcare sites across South Africa.
          </p>
          <div className="map-card">
            <div className="map-figure" />
            <button className="pill primary">Find Your Clinic</button>
          </div>
        </section>

        <section id="about" className="section about">
          <h2>About HarmonyHealth</h2>
          <p>
            A community-first primary healthcare provider committed to better
            access, better service, and better outcomes.
          </p>
          <div className="card-grid about-grid">
            {aboutCards.map((card) => (
              <article
                key={card.title}
                className="about-card"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="about-overlay" />
                <h3>{card.title}</h3>
              </article>
            ))}
          </div>
          <button className="pill ghost">Connect with HarmonyHealth</button>
        </section>

        <section id="partners" className="section partners">
          <h2>Our Valued Partners</h2>
          <p>
            Trusted by leading brands and local communities to deliver
            accessible healthcare.
          </p>
          <div className="partner-logos">
            {partners.map((partner) => (
              <div key={partner} className="partner-chip">
                {partner}
              </div>
            ))}
          </div>
          <button className="pill primary">Partner with Us</button>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand">
              <img src="/footer-logo.png" alt="Harmony Health" />
            </div>
            <p>Better care. Better service. Better outcomes.</p>
            <p className="contact">
              info@harmonyhealth.co.za • 021 001 7024
              <br />
              55 Morningside St, Cape Town
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
            </div>
            <div>
              <h4>Network</h4>
              <a href="#network">Clinics</a>
              <a href="#network">Occupational</a>
              <a href="#partners">Partners</a>
            </div>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-row">
              <span>fb</span>
              <span>in</span>
              <span>wa</span>
              <span>ig</span>
            </div>
            <p className="legal">© 2025 HarmonyHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
