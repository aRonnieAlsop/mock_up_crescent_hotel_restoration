import "./App.css";

const asset = (name) => `${import.meta.env.BASE_URL}${name}`;

const bookingUrl =
  "https://app.mews.com/distributor/4b6eaa0c-7e6c-48c5-a8c3-b42d009d25a8";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=The+Crescent+Hotel+Crescent+Mills+California";

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

function App() {
  return (
    <>
      <header className="site-header">
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-stay" href="#stay">
            Stay
          </a>

          <a className="nav-visit" href="#history">
            Visit
          </a>

          <a className="hotel-name" href="#home">
            The Crescent Hotel
          </a>

          <a className="nav-eat" href="#next-chapter">
            Eat
          </a>

          <a className="nav-events" href="#next-chapter">
            Events
          </a>

          <a
            className="map-link"
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Find The Crescent Hotel on a map"
          >
            <MapIcon />
          </a>
        </nav>
      </header>

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
            <VideoInlay />
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
            <VideoInlay />
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