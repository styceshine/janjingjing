import { Link } from "react-router-dom"

function PhotoDiary() {
  return (
    <section className="photo-diary-section">

      <div className="photo-diary-heading">
        <p className="photo-diary-kicker">
          04 / PHOTO DIARY
        </p>

        <h2>
          Little moments,
          <br />
          <em>kept forever.</em>
        </h2>

        <p className="photo-diary-note">
          a scrapbook of Jan, JingJing, and everything in between ♡
        </p>
      </div>


      <div className="photo-diary-grid">

        {/* =========================
            JAN LARGE PHOTO
        ========================== */}
        <article className="diary-card diary-card-jan">

          <span className="diary-tape diary-tape-purple">
            ♡
          </span>

          <img
            src="/images/jan/pic-14.jpg"
            alt="Jan"
          />

          <div className="diary-caption diary-caption-jan">
            <span>JAN</span>
            <p> 💜🦊</p>
          </div>

          <span className="diary-doodle diary-doodle-jan">
            ✦
          </span>

        </article>


        {/* =========================
            COUPLE TOP PHOTO
        ========================== */}
        <article className="diary-card diary-card-couple-top">

          <span className="diary-couple-label">
            JAN × JINGJING
          </span>

          <img
            src="/images/couple/jjj-07.jpg"
            alt="Jan and JingJing"
          />

          <span className="diary-handwriting">
            same stars ♡
          </span>

        </article>


        {/* =========================
            JINGJING LARGE PHOTO
        ========================== */}
        <article className="diary-card diary-card-jing">

          <span className="diary-tape diary-tape-pink">
            ♡
          </span>

          <img
            src="/images/jingjing/editorial/pic-54.jpg"
            alt="JingJing"
          />

          <div className="diary-caption diary-caption-jing">
            <span>JINGJING</span>
            <p> 🎀🐯</p>
          </div>

          <span className="diary-doodle diary-doodle-jing">
            ♡
          </span>

        </article>


        {/* =========================
            SMALL COUPLE PHOTO
        ========================== */}
        <article className="diary-card diary-card-couple-small">

          <img
            src="/images/couple/jjj-17.jpg"
            alt="Jan and JingJing"
          />

          <span className="small-photo-note">
            together, always ♡
          </span>

        </article>


        {/* =========================
            SMALL JAN PHOTO
        ========================== */}
        <article className="diary-card diary-card-jan-small">

          <img
            src="/images/jan/jan-04.jpg"
            alt="Jan"
          />

          <span className="small-photo-tag small-photo-tag-purple">
            her world
          </span>

        </article>


        {/* =========================
            SMALL JINGJING PHOTO
        ========================== */}
        <article className="diary-card diary-card-jing-small">

          <img
            src="/images/jingjing/jingjing-04.jpg"
            alt="JingJing"
          />

          <span className="small-photo-tag small-photo-tag-pink">
            her world
          </span>

        </article>

      </div>


      {/* =========================
          GALLERY ACTIONS
      ========================== */}
      <div className="photo-diary-actions">

        <Link
          to="/gallery"
          className="photo-diary-main-link"
        >
          Open Full Photo Archive
          <span>→</span>
        </Link>

        <div className="photo-diary-category-links">
          <Link to="/gallery?filter=jan">
            Jan 💜
          </Link>

          <span>•</span>

          <Link to="/gallery?filter=together">
            Together ♡
          </Link>

          <span>•</span>

          <Link to="/gallery?filter=jingjing">
            JingJing 🎀
          </Link>
        </div>

      </div>


      <div className="photo-diary-divider">
        <span />
        <p>
          memories, moments, and everything worth keeping ♡
        </p>
        <span />
      </div>

    </section>
  )
}

export default PhotoDiary