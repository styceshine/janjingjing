import Navbar from "../components/Navbar";
import MediaCarousel from "../components/MediaCarousel";
import ScheduleCard from "../components/ScheduleCard";
import Footer from "../components/Footer"

import {
  jingjingWorks,
  jingjingMusic,
  jingjingAchievements,
} from "../data/jingjingData";

import {
  useEffect,
  useMemo,
  useState,
} from "react"


import {
  supabase,
} from "../lib/supabase"


import {
  scheduleEvents,
  getUpcomingEvents,
  getEffectiveScheduleStatus,
  mapSupabaseScheduleEvent,
  mergeScheduleEvents,
} from "../data/scheduleData"

function JingJing() {
  /* ==================================================
     MUSIC DATA FOR THE SHARED MEDIA CAROUSEL
  ================================================== */

  const jingMusicCarousel = jingjingMusic.map((song) => ({
    ...song,
    role: `${song.artist} • ${song.project}`,
  }));

  




    /* ==================================================
     LIVE JINGJING SCHEDULE
     Local schedule + Supabase schedule
  ================================================== */

  const [
    databaseScheduleEvents,
    setDatabaseScheduleEvents,
  ] =
    useState([])


  /* ==================================================
     FETCH PUBLISHED EVENTS
  ================================================== */

  useEffect(
    () => {

      let active =
        true


      const loadSchedule =
        async () => {

          try {

            const {
              data,
              error,
            } =
              await supabase
                .from(
                  "events"
                )
                .select(
                  "*"
                )
                .eq(
                  "is_published",
                  true
                )
                .order(
                  "start_at",
                  {
                    ascending:
                      true,
                  }
                )


            if (
              error
            ) {

              throw error

            }


            const mappedEvents =
              (
                data ||
                []
              ).map(
                (row) => {

                  let posterUrl =
                    ""


                  if (
                    row.image_path
                  ) {

                    const {
                      data:
                        posterData,
                    } =
                      supabase
                        .storage
                        .from(
                          "schedule"
                        )
                        .getPublicUrl(
                          row.image_path
                        )


                    posterUrl =
                      posterData
                        ?.publicUrl ||
                      ""

                  }


                  return (
                    mapSupabaseScheduleEvent(
                      row,
                      posterUrl
                    )
                  )

                }
              )


            if (
              active
            ) {

              setDatabaseScheduleEvents(
                mappedEvents
              )

            }

          }

          catch (
            error
          ) {

            console.error(
              "Unable to load JingJing schedule:",
              error
            )

          }

        }


      loadSchedule()


      return () => {

        active =
          false

      }

    },
    []
  )


  /* ==================================================
     MERGE LOCAL + DATABASE
  ================================================== */

  const mergedScheduleEvents =
    useMemo(
      () =>
        mergeScheduleEvents(
          scheduleEvents,
          databaseScheduleEvents
        ),
      [
        databaseScheduleEvents,
      ]
    )


  /* ==================================================
     JINGJING UPCOMING EVENTS
  ================================================== */

  const jingUpcomingEvents =
    useMemo(
      () => {

        const upcoming =
          getUpcomingEvents(
            mergedScheduleEvents
          )


        return upcoming.filter(
          (event) => {

            const people =
              event.people ||
              event.artists ||
              []


            const status =
              getEffectiveScheduleStatus(
                event
              )


            return (
              people.includes(
                "jingjing"
              ) &&
              status !==
                "cancelled" &&
              status !==
                "postponed"
            )

          }
        )

      },
      [
        mergedScheduleEvents,
      ]
    )


  const nextJingEvent =
    jingUpcomingEvents[0] ||
    null










  return (
    <>
      <Navbar />

      <main className="jing-page">
        {/* ==================================================
            HERO
        ================================================== */}

        <section className="jing-hero">
          {/* Large decorative background text */}
          <div className="jing-hero-bg-text">JINGJING</div>

          <div className="jing-hero-grid">
            {/* ==================================================
                LEFT — EXPLORE JINGJING
            ================================================== */}

            <div className="jing-hero-side">
              <p className="jing-hero-side-label">EXPLORE JINGJING</p>

              <div className="jing-hero-index">
                {/* PROFILE */}

                <a href="#profile" className="jing-hero-index-item">
                  <span>00</span>

                  <div>
                    <p>PROFILE</p>
                    <strong>Get to know JingJing</strong>
                  </div>

                  <b>↙</b>
                </a>

                {/* CAREER */}

                <a href="#career" className="jing-hero-index-item">
                  <span>01</span>

                  <div>
                    <p>CAREER</p>
                    <strong>Her journey so far</strong>
                  </div>

                  <b>↙</b>
                </a>

                {/* WORKS */}

                <a href="#works" className="jing-hero-index-item">
                  <span>02</span>

                  <div>
                    <p>WORKS</p>
                    <strong>Characters & stories</strong>
                  </div>

                  <b>↙</b>
                </a>

                {/* MUSIC */}

                <a href="#music" className="jing-hero-index-item">
                  <span>03</span>

                  <div>
                    <p>MUSIC</p>
                    <strong>Songs & soundtracks</strong>
                  </div>

                  <b>↙</b>
                </a>

                {/* ACHIEVEMENTS */}

                <a href="#achievements" className="jing-hero-index-item">
                  <span>04</span>

                  <div>
                    <p>ACHIEVEMENTS</p>
                    <strong>Awards & recognition</strong>
                  </div>

                  <b>↙</b>
                </a>

                {/* GALLERY */}

                <a href="#gallery" className="jing-hero-index-item">
                  <span>05</span>

                  <div>
                    <p>GALLERY</p>
                    <strong>Through the lens</strong>
                  </div>

                  <b>↙</b>
                </a>

                {/* SCHEDULE */}

                <a href="#schedule" className="jing-hero-index-item">
                  <span>06</span>

                  <div>
                    <p>SCHEDULE</p>
                    <strong>Where to see her next</strong>
                  </div>

                  <b>↙</b>
                </a>
              </div>

              <p className="jing-hero-side-note">
                scroll through her pink world ♡
              </p>
            </div>

            {/* ==================================================
                CENTER — JINGJING PHOTO
            ================================================== */}

            <div className="jing-hero-photo">
              <span className="jing-hero-tape">♡</span>

              <img
                src="/images/jingjing/jingjing-hero1.jpg"
                alt="JingJing Prariyapit"
              />

              <div className="jing-photo-card">
                <span>JINGJING</span>

                <p>Prariyapit Yu</p>
              </div>
            </div>

            {/* ==================================================
                RIGHT — JINGJING INTRO
            ================================================== */}

            <div className="jing-hero-copy">
              <p className="jing-page-kicker">JINGJING / SOLO ARCHIVE</p>

              <h1>
                JingJing
                <br />
                <em>Prariyapit</em>
              </h1>

              <p className="jing-hero-description">
                An archive dedicated to JingJing — her acting, music,
                achievements, milestones, projects, appearances, and everything
                in between.
              </p>

              <div className="jing-hero-tags">
                <span>ACTRESS</span>

                <span>ARTIST</span>

                <span>GMMTV</span>
              </div>

              <span className="jing-hero-handwriting">
                welcome to her world ♡
              </span>
            </div>
          </div>
        </section>

        {/* ==================================================
    00 — PROFILE
================================================== */}

        <section id="profile" className="jing-section jing-profile-section">
          {/* ==================================================
      SECTION HEADING
  ================================================== */}

          <div className="jing-section-heading">
            <p>00 / PROFILE</p>

            <h2>
              Meet
              <br />
              <em>JingJing.</em>
            </h2>

            <span>a little closer ♡</span>
          </div>

          {/* ==================================================
      MIRRORED PROFILE

      JAN:
      PHOTO | INTRO | FACTS

      JINGJING:
      FACTS | INTRO | PHOTO
  ================================================== */}

          <div className="jing-profile-editorial">
            {/* ==================================================
        LEFT — PROFILE FACTS
    ================================================== */}

            <div className="jing-profile-facts">
              <div className="jing-profile-fact">
                <span>NAME</span>
                <p>Prariyapit Yu</p>
              </div>

              <div className="jing-profile-fact">
                <span>NICKNAME</span>
                <p>JingJing</p>
              </div>

              <div className="jing-profile-fact">
                <span>BIRTHDAY</span>
                <p>April 1, 1997</p>
              </div>

              <div className="jing-profile-fact">
                <span>ZODIAC</span>
                <p>Aries</p>
              </div>

              {/*<div className="jing-profile-fact">
                <span>AGENCY</span>
                <p>GMMTV</p>
              </div> */}

              <div className="jing-profile-fact">
                <span>KNOWN FOR</span>
                <p>Acting • Modeling • Performer</p>
              </div>
            </div>

            {/* ==================================================
        CENTER — INTRO
    ================================================== */}

            <div className="jing-profile-intro">
              <p className="jing-profile-eyebrow">GET TO KNOW HER</p>

              <h3>
                Prariyapit
                <span>Yu</span>
              </h3>

              <p className="jing-profile-thai">ปริยพิชญ์ ยู</p>

              <p className="jing-profile-bio">
                JingJing Prariyapit Yu is a Thai actress, model, and artist
                under GMMTV. Her journey spans fashion, acting, music, and
                performance, with each chapter revealing another side of her
                creative world.
              </p>

              <div className="jing-profile-tags">
                <span>ACTRESS</span>

                <span>MODEL</span>

                <span>DANCER</span>

                <span>GMMTV</span>
              </div>
            </div>

            {/* ==================================================
        RIGHT — PHOTO
    ================================================== */}

            <div className="jing-profile-photo">
              <img
                src="/images/jingjing/pic-48.jpg"
                alt="JingJing Prariyapit"
              />

              <span className="jing-profile-photo-label">JINGJING ♡</span>
            </div>
          </div>

          {/* ==================================================
      A LITTLE MORE ABOUT JINGJING
  ================================================== */}

          <div className="jing-favorites">
            {/* MIRRORED HEADING */}

            <div className="jing-favorites-heading">
              <h3>
                A Little More
                <em> About JingJing</em>
              </h3>

              <p>PERSONAL NOTES</p>
            </div>

            {/* ==================================================
        FAVORITES TABLE
        SAME COMPACT SIZE AS JAN
    ================================================== */}

            <div className="jing-favorites-table">
              <div className="jing-favorite-item">
                <span>FAVORITE FOOD</span>
                <p>Spicy Salad, Papaya Salad, Fried Oysters</p>
              </div>

              <div className="jing-favorite-item">
                <span>FAVORITE DRINK</span>
                <p>Ginger Tea, Matcha Green Tea, Warm Water</p>
              </div>

              <div className="jing-favorite-item">
                <span>FAVORITE COLOR</span>
                <p>Pink, Red, Black</p>
              </div>

              <div className="jing-favorite-item">
                <span>FAVORITE DESSERT</span>
                <p>—</p>
              </div>

              <div className="jing-favorite-item">
                <span>PETS</span>
                <p>Dogs</p>
              </div>

              <div className="jing-favorite-item">
                <span>HOBBIES</span>
                <p>Playing The Sims 4</p>
              </div>

              <div className="jing-favorite-item">
                <span>FAVORITE MOVIE</span>
                <p>—</p>
              </div>

              <div className="jing-favorite-item">
                <span>FAVORITE FLOWER</span>
                <p>Tulips</p>
              </div>

              <div className="jing-favorite-item">
                <span>FAVORITE ARTIST</span>
                <p>—</p>
              </div>

              <div className="jing-favorite-item">
                <span>SPORTS</span>
                <p>Dancing</p>
              </div>

              <div className="jing-favorite-item">
                <span>ZODIAC</span>
                <p>Aries</p>
              </div>

              <div className="jing-favorite-item">
                <span>MBTI</span>
                <p>ENFJ</p>
              </div>
            </div>

            {/* ==================================================
        SOCIALS — MIRRORED FROM JAN
    ================================================== */}

            <div className="jing-socials">
              <div className="jing-social-links">
                <a
                  href="https://www.instagram.com/jingjingyu36/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram ↗
                </a>

                <a
                  href="https://x.com/Jingjingyu364"
                  target="_blank"
                  rel="noreferrer"
                >
                  X ↗
                </a>

                <a
                  href="https://www.tiktok.com/@jingjingyuofficial"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok ↗
                </a>

                <a
                  href="https://weibo.com/u/4095292338"
                  target="_blank"
                  rel="noreferrer"
                >
                  Weibo ↗
                </a>
              </div>

              <span className="jing-socials-label">FIND JINGJING</span>
            </div>
          </div>
        </section>
        {/* ==================================================
    01 — CAREER JOURNEY
================================================== */}

        <section id="career" className="jing-section jing-career-section">
          <div className="jing-section-heading">
            <p>01 / CAREER</p>

            <h2>
              Career
              <br />
              <em>Journey.</em>
            </h2>

            <span>every chapter brought her somewhere new ♡</span>
          </div>

          <div className="jing-career-story">
            {/* 2012 */}

            <article className="jing-career-chapter">
              <span className="jing-career-big-year">2012</span>

              <span className="jing-career-number">01</span>

              <div className="jing-career-copy">
                <p className="jing-career-label">THE BEGINNING</p>

                <h3>Stepping Into Fashion</h3>

                <p className="jing-career-subtitle">Thai Supermodel</p>

                <p className="jing-career-description">
                  JingJing's journey began in fashion, opening the door to
                  modeling, editorials, campaigns, and opportunities that would
                  shape the early years of her career.
                </p>
              </div>
            </article>

            {/* 2017 */}

            <article className="jing-career-chapter">
              <span className="jing-career-big-year">2017</span>

              <span className="jing-career-number">02</span>

              <div className="jing-career-copy">
                <p className="jing-career-label">EXPANDING HER WORLD</p>

                <h3>Beyond Thailand</h3>

                <p className="jing-career-subtitle">
                  Fashion • International Work
                </p>

                <p className="jing-career-description">
                  Her modeling career continued to grow, allowing JingJing to
                  explore new creative spaces and work beyond the Thai fashion
                  scene.
                </p>
              </div>
            </article>

            {/* 2018 */}

            <article className="jing-career-chapter">
              <span className="jing-career-big-year">2018</span>

              <span className="jing-career-number">03</span>

              <div className="jing-career-copy">
                <p className="jing-career-label">A NEW SIDE</p>

                <h3>From Runway to Screen</h3>

                <p className="jing-career-subtitle">Acting</p>

                <p className="jing-career-description">
                  JingJing began exploring acting, adding another creative
                  direction to a career that had already been strongly rooted in
                  fashion and modeling.
                </p>
              </div>
            </article>

            {/* 2021 */}

            <article className="jing-career-chapter">
              <span className="jing-career-big-year">2021</span>

              <span className="jing-career-number">04</span>

              <div className="jing-career-copy">
                <p className="jing-career-label">ANOTHER STAGE</p>

                <h3>Exploring Performance</h3>

                <p className="jing-career-subtitle">
                  Music • Dance • Entertainment
                </p>

                <p className="jing-career-description">
                  Her career continued expanding across entertainment, bringing
                  together fashion, acting, music, dance, and performance.
                </p>
              </div>
            </article>

            {/* 2024–2025 */}

            <article className="jing-career-chapter">
              <span className="jing-career-big-year">2024–25</span>

              <span className="jing-career-number">05</span>

              <div className="jing-career-copy">
                <p className="jing-career-label">A NEW CHAPTER</p>

                <h3>Expanding Her Range</h3>

                <p className="jing-career-subtitle">Actress • Model • Artist</p>

                <p className="jing-career-description">
                  JingJing continued building her acting portfolio while
                  bringing her background in fashion and performance into a new
                  era of projects.
                </p>
              </div>
            </article>

            {/* 2026 */}

            <article
              className="
        jing-career-chapter
        jing-career-featured
      "
            >
              <span className="jing-career-big-year">2026</span>

              <span className="jing-career-number">06</span>

              <div className="jing-career-copy">
                <p className="jing-career-label">LEADING A NEW STORY</p>

                <h3>Enemies With Benefits</h3>

                <p className="jing-career-subtitle">Wine • JanJingJing</p>

                <p className="jing-career-description">
                  A new chapter brought JingJing into
                  <em> Enemies With Benefits</em> as Wine, alongside Jan
                  Ployshompoo as Lal, marking an important period for
                  JanJingJing.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ==================================================
    02 — WORKS / FILMOGRAPHY
================================================== */}

        <section id="works" className="jing-section jing-works-section">
          <div className="jing-section-heading">
            <p>02 / FILMOGRAPHY</p>

            <h2>
              Characters,
              <br />
              <em>stories & screens.</em>
            </h2>

            <span>the worlds she has stepped into ♡</span>
          </div>

          <div className="jing-works-carousel">
            <MediaCarousel items={jingjingWorks} cardsPerPage={3} />
          </div>
        </section>

        {/* ==================================================
    03 — MUSIC & OST
================================================== */}

        <section id="music" className="jing-section jing-music-section">
          <div className="jing-section-heading">
            <p>03 / MUSIC & OST</p>

            <h2>
              Songs from
              <br />
              <em>her world.</em>
            </h2>

            <span>melodies, performances & voices worth keeping ♡</span>
          </div>

          <div className="jing-music-carousel">
            <MediaCarousel items={jingMusicCarousel} cardsPerPage={3} />
          </div>
        </section>

        {/* ==================================================
    04 — ACHIEVEMENTS
================================================== */}

        <section
          id="achievements"
          className="jing-section jing-achievements-section"
        >
          <div className="jing-section-heading">
            <p>04 / ACHIEVEMENTS</p>

            <h2>
              Moments worth
              <br />
              <em>remembering.</em>
            </h2>

            <span>milestones along her journey ♡</span>
          </div>

          {/* ==================================================
      INTRO NOTE
  ================================================== */}

          <div className="jing-achievements-intro">
            <p>
              From the runway to the screen, these are some of the milestones
              and recognitions that have marked JingJing's journey so far.
            </p>
          </div>

          {/* ==================================================
      AWARD GRID
  ================================================== */}

          <div className="jing-achievements-grid">
            {jingjingAchievements.map((achievement) => (
              <article key={achievement.id} className="jing-award-card">
                {/* IMAGE */}

                <div className="jing-award-image">
                  <img src={achievement.image} alt={achievement.title} />

                  <span className="jing-award-image-year">
                    {achievement.year}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="jing-award-content">
                  <p className="jing-award-year">{achievement.year}</p>

                  <h3>{achievement.title}</h3>

                  <p className="jing-award-event">{achievement.event}</p>

                  {achievement.work && (
                    <p className="jing-award-work">{achievement.work}</p>
                  )}

                  <p className="jing-award-description">
                    {achievement.description}
                  </p>

                  {/* BOTTOM */}

                  <div className="jing-award-bottom">
                    <span className="jing-award-category">
                      {achievement.category}
                    </span>

                    <span
                      className={`
                jing-award-result
                jing-award-result-${achievement.result
                  .toLowerCase()
                  .replaceAll(" ", "-")}
              `}
                    >
                      {achievement.result}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ==================================================
      FOOTER
  ================================================== */}

          <div className="jing-achievements-footer">
            <span />

            <p>little wins, big memories ♡</p>

            <span />
          </div>
        </section>

        {/* ==================================================
    05 — GALLERY
================================================== */}

        <section id="gallery" className="jing-section jing-gallery-section">
          <div className="jing-section-heading">
            <p>05 / GALLERY</p>

            <h2>
              Through
              <br />
              <em>the lens.</em>
            </h2>

            <span>little pieces of her world ♡</span>
          </div>

          {/* ==================================================
      GALLERY PREVIEW
  ================================================== */}

          <div className="jing-gallery-preview">
            {/* PHOTO 01 */}

            <div className="jing-gallery-photo jing-gallery-photo-one">
              <span className="jing-gallery-tape">♡</span>

              <img
                src="/images/jingjing/editorial/pic-10.jpg"
                alt="JingJing gallery"
              />

              <span className="jing-gallery-note jing-gallery-note-one">
                a little moment ♡
              </span>
            </div>

            {/* PHOTO 02 — FEATURED */}

            <div className="jing-gallery-photo jing-gallery-photo-two">
              <span className="jing-gallery-tape">✦</span>

              <img
                src="/images/jingjing/editorial/pic-36.jpg"
                alt="JingJing gallery"
              />

              <span className="jing-gallery-heart">♡</span>
            </div>

            {/* PHOTO 03 */}

            <div className="jing-gallery-photo jing-gallery-photo-three">
              <span className="jing-gallery-tape">♡</span>

              <img
                src="/images/jingjing/editorial/pic-03.jpg"
                alt="JingJing gallery"
              />

              <span className="jing-gallery-note jing-gallery-note-three">
                keep this one ♡
              </span>
            </div>
          </div>

          {/* ==================================================
      VIEW FULL GALLERY
  ================================================== */}

          <a href="/gallery" className="jing-main-button">
            VIEW FULL GALLERY
            <span>↗</span>
          </a>
        </section>

        {/* ==================================================
    06 — SCHEDULE
================================================== */}

        <section id="schedule" className="jing-section jing-schedule-section">
          <div className="jing-section-heading">
            <p>06 / SCHEDULE</p>

            <h2>
              Where to see
              <br />
              <em>her next.</em>
            </h2>

            <span>save the date ♡</span>
          </div>

          {/* ==================================================
      NEXT EVENT
  ================================================== */}

          <div className="jing-schedule-content">
            <div className="jing-schedule-top">
              <div className="jing-schedule-copy">
                <p className="jing-schedule-label">NEXT ON HER CALENDAR</p>

                <h3>
                  Upcoming
                  <br />
                  <em>with JingJing.</em>
                </h3>

                <p className="jing-schedule-description">
                  Keep track of JingJing's upcoming appearances, events, fan
                  meetings, performances, promotions, and JanJingJing schedules.
                </p>
              </div>

              <div className="jing-schedule-note">
                <span>♡</span>

                <p>
                  maybe we'll
                  <br />
                  see her soon
                </p>
              </div>
            </div>

            {/* ==================================================
        EVENT CARD
    ================================================== */}

            <div className="jing-schedule-event">
              {nextJingEvent ? (
                <ScheduleCard event={nextJingEvent} />
              ) : (
                <div className="jing-schedule-empty">
                  <span>♡</span>

                  <h3>Nothing scheduled yet.</h3>

                  <p>
                    New JingJing schedules will appear here once they are added
                    to the archive.
                  </p>
                </div>
              )}
            </div>

            {/* ==================================================
        BOTTOM ACTION
    ================================================== */}

            <div className="jing-schedule-bottom">
              <p>
                {jingUpcomingEvents.length} upcoming
                {jingUpcomingEvents.length === 1 ? " event" : " events"}
              </p>

              <a href="/schedule" className="jing-main-button">
                VIEW FULL SCHEDULE
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default JingJing;
