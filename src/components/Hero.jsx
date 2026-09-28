import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="scrapbook-hero">

      {/* BLURRED COUPLE BACKGROUND */}
      <div className="hero-background">
        <img
          src="/images/couple/jjj-bg.jpg"
          alt=""
        />
      </div>

      <div className="hero-overlay" />
      <div className="hero-grain" />

      {/* DECORATIONS */}
      <span className="scrap-heart heart-one">♡</span>
      <span className="scrap-heart heart-two">♡</span>
      <span className="scrap-heart heart-three">♡</span>

      <span className="scrap-star star-one">✦</span>
      <span className="scrap-star star-two">✧</span>

      <span className="side-writing side-writing-left">
        “Thank You, JingJing,
        <br />
        for Coming into My Life.” ♡
      </span>

      <span className="side-writing side-writing-right">
        “Our Dreams have come
        <br />
         True now, Phi.” ♡
      </span>

      {/* LEFT QUOTE */}
      <aside className="quote-paper quote-left">
        <span className="quote-mark">“</span>

        <p>
         I can do 100 Takes, 
          <br />
          Just don't Put Pressure
          <br />
          on Yourself.
        </p>

        <strong>— Jan ♡</strong>
      </aside>

      {/* JAN POLAROID */}
      <div className="hero-polaroid-wrap jan-hero-card">

        <span className="photo-tape purple-tape">
          ♡
        </span>

        <Link to="/jan" className="hero-polaroid">
          <div className="hero-photo">
            <img
              src="/images/jan/jan-hero.jpg"
              alt="Jan"
            />

            <span className="photo-heart">
              ♡
            </span>
          </div>

          <div className="polaroid-caption">
            Jan <span>♡</span>
          </div>
        </Link>

        <div className="actress-label jan-label">
          ACTRESS&nbsp;&nbsp; | &nbsp;&nbsp;GMMTV
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="hero-main">

        <span className="pair-badge">
          GMMTV • GL PAIR
        </span>

        <h1 className="hero-title">
          <span>Jan</span>

          <small>×</small>

          <span>JingJing</span>

          <i>♡</i>
        </h1>

        <p className="hero-tagline">
          two different worlds,
          <br />
          but the same heartbeat.
        </p>

        <div className="hero-buttons">
          <Link
            to="/together"
            className="scrap-btn scrap-btn-primary"
          >
            Explore Their Story
            <span>→</span>
          </Link>

          <Link
            to="/gallery"
            className="scrap-btn scrap-btn-outline"
          >
            Photo Archive
          </Link>
        </div>

        <a
  href="#girls"
  className="hero-scroll"
  aria-label="Go to The Girls section"
>
  <span>↓</span>
</a>

        <p className="hero-footer-line">
          GOOD PEOPLE, BEAUTIFUL STORIES ♡
        </p>

      </div>

      {/* JINGJING POLAROID */}
      <div className="hero-polaroid-wrap jingjing-hero-card">

        <span className="photo-tape pink-tape">
          ♡
        </span>

        <Link to="/jingjing" className="hero-polaroid">
          <div className="hero-photo">
            <img
              src="/images/jingjing/jingjing-hero1.jpg"
              alt="JingJing"
            />

            <span className="photo-star">
              ✦
            </span>
          </div>

          <div className="polaroid-caption">
            JingJing <span>✦</span>
          </div>
        </Link>

        <div className="actress-label jingjing-label">
          ACTRESS&nbsp;&nbsp; | &nbsp;&nbsp;GMMTV
        </div>
      </div>

      {/* RIGHT QUOTE */}
      <aside className="quote-paper quote-right">
        <span className="quote-mark">“</span>

        <p>
          "Phi, Then I'll Make 
          <br />
          Phi Happy Myself"
          <br />
          
        </p>

        <strong>— JingJing ♡</strong>
      </aside>

      {/* BOTTOM MEMORY PHOTOS */}

      <div className="memory-stack memory-left">
        <div className="memory-photo memory-photo-back">
          <img
            src="/images/couple/jjj-01.jpg"
            alt=""
          />
        </div>

        <div className="memory-photo memory-photo-front">
          <img
            src="/images/couple/jjj-02.jpg"
            alt=""
          />
        </div>

        <span>
          real moments
          <br />
          real you ♡
        </span>
      </div>

      <div className="memory-stack memory-right">
        <div className="memory-photo memory-photo-back">
          <img
            src="/images/couple/jjj-03.jpg"
            alt=""
          />
        </div>

        <div className="memory-photo memory-photo-front">
          <img
            src="/images/couple/jjj-08.jpg"
            alt=""
          />
        </div>

        <span>
          JanJingJing
          <br />
          forever ♡
        </span>
      </div>

    </section>
  )
}

export default Hero