import { Link } from "react-router-dom"

function FeaturedWork() {
  return (
    <section className="featured-work-section">

      {/* ================================
          SECTION HEADER
      ================================= */}
      <div className="featured-work-heading">

        <p className="featured-work-kicker">
          02 / FEATURED WORK
        </p>

        <h2>
          Their story,
          <br />
          <em>on screen.</em>
        </h2>

        <p className="featured-work-note">
          a special chapter in the JanJingJing archive ♡
        </p>

      </div>


      <div className="featured-work-shell">

        {/* ==================================
            DOUBLE POSTER SHOWCASE
        =================================== */}
        <div className="double-poster-frame">

          {/* scrapbook tape */}
          <span className="double-poster-tape poster-tape-purple">
            ♡
          </span>

          <span className="double-poster-tape poster-tape-pink">
            ✦
          </span>


          {/* JAN / LEFT POSTER */}
          <div className="poster-panel poster-panel-left">

            <img
              src="/images/works/ewb/cover-left.jpg"
              alt="Enemies With Benefits promotional poster"
            />

            <div className="poster-panel-shade" />

            <span className="poster-side-label jan-poster-label">
              JAN 💜
            </span>

          </div>


          {/* CENTER PAPER */}
          <div className="poster-center-paper">

            <span className="center-paper-note">
              more than
              <br />
              enemies ♡
            </span>

            <div className="center-paper-title">
              <span>JAN</span>

              <small>×</small>

              <span>JINGJING</span>
            </div>

            <div className="center-paper-heart">
              ♡
            </div>

            <p>
              GMMTV
              <br />
              SERIES
            </p>

            <span className="center-paper-flower">
              ❀
            </span>

          </div>


          {/* JINGJING / RIGHT POSTER */}
          <div className="poster-panel poster-panel-right">

            <img
              src="/images/works/ewb/cover-right.jpg"
              alt="Enemies With Benefits promotional poster"
            />

            <div className="poster-panel-shade" />

            <span className="poster-side-label jing-poster-label">
              JINGJING 🎀
            </span>

          </div>


          {/* SCRAPBOOK DOODLES */}
          <span className="double-poster-heart heart-poster-left">
            ♡
          </span>

          <span className="double-poster-star star-poster-left">
            ✦
          </span>

          <span className="double-poster-heart heart-poster-right">
            ♡
          </span>

          <span className="double-poster-star star-poster-right">
            ✦
          </span>


          {/* SMALL PAPER NOTES */}
          <span className="poster-paper-note poster-note-left">
            same chaos,
            <br />
            different hearts.
          </span>

          <span className="poster-paper-note poster-note-right">
            better together
            <br />
            always ♡
          </span>

        </div>


        {/* ==================================
            PROJECT INFORMATION
        =================================== */}
        <div className="featured-details-grid">

          <div className="featured-meta-card">

            <p className="featured-meta-label">
              PROJECT
            </p>

            <h4>
              Enemies With Benefits
            </h4>

            <div className="featured-meta-list">

              <div>
                <span>Type</span>
                <strong>GL Series</strong>
              </div>

              <div>
                <span>Production</span>
                <strong>GMMTV × Snap25</strong>
              </div>

              <div>
                <span>Pair</span>
                <strong>Jan × JingJing</strong>
              </div>

              <div>
                <span>Status</span>
                <strong> Completed</strong>
              </div>

            </div>

          </div>


          <div className="featured-description">

            <span className="featured-handwriting">
              one story, two hearts ♡
            </span>

            <h3>
              A defining project
              <br />
              for JanJingJing.
            </h3>

            <p>
              Discover
              <strong> Enemies With Benefits,</strong> a new chapter in Jan and JingJing’s journey together—from Lal and Wine’s
               on-screen romance to behind-the-scenes moments and shared milestones.
            </p>

            <Link
              to="/together"
              className="featured-work-button"
            >
              Explore The Series
              <span>→</span>
            </Link>

          </div>

        </div>


        {/* ==================================
            SERIES STILLS
        =================================== */}
        <div className="featured-stills">

          <div className="featured-still still-one">

            <span className="still-label">
              EPISODE 01
            </span>

            <img
              src="/images/works/ewb/scene-01.png"
              alt="Enemies With Benefits scene"
            />

          </div>


          <div className="featured-still still-two">

            <img
              src="/images/works/ewb/scene-05.png"
              alt="Jan and JingJing"
            />

            <span className="still-note">
              favorite moments ♡
            </span>

          </div>


          <div className="featured-still still-three">

            <span className="still-heart">
              ♡
            </span>

            <img
              src="/images/works/ewb/scene-06.png"
              alt="Enemies With Benefits scene"
            />

          </div>

        </div>


        {/* BOTTOM DIVIDER */}
        <div className="featured-bottom-note">

          <span />

          <p>
            ENEMIES WITH BENEFITS • JANJINGJING
          </p>

          <span />

        </div>

      </div>

    </section>
  )
}

export default FeaturedWork