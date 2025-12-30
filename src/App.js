import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

const scopeServices = [
  {
    title: 'General Consultations',
    iconSrc: 'https://cdn.lordicon.com/nieymnen.json',
    fallback: 'GC',
  },
  {
    title: "Women's Health",
    iconSrc: 'https://cdn.lordicon.com/tcauouay.json',
    trigger: 'hover',
    colors: 'primary:#f9c9c0,secondary:#324b43,tertiary:#b26836,quaternary:#ebe6ef',
    fallback: 'WH',
  },
  {
    title: "Men's Health",
    iconSrc: 'https://cdn.lordicon.com/dyfvgeqj.json',
    fallback: 'MH',
  },
  {
    title: 'Minor Procedures',
    iconSrc: 'https://cdn.lordicon.com/gjitbpzd.json',
    fallback: 'MP',
  },
];

const serviceDetails = [
  {
    title: 'General Consultations',
    description:
      'Your everyday health matters. Our general care services provide accessible consultations, screenings, and treatment to keep you and your family well.',
    items: [
      'Consultation: From R400',
      'Screening Tests (BP/Sugar)',
      'Injections',
      'Rapid Tests (HIV/STI)',
      'Forms',
      'Wound Care',
      'Removal of Stitches',
      'Nebulisation',
    ],
    image: '/about.webp',
  },
  {
    title: "Women's Health",
    description:
      'Dedicated to women&apos;s wellbeing with personalised care and preventive screenings.',
    items: ['Consultation', 'Pap Smear', 'Family Planning'],
    image: '/nurse.webp',
  },
  {
    title: "Men's Health",
    description:
      'Focused on men&apos;s unique health needs with early detection and long-term wellness care.',
    items: ['Consultation', 'Prostate Screening'],
    image: '/doctor-consultation.webp',
  },
  {
    title: 'Minor Procedures',
    description:
      'Safe and professional treatment for small but important medical needs.',
    items: ['For detailed prices, please enquire at the clinic.'],
    image: '/micro-procedure.webp',
  },
];

const serviceGuideCategories = [
  {
    id: "all-services",
    title: "Service Guide",
    items: [
      {
        title: "General Consultations & Care",
        image: "/medic-checkup.webp",
        details: [
          "Medical consultations",
          "Blood pressure (BP) screening",
          "Blood sugar screening",
          "Injections",
          "Rapid testing (HIV / STI)",
          "Medical forms completion",
          "Wound care",
          "Removal of stitches",
          "Nebulisation",
        ],
      },
      {
        title: "Women's Health Services",
        image: "/women.webp",
        details: [
          "Medical consultations",
          "Pap smear screening",
          "Family planning services",
        ],
      },
      {
        title: "Men's Health Services",
        image: "/men.webp",
        details: ["Medical consultations", "Prostate screening"],
      },
      {
        title: "Minor Medical Procedures",
        image: "/micro-procedure.webp",
        details: ["Minor medical procedures (prices available on enquiry)"],
      },
    ],
  },
];

const leadershipTeam = [
  {
    // name: 'Dr Doris Nyembwe',
    // role: 'Medical Lead MP 0725935',
    image: '/R390-1024x1024.png',
  },
];

function ServiceGuideCarousel({ items, onBook }) {
  const trackRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const handleBook = onBook || (() => {});

  const recalcPages = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0];
    const gap = Number.parseFloat(window.getComputedStyle(el).gap || '0') || 0;
    const itemWidth = first ? first.getBoundingClientRect().width : el.clientWidth;
    const step = Math.max(1, itemWidth + gap);
    const visibleCount = Math.max(1, Math.floor((el.clientWidth + gap) / step));
    const count = Math.max(1, items.length - visibleCount + 1);
    setPageCount(count);

    const nextIndex = Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setPageIndex(nextIndex);
  }, [items.length]);

  useEffect(() => {
    recalcPages();
    window.addEventListener('resize', recalcPages);
    return () => window.removeEventListener('resize', recalcPages);
  }, [recalcPages]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0];
    const gap = Number.parseFloat(window.getComputedStyle(el).gap || '0') || 0;
    const itemWidth = first ? first.getBoundingClientRect().width : el.clientWidth;
    const step = Math.max(1, itemWidth + gap);
    setPageIndex(Math.min(pageCount - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  const scrollToPage = (next) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0];
    const gap = Number.parseFloat(window.getComputedStyle(el).gap || '0') || 0;
    const itemWidth = first ? first.getBoundingClientRect().width : el.clientWidth;
    const step = Math.max(1, itemWidth + gap);
    const target = Math.max(0, Math.min(next, pageCount - 1));
    el.scrollTo({ left: target * step, behavior: 'smooth' });
  };

  return (
    <div className="service-carousel">
      <button
        type="button"
        className="carousel-arrow left"
        onClick={() => scrollToPage(pageIndex - 1)}
        aria-label="Previous services"
      >
        �
      </button>
      <div className="service-carousel-track" ref={trackRef} onScroll={handleScroll}>
        {items.map((item) => (
          <article
            key={item.title}
            className="guide-card"
            style={{ '--guide-image': `url(${item.image})` }}
          >
            <div className="guide-card-image" aria-hidden="true" />
            <div className="guide-card-body">
              <h4>{item.title}</h4>
              {item.price ? <p className="guide-card-price">{item.price}</p> : null}
              <ul className="guide-card-list">
                {item.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <button className="pill guide-booking" type="button" onClick={handleBook}>
                Make a Booking
              </button>
            </div>
          </article>
        ))}
      </div>
      <button
        type="button"
        className="carousel-arrow right"
        onClick={() => scrollToPage(pageIndex + 1)}
        aria-label="Next services"
      >
        �
      </button>
      <div className="carousel-dots" aria-hidden="true">
        {Array.from({ length: pageCount }).map((_, i) => (
          <span key={i} className={`dot ${i === pageIndex ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

const aboutCards = [
  {
    title: 'Quality Care',
    image:
      '/AdobeStock_211045328.webp',
  },
  {
    title: 'Patient Focused',
    image:
      '/AdobeStock_138524993.webp',
  },
  {
    title: 'Accessible Care',
    image:
      '/AdobeStock_499543937.webp',
  },
];

const medicalLead = {
  name: 'Dr Doris Nyembwe',
  registration: 'MP 0725935',
  qualifications: [
    'MBCHB (UNILU)',
    'PGDip Infection Control (Stell)',
    'PGDip TB-HIV Management (UCT)',
    'MSc Public Health (UCT)',
  ],
};

const contactCards = [
  {
    title: 'Send us an email',
    action: 'Email us',
    href: 'mailto:clinic@harmonyhealthhub.com',
    subtitle: 'clinic@harmonyhealthhub.com',
    image: '/email.jpeg',
  },
  {
    title: 'WhatsApp or Call us',
    action: 'WhatsApp',
    href: 'https://wa.me/27799145367',
    subtitle: 'Phone: 079 914 5367',
    image: '/whatsap.jpeg',
  },
  {
    title: 'Head Office',
    action: 'View on Maps',
    href: 'https://maps.google.com/?q=Unit%2029,%20Frazzitta%20Business%20Park%20Cnr%20of%20Koeberg%20Road%20%26%20Freedomway,%20Milnerton,%207441',
    subtitle:
      'Unit 29 Freedom Way, Milnerton, Cape Town, 7441',
    image:
      'https://images.unsplash.com/photo-1485841890310-6a055c88698a?auto=format&fit=crop&w=1200&q=80',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [modalItem, setModalItem] = useState(null);

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
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleNav = (target) => {
    setMenuOpen(false);
    if (target === 'contact') {
      setPage('contact');
      return;
    }
    if (target === 'services') {
      setPage('services');
      return;
    }
    if (target === 'about') {
      setPage('about');
      return;
    }
    setPage('home');
    const id = target === 'about' ? 'about' : 'hero';
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <button type="button" className="brand-button" onClick={() => handleNav('home')}>
            <div className="brand">
              <img src="/header-logo.png" alt="Harmony Health" />
            </div>
          </button>
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
            <button type="button" onClick={() => handleNav('home')}>
              Home
            </button>
            <button type="button" onClick={() => handleNav('services')}>
              Services
            </button>
            <button type="button" onClick={() => handleNav('about')}>
              About
            </button>
          <button type="button" onClick={() => handleNav('contact')}>
            Contact
          </button>
        </nav>
          <button
            type="button"
            className="pill primary booking-btn"
            onClick={() => handleNav('contact')}
          >
            Make a Booking
          </button>
        </div>
      </header>

      <main>
        {page === 'home' ? (
          <>
        <section id="hero" className="hero">
          <div className="hero-copy" data-reveal>
            <div className="price-pill">Consultation: From R400</div>
            <h1>
              HARMONY HEALTH HUB
              <span>Because Your Health Matters Most</span>
            </h1>
            <p>
              Accessible primary healthcare with compassionate care and
              professional service.
            </p>
            <div className="hero-actions">
              <button className="pill primary" type="button" onClick={() => handleNav('contact')}>
                Make a Booking
              </button>
              <button className="pill ghost" type="button" onClick={() => handleNav('services')}>
                View All Services
              </button>
            </div>
          </div>
          <div className="hero-figure" data-reveal>
            
            <div
              className="team-photo"
              style={{ '--team-photo': 'url("/main.webp")' }}
            />
          </div>
        </section>

        <section id="services" className="section scope">
          <div className="section-heading" data-reveal>
            <h2>Our Services</h2>
            <p>
              General care, preventive screenings, and minor procedures
              delivered with respect, compassion, and dedication to your wellbeing.
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

        <section id="about" className="section about">
          <h2>About Us</h2>
          <p>
            We care for every patient with respect, compassion, and dedication to
            their wellbeing.
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
          <button className="pill ghost">Delivered with Compassion, Care, and Convenience.</button>
        </section>

          </>
        ) : page === 'services' ? (
          <section id="services-page" className="section services-page">
            <div className="section-heading" data-reveal>
              <h2>Our Services</h2>
              <p>
                Visiting your doctor is the first step of recovery when sick. Our
                services range to accommodate a host of different conditions.
              </p>
            </div>
            <div className="services-grid">
              {serviceDetails.map((service, index) => (
                <article
                  key={service.title}
                  className="services-card"
                  data-reveal
                  style={{
                    '--delay': `${index * 80}ms`,
                    '--service-image': `url(${service.image})`,
                  }}
                >
                  <div className="services-card-image" aria-hidden="true" />
                  <div className="services-card-body">
                    <div className="services-card-icon" aria-hidden="true">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 2h2v3h3v2h-3v3h-2V7H8V5h3V2Z"
                          fill="currentColor"
                        />
                        <path
                          d="M4.5 21a3.5 3.5 0 0 1-3.5-3.5V9.5A3.5 3.5 0 0 1 4.5 6H7v2H4.5A1.5 1.5 0 0 0 3 9.5v8A1.5 1.5 0 0 0 4.5 19H7v2H4.5Z"
                          fill="currentColor"
                          opacity="0.9"
                        />
                        <path
                          d="M19.5 21H17v-2h2.5A1.5 1.5 0 0 0 21 17.5v-8A1.5 1.5 0 0 0 19.5 8H17V6h2.5A3.5 3.5 0 0 1 23 9.5v8a3.5 3.5 0 0 1-3.5 3.5Z"
                          fill="currentColor"
                          opacity="0.9"
                        />
                      </svg>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <section id="service-details" className="section clinic-types">
              <div className="section-heading" data-reveal>
                <h2>Service Guide</h2>
                <p>For detailed prices, please enquire at the clinic.</p>
              </div>
              <div className="guide-grid">
                {serviceGuideCategories[0].items.map((item) => (
                  <article
                    key={item.title}
                    className="guide-card"
                    style={{ '--guide-image': `url(${item.image})` }}
                    onClick={() => setModalItem(item)}
                  >
                    <div className="guide-card-image" aria-hidden="true" />
                    <div className="guide-card-body">
                      <h4>{item.title}</h4>
                      <ul className="guide-card-list">
                        {item.details.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                      <button
                        className="pill guide-booking"
                        type="button"
                        onClick={() => handleNav('contact')}
                      >
                        Make a Booking
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          <div className="services-actions">
            <button className="pill ghost" type="button" onClick={() => handleNav('home')}>
              Back to Home
            </button>
            <button className="pill primary" type="button" onClick={() => handleNav('contact')}>
              Contact Us
            </button>
          </div>
        </section>
        ) : page === 'about' ? (
          <section id="about-page" className="section about-page">
            <div className="about-hero" data-reveal>
              <div className="about-hero-body">
                <p className="eyebrow">About Harmony Health Hub</p>
                <h2>Care that connects communities</h2>
                <p>
                  Harmony Health Hub is a patient-centred healthcare clinic dedicated to providing
                  accessible, affordable, and compassionate medical services for individuals and
                  families. Guided by the principle "Because Your Health Matters Most," the clinic
                  offers a wide range of services including general consultations, men's and women's
                  health care, preventive screenings, and minor medical procedures.
                </p>
                <p>
                  With a strong focus on early detection, wellness, and convenience, Harmony Health
                  Hub delivers personalised care in a safe and professional environment. Our
                  experienced healthcare team is committed to supporting patients at every stage of
                  life through quality medical services that prioritise comfort, dignity, and peace
                  of mind.
                </p>
                <button className="pill primary" type="button" onClick={() => handleNav('contact')}>
                  View Patient Focused
                </button>
              </div>
            </div>

            <div className="section-heading" data-reveal>
              <h2>Leadership</h2>
              <p>Guided by experienced clinical leadership dedicated to better outcomes.</p>
            </div>
            <div className="leadership-grid" data-reveal>
              {leadershipTeam.map((person) => (
                <article key={person.name} className="leader-card">
                  <div
                    className="leader-photo"
                    style={{ '--leader-image': `url(${person.image})` }}
                    aria-hidden="true"
                  />
                  <div className="leader-body">
                    <p className="leader-name">{person.name}</p>
                    <p className="leader-role">{person.role}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="medical-lead-card" data-reveal>
              <p className="medical-lead-eyebrow">Medical Lead</p>
              <h3>{medicalLead.name}</h3>
              <p className="medical-lead-reg">{medicalLead.registration}</p>
              <ul className="medical-lead-list">
                {medicalLead.qualifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section-heading" data-reveal>
              <h2>Quality Care in Focus</h2>
              <p>Snapshots from across our network highlighting the care we deliver.</p>
            </div>
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
          </section>
        ) : (
          <section id="contact-page" className="section contact-page">
            <div className="section-heading" data-reveal>
              <h2>Contact Us</h2>
              <p>
                Reach out by email, WhatsApp, or visit our head office. We will
                respond promptly to your request.
              </p>
            </div>
            <div className="contact-card-grid">
              {contactCards.map((card, index) => (
                <article
                  key={card.title}
                  className="contact-card"
                  data-reveal
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.6)), url(${card.image})`,
                    '--delay': `${index * 80}ms`,
                  }}
                >
                  <div className="contact-card-body">
                    <p className="eyebrow">{card.title}</p>
                    <h3>{card.subtitle}</h3>
                    <a className="pill primary" href={card.href} target="_blank" rel="noreferrer">
                      {card.action}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="contact-body">
              <div className="contact-form" data-reveal>
                <h3>Send us a message</h3>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <textarea placeholder="Message" rows={4} />
                <button className="pill primary" type="button">
                  Send Message
                </button>
              </div>
              <div className="contact-map" data-reveal>
                <iframe
                  title="HarmonyHealth Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1069.1693979682886!2d18.505683651152683!3d-33.871023575966674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5eba1de7f8dd%3A0xa587ed4ed0e09fa9!2sFrazzitta%20Business%20Park!5e0!3m2!1sen!2sza!4v1765999042710!5m2!1sen!2sza"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        )}
      </main>

      {modalItem ? (
        <div className="modal-backdrop" onClick={() => setModalItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>{modalItem.title}</h4>
              <button className="modal-close" type="button" onClick={() => setModalItem(null)}>
                �
              </button>
            </div>
            <div className="modal-body">
              <ul>
                {modalItem.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <button type="button" className="brand-button" onClick={() => handleNav('home')}>
              <div className="brand">
                <img src="/footer-logo.png" alt="Harmony Health" />
              </div>
            </button>
            <p>Better care. Better service. Better outcomes.</p>
            <p className="contact">
              clinic@harmonyhealthhub.com | 079 914 5367
              <br />
              Unit 29, Frazzitta Business Park, Milnerton, 7441
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <button type="button" onClick={() => handleNav('home')}>
                Home
              </button>
              <button type="button" onClick={() => handleNav('services')}>
                Services
              </button>
              <button type="button" onClick={() => handleNav('about')}>
                About
              </button>
              <button type="button" onClick={() => handleNav('contact')}>
                Contact
              </button>
            </div>
            <div>
              <h4>Network</h4>
              <button type="button" onClick={() => handleNav('home')}>
                Clinics
              </button>
              <button type="button" onClick={() => handleNav('home')}>
                Occupational
              </button>
              <button type="button" onClick={() => handleNav('home')}>
                Partners
              </button>
            </div>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-row">
              <a
                aria-label="WhatsApp"
                href="https://wa.me/27799145367"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20.4 3.6A11.79 11.79 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6l-1.7 6.2 6.34-1.66A11.96 11.96 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.6-8.4ZM12 21.9c-1.94 0-3.84-.52-5.5-1.5l-.4-.23-3.76.99 1-3.66-.25-.42A9.92 9.92 0 0 1 2.1 12C2.1 6.54 6.54 2.1 12 2.1c2.65 0 5.15 1.03 7.03 2.9A9.86 9.86 0 0 1 21.9 12c0 5.46-4.44 9.9-9.9 9.9Zm5.77-7.42c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.21.32-.85 1.05-1.04 1.27-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.74-1.79-1.01-2.45-.26-.63-.53-.54-.74-.55l-.63-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.15 3.09 1.31 3.3.16.21 2.26 3.46 5.47 4.85.76.33 1.35.52 1.82.66.77.24 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/share/17Pecz17VQ/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13.5 21V12.75H16.5L17 9.5H13.5V7.5C13.5 6.57 13.77 6 15.14 6H17V3.14C16.08 3.03 15.15 2.99 14.22 3C11.66 3 9.88 4.49 9.88 7.2V9.5H7V12.75H9.88V21H13.5Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/clinicharmonyhealth_/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                </svg>
              </a>
            </div>
            <p className="legal">(c) 2025 HarmonyHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
