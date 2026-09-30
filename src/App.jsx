import { useState } from "react";
import "./App.css";

const asset = (name) => `${import.meta.env.BASE_URL}${name}`;

const bookingUrl =
  "https://app.mews.com/distributor/4b6eaa0c-7e6c-48c5-a8c3-b42d009d25a8";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=The+Crescent+Hotel+Crescent+Mills+California";

const storeUrl = "https://www.crescenthotelandstore.com/";

const navigation = {
  stay: {
    label: "Stay",
    items: [
      { label: "HOTEL" },
      { label: "HUFF HOUSE" },
      { label: "STOREKEEPER'S QUARTERS" },
      { label: "RAILWAY COTTAGE" },
      { label: "BOOK NOW", href: bookingUrl },
    ],
  },
  visit: {
    label: "Visit",
    items: [
      { label: "Discover Indian Valley" },
      { label: "Beyond the Valley" },
      { label: "Activities & Attractions" },
    ],
  },
  eat: {
    label: "Eat",
    items: [
      { label: "RESTAURANT" },
      { label: "BAR" },
      { label: "The Crescent Store", href: storeUrl },
    ],
  },
  events: {
    label: "Events",
    items: [
      { label: "UPCOMING EVENTS" },
      { label: "HOST AN EVENT" },
      { label: "WEDDINGS" },
    ],
  },
};

function VideoInlay() {
  return (
    <video
      className="video-inlay"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={asset("landing.mp4")} type="video/mp4" />
    </video>
  );
}

function StillInlay() {
  return (
    <img
      className="still-inlay"
      src={asset("still.jpg")}
      alt="The Crescent Hotel"
      loading="lazy"
    />
  );
}

function MapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}

function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState(null);

  function handlePointerEnter(event, key) {
    if (event.pointerType === "mouse") {
      setActiveMenu(key);
    }
  }

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveMenu(null);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setActiveMenu(null);

      event.currentTarget
        .querySelector(`[data-nav-trigger="${activeMenu}"]`)
        ?.focus();
    }
  }

  function renderNavigationButton(key) {
    const menu = navigation[key];
    const isOpen = activeMenu === key;

    return (
      <button
        type="button"
        className={`nav-trigger nav-${key} ${
          isOpen ? "is-active" : ""
        }`}
        data-nav-trigger={key}
        aria-expanded={isOpen}
        aria-controls={`dropdown-${key}`}
        onPointerEnter={(event) => handlePointerEnter(event, key)}
        onClick={() => {
          setActiveMenu((current) => (current === key ? null : key));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveMenu(key);

            requestAnimationFrame(() => {
              document
                .getElementById(`dropdown-${key}`)
                ?.querySelector("a")
                ?.focus();
            });
          }
        }}
      >
        {menu.label}
      </button>
    );
  }

  return (
    <header
      className={`site-header ${activeMenu ? "has-open-menu" : ""}`}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setActiveMenu(null);
        }
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <nav className="main-nav" aria-label="Main navigation">
        {renderNavigationButton("stay")}
        {renderNavigationButton("visit")}

        <a
          className="hotel-name"
          href="#home"
          onClick={() => setActiveMenu(null)}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              setActiveMenu(null);
            }
          }}
        >
          The Crescent Hotel
        </a>

        {renderNavigationButton("eat")}
        {renderNavigationButton("events")}

        <a
          className="map-link"
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Find The Crescent Hotel on a map"
          onFocus={() => setActiveMenu(null)}
        >
          <MapIcon />
        </a>
      </nav>

      {Object.entries(navigation).map(([key, menu]) => (
        <div
          key={key}
          id={`dropdown-${key}`}
          className={`mega-dropdown mega-dropdown-${key}`}
          hidden={activeMenu !== key}
        >
          <div className="mega-dropdown-inner">
            <div className="mega-side-note">
              {key === "stay" && (
                <span className="mega-placeholder">Seasonal Offers</span>
              )}
            </div>

            <nav
              className={`mega-links mega-links-${key}`}
              aria-label={`${menu.label} options`}
            >
              {menu.items.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActiveMenu(null)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span key={item.label} className="mega-placeholder">
                    {item.label}
                  </span>
                )
              )}
            </nav>

            <div className="mega-faq">
              <span className="mega-placeholder">FAQs</span>
            </div>
          </div>
        </div>
      ))}
    </header>
  );
}

function App() {
  return (
    <>
      <SiteHeader />

      <main id="home">
        <section className="landing" aria-labelledby="landing-title">
          <VideoInlay />
          <div className="landing-shade" />

          <div className="landing-copy">
            <h1 id="landing-title">
              Lorem ipsum
              <br />
              dolor sit amet
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse vitae sapien vel justo dignissim consequat.
              Aliquam erat volutpat, sed viverra lorem.
            </p>

            <a className="text-link" href="#history">
              Discover the story
            </a>
          </div>
        </section>

        <section className="story-section" id="history">
          <div className="story-media">
            <StillInlay />
          </div>

          <div className="story-copy">
            <div className="copy-inner">
              <h2>Lorem ipsum dolor sit amet</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tincidunt, enim vitae malesuada consequat, velit
                neque facilisis sem, ut dignissim purus risus vel erat.
                Integer pellentesque justo vitae lectus posuere.
              </p>

              <p>
                Donec quis nibh sed mauris elementum tincidunt. Sed
                ullamcorper, ligula vitae consequat dignissim, sapien
                neque varius erat, vel fermentum justo ipsum vitae erat.
              </p>

              <p>
                Aliquam erat volutpat. Duis vitae nunc sed lorem
                consectetur commodo. Curabitur vel magna quis neque
                tincidunt volutpat a sed velit.
              </p>

              <a className="text-link" href="#next-chapter">
                Our next chapter
              </a>
            </div>
          </div>
        </section>

        <section
          className="story-section story-section-reverse"
          id="next-chapter"
        >
          <div className="story-media">
            <VideoInlay />
          </div>

          <div className="story-copy">
            <div className="copy-inner">
              <h2>Lorem ipsum dolor sit amet</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tincidunt, enim vitae malesuada consequat, velit
                neque facilisis sem, ut dignissim purus risus vel erat.
              </p>

              <p>
                Donec quis nibh sed mauris elementum tincidunt. Integer
                pellentesque justo vitae lectus posuere, a feugiat neque
                venenatis. Aliquam erat volutpat.
              </p>

              <div className="section-links">
                <a className="text-link" href="#stay">
                  Learn more
                </a>

                <a
                  className="text-link"
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section" id="stay">
          <div className="story-media">
            <StillInlay />
          </div>

          <div className="story-copy">
            <div className="copy-inner">
              <h2>Lorem ipsum dolor sit amet</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam vitae justo nec urna interdum consequat.
                Suspendisse potenti. Pellentesque habitant morbi
                tristique senectus et netus et malesuada.
              </p>

              <p>
                Curabitur vel magna quis neque tincidunt volutpat.
                Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia curae.
              </p>

              <a
                className="text-link"
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                Book a room
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-logo" href="#home">
          <img
            src={asset("logo.png")}
            alt="The Crescent Hotel"
            loading="lazy"
          />
        </a>

        <nav className="footer-links" aria-label="Hotel information">
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            Book a Room
          </a>
          <a href="#history">Our History</a>
          <a href="#next-chapter">The Restoration</a>
          <a href={mapUrl} target="_blank" rel="noreferrer">
            Find Us
          </a>
          <span className="footer-placeholder">FAQs</span>
        </nav>

        <nav className="footer-links" aria-label="Explore the hotel">
          <a href="#stay">Stay at The Crescent</a>
          <a href="#next-chapter">Dining & Events</a>
          <a href="#home">Back to the Top</a>
        </nav>

        <div className="footer-note">
          <h2>The next chapter</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aliquam vitae justo nec urna interdum consequat.
          </p>

          <a className="text-link" href="#next-chapter">
            Discover more
          </a>

          <p className="copyright">
            © {new Date().getFullYear()} The Crescent Hotel
            <br />
            Crescent Mills, California
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;