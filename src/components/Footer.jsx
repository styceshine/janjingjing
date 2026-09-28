import {
  Link,
} from "react-router-dom"


function Footer() {

  return (

    <footer className="site-footer">


      {/* ==================================================
          TOP
      ================================================== */}

      <div className="footer-top">


        {/* ==================================================
            BRAND
        ================================================== */}

        <div className="footer-brand">

          <div
            className="footer-logo"
            aria-hidden="true"
          >
            ∞
          </div>


          <h2>
            Jan × JingJing
          </h2>


          <p>
            A fan-made archive celebrating their work,
            milestones, memories, and everything in between.
          </p>


          <span className="footer-handwriting">
            made with love ♡
          </span>

        </div>



        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <div className="footer-nav">


          {/* EXPLORE */}

          <div>

            <p className="footer-nav-title">
              EXPLORE
            </p>


            <Link to="/">
              Home
            </Link>


            <Link to="/together">
              Together
            </Link>


            <Link to="/gallery">
              Gallery
            </Link>


            <Link to="/schedule">
              Schedule
            </Link>

          </div>



          {/* THE GIRLS */}

          <div>

            <p className="footer-nav-title">
              THE GIRLS
            </p>


            <Link
              to="/jan"
              className="footer-jan-link"
            >
              Jan 💜
            </Link>


            <Link
              to="/jingjing"
              className="footer-jing-link"
            >
              JingJing 🎀
            </Link>

          </div>



          {/* ARCHIVE */}

          <div>

            <p className="footer-nav-title">
              ARCHIVE
            </p>


            <Link to="/jan#works">
              Filmography
            </Link>


            <Link to="/together">
              Their Story
            </Link>


            <Link to="/gallery">
              Photo Archive
            </Link>


            <Link to="/schedule">
              Latest Updates
            </Link>

          </div>

        </div>

      </div>



      {/* ==================================================
          LOVE LINE
      ================================================== */}

      <div className="footer-love-line">

        <span>
          JAN 💜
        </span>


        <div className="footer-line">

          <span />

          <strong>
            ♡
          </strong>

          <span />

        </div>


        <span>
          JINGJING 🎀
        </span>

      </div>



      {/* ==================================================
          FAN SITE NOTICE
      ================================================== */}

      <div
        className="footer-fan-notice"
        role="note"
        aria-label="Unofficial fan site disclaimer"
      >

        <span className="footer-fan-notice__kicker">
          UNOFFICIAL FAN ARCHIVE
        </span>


        <p>
          JanJingJing is an independent fan-made archive
          created in appreciation of Jan Ployshompoo and
          JingJing Prariyapit. This website is not affiliated
          with, endorsed by, or officially connected to the
          artists, GMMTV, or their representatives.
        </p>


        <p className="footer-fan-notice__rights">
          Images, videos, trademarks, names, and other media
          remain the property of their respective owners.
          Sources and credits are acknowledged where available.
        </p>

      </div>



      {/* ==================================================
          BOTTOM
      ================================================== */}

      <div className="footer-bottom">

        <p className="footer-bottom-label">
          FAN-MADE JANJINGJING ARCHIVE
        </p>


        <p className="footer-bottom-love">
          created for archival & fan appreciation ♡
        </p>


        {/*<p className="footer-signature">
          JJJ 🦊 × 🐯
        </p>*/}

        <p className="footer-signature">
          JJJ 🦊 × 🐯 x stays
        </p>

      </div>

    </footer>

  )

}


export default Footer