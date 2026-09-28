import { Link } from "react-router-dom"

function TheGirls() {
  return (
    <section 
    id="girls"
    className="girls-section">

      {/* SECTION HEADER */}
      <div className="girls-heading">
        <p className="girls-kicker">01 / THE GIRLS</p>

        <h2>
          Two identities,
          <br />
          <em>one beautiful story.</em>
        </h2>

        <p className="girls-heading-note">
          get to know them individually ♡
        </p>
      </div>


      {/* JAN + JINGJING */}
      <div className="girls-grid">

        {/* =========================
            JAN
        ========================== */}
        <article className="girl-profile girl-profile-jan">

          <div className="girl-number">01</div>

          <div className="girl-photo-wrap">
            <span className="girl-tape jan-girl-tape">
              ♡
            </span>

            <div className="girl-photo-frame">
              <img
                src="/images/jan/jan-prof.jpg"
                alt="Jan"
              />
            </div>

            <span className="girl-photo-doodle jan-photo-doodle">
              ♡
            </span>

            <span className="girl-photo-note jan-photo-note">
              💜🦊
            </span>
          </div>


          <div className="girl-info">
            <div className="girl-name-row">
              <div>
                <p className="girl-role jan-role">
                  ACTRESS • SINGER
                </p>

                <h3>Jan</h3>
              </div>

              <span className="girl-symbol jan-symbol">
                ♡
              </span>
            </div>

            <p className="girl-description">
              Explore Jan's journey, acting projects,
              achievements, appearances, memorable
              moments, and her growing story as an artist.
            </p>

            <Link
              to="/jan"
              className="girl-link jan-link"
            >
              View Jan's Portfolio
              <span>→</span>
            </Link>
          </div>
        </article>


        {/* =========================
            CENTER COUPLE CARD
        ========================== */}
        <div className="girls-couple">

          <span className="couple-mini-heart">
            ♡
          </span>

          <p className="couple-kicker">
            TOGETHER
          </p>

          <div className="couple-mini-photo">
            <span className="couple-mini-tape">
              JAN × JINGJING
            </span>

            <img
              src="/images/couple/jjj-01.jpg"
              alt="Jan and JingJing"
            />
          </div>

          <span className="couple-handwriting">
            better together ♡
          </span>

          <h3>
            Jan
            <span> × </span>
            JingJing
          </h3>

         <p className="couple-project">
           {/*Enemies With Benefits*/}
          </p>

          <p className="couple-company">
            {/*GMMTV ORIGINAL SERIES*/}
          </p> 

          <Link
            to="/together"
            className="couple-link"
          >
            Explore Them
            <span>→</span>
          </Link>

        </div>


        {/* =========================
            JINGJING
        ========================== */}
        <article className="girl-profile girl-profile-jing">

          <div className="girl-number">02</div>

          <div className="girl-photo-wrap">
            <span className="girl-tape jing-girl-tape">
              ♡
            </span>

            <div className="girl-photo-frame">
              <img
                src="/images/jingjing/jing-prof1.jpg"
                alt="JingJing"
              />
            </div>

            <span className="girl-photo-doodle jing-photo-doodle">
              ✦
            </span>

            <span className="girl-photo-note jing-photo-note">
              🎀🐯
            </span>
          </div>


          <div className="girl-info">
            <div className="girl-name-row">
              <div>
                <p className="girl-role jing-role">
                  ACTRESS • DANCER
                </p>

                <h3>JingJing</h3>
              </div>

              <span className="girl-symbol jing-symbol">
                ✦
              </span>
            </div>

            <p className="girl-description">
              Discover JingJing's acting journey,
              achievements, appearances, projects,
              photo archive, and the moments that
              define her as an artist.
            </p>

            <Link
              to="/jingjing"
              className="girl-link jing-link"
            >
              View JingJing's Portfolio
              <span>→</span>
            </Link>
          </div>

        </article>

      </div>


      {/* BOTTOM DECORATIVE LINE */}
      <div className="girls-divider">
        <span></span>
        <p>JJJ ♡</p>
        <span></span>
      </div>

    </section>
  )
}

export default TheGirls