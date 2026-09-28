import {
  useEffect,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import {
  supabase,
} from "../../lib/supabase"

import "../../styles/pages/AdminDashboard.css"


function AdminDashboard() {

  const navigate =
    useNavigate()


  /* ==================================================
     DASHBOARD STATS
  ================================================== */

  const [
    stats,
    setStats,
  ] =
    useState({
      events: 0,
      photos: 0,
      charms: 0,
    })


  const [
    statsLoading,
    setStatsLoading,
  ] =
    useState(true)


  /* ==================================================
     LOAD DASHBOARD STATS
  ================================================== */

  useEffect(
    () => {

      let active =
        true


      const loadStats =
        async () => {

          setStatsLoading(
            true
          )


          try {

            const [
              eventsResult,
              galleryResult,
              reactionsResult,
            ] =
              await Promise.all([

                /* ======================================
                   EVENTS COUNT
                ====================================== */

                supabase
                  .from(
                    "events"
                  )
                  .select(
                    "*",
                    {
                      count:
                        "exact",

                      head:
                        true,
                    }
                  ),


                /* ======================================
                   GALLERY COUNT
                ====================================== */

                supabase
                  .from(
                    "gallery_photos"
                  )
                  .select(
                    "*",
                    {
                      count:
                        "exact",

                      head:
                        true,
                    }
                  ),


                /* ======================================
                   FAN PULSE COUNTS
                ====================================== */

                supabase
                  .from(
                    "fan_reactions"
                  )
                  .select(
                    "count"
                  )
                  .eq(
                    "target_type",
                    "fan_pulse"
                  )
                  .eq(
                    "target_id",
                    "janjingjing"
                  ),

              ])


            /* ==========================================
               CHECK ERRORS
            ========================================== */

            if (
              eventsResult.error
            ) {

              throw eventsResult.error

            }


            if (
              galleryResult.error
            ) {

              throw galleryResult.error

            }


            if (
              reactionsResult.error
            ) {

              throw reactionsResult.error

            }


            /* ==========================================
               TOTAL FAN CHARMS
            ========================================== */

            const totalCharms =
              (
                reactionsResult.data ||
                []
              ).reduce(
                (
                  total,
                  row
                ) =>
                  total +
                  (
                    Number(
                      row.count
                    ) || 0
                  ),
                0
              )


            /* ==========================================
               SAVE STATS
            ========================================== */

            if (
              active
            ) {

              setStats({
                events:
                  eventsResult.count ||
                  0,

                photos:
                  galleryResult.count ||
                  0,

                charms:
                  totalCharms,
              })


              setStatsLoading(
                false
              )

            }

          }

          catch (
            error
          ) {

            console.error(
              "Dashboard stats error:",
              error
            )


            if (
              active
            ) {

              setStatsLoading(
                false
              )

            }

          }

        }


      loadStats()


      return () => {

        active =
          false

      }

    },
    []
  )


  /* ==================================================
     LOGOUT
  ================================================== */

  const handleLogout =
    async () => {

      await supabase.auth.signOut()


      navigate(
        "/admin/login",
        {
          replace: true,
        }
      )

    }


  /* ==================================================
     RENDER
  ================================================== */

  return (

    <main className="admin-dashboard">


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="admin-sidebar">


        <div className="admin-sidebar__top">


          {/* BRAND */}

          <button
            type="button"
            className="admin-sidebar__brand"
            onClick={() =>
              navigate("/")
            }
          >

            <span className="admin-sidebar__brand-mark">
              ♡
            </span>


            <span className="admin-sidebar__brand-copy">

              <strong>
                JANJINGJING
              </strong>

              <small>
                ARCHIVE ADMIN
              </small>

            </span>

          </button>


          {/* ==================================================
              NAVIGATION
          ================================================== */}

          <nav
            className="admin-sidebar__nav"
            aria-label="Admin navigation"
          >


            {/* DASHBOARD */}

            <button
              type="button"
              className="admin-sidebar__link is-active"
            >

              <span>
                00
              </span>

              Dashboard

            </button>


            {/* SCHEDULE */}

            <button
              type="button"
              className="admin-sidebar__link"
              onClick={() =>
                navigate(
                  "/admin/schedule"
                )
              }
            >

              <span>
                01
              </span>

              Schedule

            </button>


            {/* GALLERY */}

            <button
              type="button"
              className="admin-sidebar__link"
              onClick={() =>
                navigate(
                  "/admin/gallery"
                )
              }
            >

              <span>
                02
              </span>

              Gallery

            </button>


            {/* FAN PULSE */}

            <button
              type="button"
              className="admin-sidebar__link"
              onClick={() =>
                navigate(
                  "/admin/fan-pulse"
                )
              }
            >

              <span>
                03
              </span>

              Fan Pulse

            </button>

          </nav>

        </div>


        {/* ==================================================
            SIDEBAR BOTTOM
        ================================================== */}

        <div className="admin-sidebar__bottom">


          <button
            type="button"
            className="admin-sidebar__view-site"
            onClick={() =>
              navigate("/")
            }
          >

            VIEW PUBLIC SITE

            <span>
              ↗
            </span>

          </button>


          <button
            type="button"
            className="admin-sidebar__logout"
            onClick={
              handleLogout
            }
          >

            SIGN OUT

          </button>

        </div>

      </aside>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <section className="admin-main">


        {/* ==================================================
            TOP BAR
        ================================================== */}

        <header className="admin-topbar">

          <div>

            <p>
              PRIVATE ARCHIVE
            </p>

            <span>
              JanJingJing Administration
            </span>

          </div>


          <div className="admin-topbar__status">

            <span
              className="admin-topbar__status-dot"
              aria-hidden="true"
            />

            SUPABASE CONNECTED

          </div>

        </header>


        {/* ==================================================
            WELCOME
        ================================================== */}

        <section className="admin-welcome">

          <div>

            <p className="admin-eyebrow">
              00 / DASHBOARD
            </p>


            <h1>

              Welcome to the

              <span>
                archive.
              </span>

            </h1>

          </div>


          <p className="admin-welcome__description">

            Manage schedules, gallery uploads,
            and view the JanJingJing Fan Pulse
            from one private workspace.

          </p>

        </section>


        {/* ==================================================
            LIVE OVERVIEW
        ================================================== */}

        <section className="admin-overview">


          {/* EVENTS */}

          <article className="admin-stat">

            <span className="admin-stat__number">

              {
                statsLoading
                  ? "—"
                  : stats.events.toLocaleString()
              }

            </span>


            <div>

              <p>
                EVENTS
              </p>

              <span>
                Schedule records
              </span>

            </div>

          </article>


          {/* GALLERY */}

          <article className="admin-stat">

            <span className="admin-stat__number">

              {
                statsLoading
                  ? "—"
                  : stats.photos.toLocaleString()
              }

            </span>


            <div>

              <p>
                GALLERY PHOTOS
              </p>

              <span>
                Uploaded memories
              </span>

            </div>

          </article>


          {/* FAN PULSE */}

          <article className="admin-stat">

            <span className="admin-stat__number">

              {
                statsLoading
                  ? "—"
                  : stats.charms.toLocaleString()
              }

            </span>


            <div>

              <p>
                FAN PULSE
              </p>

              <span>
                💜 🦊 🥚 🩷 🎀 🐯
              </span>

            </div>

          </article>

        </section>


        {/* ==================================================
            CONTENT MANAGEMENT
        ================================================== */}

        <section className="admin-managers">


          <div className="admin-section-heading">

            <div>

              <p>
                CONTENT MANAGEMENT
              </p>


              <h2>

                What would you like

                <span>
                  to update?
                </span>

              </h2>

            </div>


            <span className="admin-section-heading__note">
              SELECT A SECTION
            </span>

          </div>


          <div className="admin-manager-grid">


            {/* ==================================================
                SCHEDULE
            ================================================== */}

            <article
              className="
                admin-manager-card
                admin-manager-card--schedule
              "
            >

              <div className="admin-manager-card__top">

                <span className="admin-manager-card__number">
                  01
                </span>

                <span className="admin-manager-card__icon">
                  ◷
                </span>

              </div>


              <div className="admin-manager-card__content">

                <p>
                  SCHEDULE MANAGER
                </p>


                <h3>

                  Events &

                  <span>
                    appearances.
                  </span>

                </h3>


                <p className="admin-manager-card__description">

                  Add upcoming events, update venues,
                  change dates, upload event posters,
                  publish schedules, or mark events
                  cancelled and postponed.

                </p>

              </div>


              <div className="admin-manager-card__features">

                <span>
                  ADD EVENT
                </span>

                <span>
                  EDIT
                </span>

                <span>
                  DELETE
                </span>

                <span>
                  PUBLISH
                </span>

              </div>


              <button
                type="button"
                className="admin-manager-card__button"
                onClick={() =>
                  navigate(
                    "/admin/schedule"
                  )
                }
              >

                <span>
                  OPEN SCHEDULE MANAGER
                </span>

                <span>
                  →
                </span>

              </button>

            </article>


            {/* ==================================================
                GALLERY
            ================================================== */}

            <article
              className="
                admin-manager-card
                admin-manager-card--gallery
              "
            >

              <div className="admin-manager-card__top">

                <span className="admin-manager-card__number">
                  02
                </span>

                <span className="admin-manager-card__icon">
                  ◫
                </span>

              </div>


              <div className="admin-manager-card__content">

                <p>
                  GALLERY MANAGER
                </p>


                <h3>

                  Photos &

                  <span>
                    memories.
                  </span>

                </h3>


                <p className="admin-manager-card__description">

                  Upload new photos, choose Jan,
                  JingJing or Together, assign categories
                  and eras, add credits, and manage
                  published images.

                </p>

              </div>


              <div className="admin-manager-card__features">

                <span>
                  UPLOAD
                </span>

                <span>
                  CATEGORY
                </span>

                <span>
                  CREDIT
                </span>

                <span>
                  DELETE
                </span>

              </div>


              <button
                type="button"
                className="admin-manager-card__button"
                onClick={() =>
                  navigate(
                    "/admin/gallery"
                  )
                }
              >

                <span>
                  OPEN GALLERY MANAGER
                </span>

                <span>
                  →
                </span>

              </button>

            </article>


            {/* ==================================================
                FAN PULSE
            ================================================== */}

            <article
              className="
                admin-manager-card
                admin-manager-card--fan-pulse
              "
            >

              <div className="admin-manager-card__top">

                <span className="admin-manager-card__number">
                  03
                </span>

                <span className="admin-manager-card__icon">
                  ♡
                </span>

              </div>


              <div className="admin-manager-card__content">

                <p>
                  FAN PULSE
                </p>


                <h3>

                  Charms &

                  <span>
                    reactions.
                  </span>

                </h3>


                <p className="admin-manager-card__description">

                  View the anonymous charms visitors
                  have left for Jan and JingJing,
                  including individual reaction counts
                  and the overall Fan Pulse total.

                </p>

              </div>


              <div className="admin-manager-card__features">

                <span>
                  💜 JAN
                </span>

                <span>
                  🩷 JINGJING
                </span>

                <span>
                  VIEW COUNTS
                </span>

                <span>
                  READ ONLY
                </span>

              </div>


              <button
                type="button"
                className="admin-manager-card__button"
                onClick={() =>
                  navigate(
                    "/admin/fan-pulse"
                  )
                }
              >

                <span>
                  OPEN FAN PULSE
                </span>

                <span>
                  →
                </span>

              </button>

            </article>

          </div>

        </section>


        {/* ==================================================
            FUTURE FEATURES
        ================================================== */}

        <section className="admin-future">

          <p className="admin-future__eyebrow">
            COMING LATER
          </p>


          <div className="admin-future__items">

            <span>
              ✦ JEWEL INTERACTIONS
            </span>

            <span>
              ◉ FAN SPACE
            </span>

            <span>
              🌙 DARK MODE
            </span>

            <span>
              TH / EN
            </span>

          </div>

        </section>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="admin-footer">

          <span>
            JANJINGJING
          </span>

          <span>
            PRIVATE ADMIN WORKSPACE ♡
          </span>

        </footer>

      </section>

    </main>

  )

}


export default AdminDashboard