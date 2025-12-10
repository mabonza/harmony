import { useEffect, useState } from 'react';
import './App.css';

const scopeServices = [
  {
    title: "Women's Health",
    iconSrc: 'https://cdn.lordicon.com/tcauouay.json',
    trigger: 'hover',
    colors: 'primary:#f9c9c0,secondary:#324b43,tertiary:#b26836,quaternary:#ebe6ef',
    fallback: 'WH',
  },
  {
    title: 'General Health',
    iconSrc: 'https://cdn.lordicon.com/nieymnen.json',
    fallback: 'GH',
  },
  {
    title: 'Baby Clinic',
    iconSrc: 'https://cdn.lordicon.com/qpomhzjs.json',
    fallback: 'BC',
  },
  {
    title: 'HIV / STI',
    iconSrc: 'https://cdn.lordicon.com/qjjwhgag.json',
    fallback: 'HIV',
  },
  {
    title: 'Health & Wellness',
    iconSrc: 'https://cdn.lordicon.com/hjjjqufa.json',
    fallback: 'HW',
  },
  {
    title: 'Chronic Care',
    iconSrc: 'https://cdn.lordicon.com/dyfvgeqj.json',
    fallback: 'CC',
  },
  {
    title: 'Occupational',
    iconSrc: 'https://cdn.lordicon.com/tobsqthh.json',
    fallback: 'OC',
  },
  {
    title: 'Wound Care',
    iconSrc: 'https://cdn.lordicon.com/gjitbpzd.json',
    fallback: 'WC',
  },
];

const clinicTypes = [
  {
    title: 'Community Clinics',
    subtitle: 'Consultation + Medication',
    price: 'From R390',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Medirite Clinics',
    subtitle: 'Consultation + Script',
    price: 'From R270',
    image:
      'https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'DC Clinics',
    subtitle: 'On-site SLA Services',
    price: 'Managed care',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&sat=-60',
  },
];

const specialServices = [
  {
    title: 'IV Drip Therapy',
    subtitle: 'Drips from R350',
    image:
      'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'netclub',
    subtitle: 'Private ART Program',
    image:
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1200&q=80&sat=-50',
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

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
            <a href="#clinic-types">Clinics</a>
            <a href="#network">Network</a>
            <a href="#special">Special</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="pill primary booking-btn">Make a Booking</button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-copy" data-reveal>
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
          <div className="hero-figure" data-reveal>
            <div className="consultation-card">
              <span>Consultation</span>
              <strong>+</strong>
              <span>Medication</span>
            </div>
            <div
              className="team-photo"
              style={{ '--team-photo': 'url("/R390-1024x1024.png")' }}
            />
          </div>
        </section>

        <section id="services" className="section scope">
          <div className="section-heading" data-reveal>
            <h2>Scope of Services</h2>
            <p>
              Preventative, curative, chronic, occupational healthcare and wound
              care services for local communities and businesses.
            </p>
          </div>
          <div className="scope-grid">
            {scopeServices.map((item, index) => (
              <article
                key={item.title}
                className="scope-card"
                data-reveal
                style={{ '--delay': `${index * 60}ms` }}
              >
                <span className="scope-icon" aria-hidden="true">
                  <lord-icon
                    src={item.iconSrc}
                    trigger={item.trigger || 'loop'}
                    colors={item.colors || 'primary:#324b43,secondary:#f9c9c0'}
                    stroke="bold"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <span className="icon-fallback">{item.fallback}</span>
                </span>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="clinic-types" className="section clinic-types">
          <div className="section-heading" data-reveal>
            <h2>Clinic Types</h2>
            <p>
              We operate community clinics, Medirite clinics, and DC clinics
              across the network to meet different healthcare needs.
            </p>
          </div>
          <div className="clinic-grid">
            {clinicTypes.map((clinic, index) => (
              <article
                key={clinic.title}
                className="clinic-card"
                data-reveal
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${clinic.image})`,
                  '--delay': `${index * 80}ms`,
                }}
              >
                <div className="clinic-info">
                  <p className="eyebrow">{clinic.subtitle}</p>
                  <h3>{clinic.title}</h3>
                  <p className="price">{clinic.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="special" className="section special">
          <div className="section-heading" data-reveal>
            <h2>Special Services</h2>
            <p>
              Bespoke services at select clinics, including IV Drip Therapy and
              a private HIV/ART programme called netclub.
            </p>
          </div>
          <div className="special-grid">
            {specialServices.map((item, index) => (
              <article
                key={item.title}
                className="special-card"
                data-reveal
                style={{
                  backgroundImage: `url(${item.image})`,
                  '--delay': `${index * 100}ms`,
                }}
              >
                <div className="special-overlay" />
                <div className="special-info">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
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
          <div className="map-card" data-reveal>
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
            {aboutCards.map((card, index) => (
              <article
                key={card.title}
                className="about-card"
                data-reveal
                style={{
                  backgroundImage: `url(${card.image})`,
                  '--delay': `${index * 80}ms`,
                }}
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
            {partners.map((partner, index) => (
              <div
                key={partner}
                className="partner-chip"
                data-reveal
                style={{ '--delay': `${index * 50}ms` }}
              >
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
              info@harmonyhealth.co.za | 021 001 7024
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
            <p className="legal">(c) 2025 HarmonyHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
