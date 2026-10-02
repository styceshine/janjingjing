import Navbar from "../components/Navbar";
import MediaCard from "../components/MediaCard";
import MediaCarousel from "../components/MediaCarousel";
import ScheduleCard from "../components/ScheduleCard";
import Jewel from "../components/Jewel";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import {
  janProfile,
  janWorks,
  janMusic,
  janAchievements,
} from "../data/janData";

import { useEffect, useMemo, useState } from "react";

import { supabase } from "../lib/supabase";

import {
  scheduleEvents,
  getUpcomingEvents,
  getEffectiveScheduleStatus,
  mapSupabaseScheduleEvent,
  mergeScheduleEvents,
} from "../data/scheduleData";

function Jan() {
  /* ==================================================
     SPLIT JAN'S WORKS INTO TWO CAROUSEL ROWS

     Example:

     Row 1:
     Works 1-3
     Works 7-9
     Works 13-15

     Row 2:
     Works 4-6
     Works 10-12
     Works 16-18
  ================================================== */

  const janWorksRowOne = [];
  const janWorksRowTwo = [];

  janWorks.forEach((work, index) => {
    const groupIndex = Math.floor(index / 3);

    if (groupIndex % 2 === 0) {
      janWorksRowOne.push(work);
    } else {
      janWorksRowTwo.push(work);
    }
  });

  /* ==================================================
   LIVE JAN SCHEDULE
   Local schedule + Supabase schedule
================================================== */

  const [databaseScheduleEvents, setDatabaseScheduleEvents] = useState([]);

  /* ==================================================
   FETCH PUBLISHED EVENTS FROM SUPABASE
================================================== */

  useEffect(() => {
    let active = true;

    const loadSchedule = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("is_published", true)
          .order("start_at", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        const mappedEvents = (data || []).map((row) => {
          let posterUrl = "";

          if (row.image_path) {
            const { data: posterData } = supabase.storage
              .from("schedule")
              .getPublicUrl(row.image_path);

            posterUrl = posterData?.publicUrl || "";
          }

          return mapSupabaseScheduleEvent(row, posterUrl);
        });

        if (active) {
          setDatabaseScheduleEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Unable to load Jan schedule:", error);
      }
    };

    loadSchedule();

    return () => {
      active = false;
    };
  }, []);

  /* ==================================================
   MERGE LOCAL + DATABASE EVENTS
================================================== */

  const mergedScheduleEvents = useMemo(
    () => mergeScheduleEvents(scheduleEvents, databaseScheduleEvents),
    [databaseScheduleEvents],
  );

  /* ==================================================
   FIND JAN'S NEXT ACTIVE EVENT
================================================== */

  const nextJanEvent = useMemo(() => {
    const upcoming = getUpcomingEvents(mergedScheduleEvents);

    return (
      upcoming.find((event) => {
        const people = event.people || event.artists || [];

        const status = getEffectiveScheduleStatus(event);

        return (
          people.includes("jan") &&
          status !== "cancelled" &&
          status !== "postponed"
        );
      }) || null
    );
  }, [mergedScheduleEvents]);

  return (
    <>
      <Navbar />

      <main className="jan-page">
        {/* ==================================================
            JAN HERO
        ================================================== */}
        <section className="jan-hero">
          <div className="jan-hero-bg-text">JAN</div>

          <div className="jan-hero-grid">
            {/* =========================================
                LEFT
            ========================================= */}
            <div className="jan-hero-copy">
              <p className="jan-page-kicker">JAN / SOLO ARCHIVE</p>

              <h1>
                Jan
                <br />
                <em>Ployshompoo</em>
              </h1>

              <p className="jan-hero-description">
                An archive dedicated to Jan — her acting, music, achievements,
                milestones, projects, appearances, and everything in between.
              </p>

              <div className="jan-hero-tags">
                <span>
                  <a
                    href="https://www.instagram.com/janhae/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    INSTAGRAM ↗
                  </a>
                </span>

                <span>
                  <a
                    href="https://x.com/janhae"
                    target="_blank"
                    rel="noreferrer"
                  >
                    X ↗
                  </a>
                </span>

                <span>
                  <a
                    href="https://www.tiktok.com/@janhae"
                    target="_blank"
                    rel="noreferrer"
                  >
                    TIKTOK ↗
                  </a>
                </span>

                <span>
                  <a
                    href="https://weibo.com/u/4020580354"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WEIBO ↗
                  </a>
                </span>
              </div>

              <span className="jan-hero-handwriting">
                welcome to her purple world ♡
              </span>
            </div>

            {/* =========================================
                CENTER PHOTO
            ========================================= */}
            <div className="jan-hero-photo">
              {/* JEWEL */}
              <Jewel
                pose="peek"
                size="medium"
                className="jewel-jan-photo"
                message="hi ♡"
              />

              <span className="jan-hero-tape">✦</span>

              <img src={janProfile.image} alt={janProfile.nickname} />

              <div className="jan-photo-card">
                <span>{janProfile.nickname.toUpperCase()}</span>

                <p>{janProfile.name}</p>
              </div>
            </div>

            {/* =========================================
                RIGHT INFO
            ========================================= */}
            <div className="jan-hero-side">
              <p className="jan-hero-side-label">EXPLORE JAN</p>

              <div className="jan-hero-index">
                <a href="#profile" className="jan-hero-index-item">
                  <span>00</span>
                  <div>
                    <p>PROFILE</p>
                    <strong>Get to know Jan</strong>
                  </div>
                  <b>↘</b>
                </a>

                <a href="#career" className="jan-hero-index-item">
                  <span>01</span>
                  <div>
                    <p>CAREER</p>
                    <strong>Her journey so far</strong>
                  </div>
                  <b>↘</b>
                </a>

                <a href="#works" className="jan-hero-index-item">
                  <span>02</span>
                  <div>
                    <p>WORKS</p>
                    <strong>Characters & stories</strong>
                  </div>
                  <b>↘</b>
                </a>

                <a href="#music" className="jan-hero-index-item">
                  <span>03</span>
                  <div>
                    <p>MUSIC</p>
                    <strong>Songs & soundtracks</strong>
                  </div>
                  <b>↘</b>
                </a>

                <a href="#achievements" className="jan-hero-index-item">
                  <span>04</span>
                  <div>
                    <p>ACHIEVEMENTS</p>
                    <strong>Awards & recognition</strong>
                  </div>
                  <b>↘</b>
                </a>

                <a href="#gallery" className="jan-hero-index-item">
                  <span>05</span>
                  <div>
                    <p>GALLERY</p>
                    <strong>Through the lens</strong>
                  </div>
                  <b>↘</b>
                </a>

                <a href="#schedule" className="jan-hero-index-item">
                  <span>06</span>
                  <div>
                    <p>SCHEDULE</p>
                    <strong>Where to see her next</strong>
                  </div>
                  <b>↘</b>
                </a>
              </div>

              <p className="jan-hero-side-note">
                scroll through her purple world ♡
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            QUICK NAV
        ================================================== */}
        <section className="jan-quick-nav">
          <a href="#profile">
            <span>00</span>
            Profile
          </a>

          <a href="#career">
            <span>01</span>
            Career
          </a>

          <a href="#works">
            <span>02</span>
            Works
          </a>

          <a href="#music">
            <span>03</span>
            Music
          </a>

          <a href="#achievements">
            <span>04</span>
            Achievements
          </a>

          <a href="#gallery">
            <span>05</span>
            Gallery
          </a>

          <a href="#schedule">
            <span>06</span>
            Schedule
          </a>
        </section>

        {/* ==================================================
    00 / PROFILE
================================================== */}

        <section id="profile" className="jan-section jan-profile-section">
          <div className="jan-section-heading">
            <p>00 / PROFILE</p>

            <h2>
              Meet
              <br />
              <em>Jan.</em>
            </h2>

            <span>actress • singer • performer ♡</span>
          </div>

          {/* ==================================================
      PROFILE EDITORIAL
  ================================================== */}

          <div className="jan-profile-editorial">
            {/* PHOTO */}
            <div className="jan-profile-photo">
              <img src="/images/jan/solo2.jpg" alt="Jan Ployshompoo" />

              <span className="jan-profile-photo-label">JAN ♡</span>
            </div>

            {/* MAIN INTRO */}
            <div className="jan-profile-intro">
              <p className="jan-profile-eyebrow">PLOYSHOMPOO SUPASAP</p>

              <h3>
                Jan
                <span> Ployshompoo</span>
              </h3>

              <p className="jan-profile-thai">พลอยชมพู ศุภทรัพย์</p>

              <p className="jan-profile-bio">
                Thai actress, singer, and performer under GMMTV. From acting on
                screen to performing with SIZZY, Jan has built a career across
                television, music, fashion, and live performance.
              </p>

              {/* TAGS */}
              <div className="jan-profile-tags">
                <span>ACTRESS</span>
                <span>SINGER</span>
                <span>PERFORMER</span>
                <span>GMMTV</span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="jan-profile-facts">
              <div className="jan-profile-fact">
                <span>NAME</span>
                <p>Ployshompoo Supasap</p>
              </div>

              {/*
      <div className="jan-profile-fact">
        <span>THAI NAME</span>
        <p>พลอยชมพู ศุภทรัพย์</p>
      </div>
      */}

              <div className="jan-profile-fact">
                <span>NICKNAME</span>
                <p>Jan</p>
              </div>

              <div className="jan-profile-fact">
                <span>BIRTHDAY</span>
                <p>January 5, 1995</p>
              </div>

              <div className="jan-profile-fact">
                <span>ZODIAC</span>
                <p>Capricorn</p>
              </div>

              <div className="jan-profile-fact">
                <span>KNOWN FOR</span>
                <p>Acting • Music • SIZZY</p>
              </div>
            </div>
          </div>

          {/* ==================================================
      A LITTLE MORE ABOUT JAN
  ================================================== */}

          <div className="jan-favorites">
            <div className="jan-favorites-heading">
              <p>GET TO KNOW HER</p>

              <h3>
                A little more
                <em> about Jan ♡</em>
              </h3>
            </div>

            {/* ==================================================
        FAVORITES TABLE
    ================================================== */}

            <div className="jan-favorites-table">
              <div className="jan-favorite-item">
                <span>FAVORITE FOOD</span>
                <p>Shabu-shabu • Grilled food</p>
              </div>

              <div className="jan-favorite-item">
                <span>FAVORITE DRINK</span>
                <p>—</p>
              </div>

              <div className="jan-favorite-item">
                <span>FAVORITE FASHION STYLE</span>
                <p>Chill and Cool</p>
              </div>

              <div className="jan-favorite-item">
                <span>FAVORITE COLOR</span>
                <p>Purple</p>
              </div>

              <div className="jan-favorite-item">
                <span>HOBBIES</span>
                <p>Painting • Workshops • Handcrafts</p>
              </div>

              <div className="jan-favorite-item">
                <span>PETS</span>
                <p>Dogs</p>
              </div>

              <div className="jan-favorite-item">
                <span>FAVORITE MOVIE</span>
                <p>—</p>
              </div>

              <div className="jan-favorite-item">
                <span>SPORT</span>
                <p>—</p>
              </div>

              <div className="jan-favorite-item">
                <span>FAVORITE ARTIST</span>
                <p>Karina Yu</p>
              </div>

              <div className="jan-favorite-item">
                <span>MBTI</span>
                <p>ENFP</p>
              </div>
            </div>

            {/* ==================================================
        SOCIALS
    ================================================== */}

            <div className="jan-socials">
              <span className="jan-socials-label">FIND JAN ONLINE</span>

              <div className="jan-social-links">
                <a
                  href="https://www.instagram.com/janhae/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram ↗
                </a>

                <a href="https://x.com/janhae" target="_blank" rel="noreferrer">
                  X ↗
                </a>

                <a
                  href="https://www.tiktok.com/@janhae?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok ↗
                </a>

                <a
                  href="https://weibo.com/u/4020580354"
                  target="_blank"
                  rel="noreferrer"
                >
                  Weibo ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
    CAREER JOURNEY
================================================== */}
        <section id="career" className="jan-section jan-career-section">
          <div className="jan-section-heading">
            <p>01 / CAREER JOURNEY</p>

            <h2>
              Her journey,
              <br />
              <em>so far.</em>
            </h2>

            <span>every chapter has a story ♡</span>
          </div>

          <div className="jan-career-story">
            {/* =========================================
        CHAPTER 01
    ========================================= */}
            <article className="jan-career-chapter jan-career-left">
              <span className="jan-career-big-year">2016</span>

              <span className="jan-career-number">01</span>

              <div className="jan-career-copy">
                <p className="jan-career-label">THE BEGINNING</p>

                <h3>Her acting journey begins</h3>

                <p className="jan-career-description">
                  Following her advertising debut in 2014, Jan stepped into
                  television with early appearances in
                  <em> Senior Secret Love</em>, <em>U-Prince</em>, and
                  <em> SOTUS</em>. These roles laid the foundation for her
                  career as a GMMTV actress.
                </p>

                <a
                  href="https://en.wikipedia.org/wiki/Ployshompoo_Supasap"
                  target="_blank"
                  rel="noreferrer"
                  className="jan-career-source"
                >
                  SOURCE ↗
                </a>
              </div>
            </article>

            {/* =========================================
        CHAPTER 02
    ========================================= */}
            <article className="jan-career-chapter jan-career-right">
              <span className="jan-career-big-year">2019</span>

              <span className="jan-career-number">02</span>

              <div className="jan-career-copy">
                <p className="jan-career-label">A NEW SIDE</p>

                <h3>SIZZY</h3>

                <p className="jan-career-subtitle">From screen to stage</p>

                <p className="jan-career-description">
                  Jan began her idol career alongside Jane, Ciize, and Aye in
                  the group originally introduced as SISSY, later renamed SIZZY.
                  Their debut single,
                  <em> “Loading Love”</em>, introduced audiences to her singing
                  and dancing alongside her acting.
                </p>

                <a
                  href="https://en.wikipedia.org/wiki/Sizzy"
                  target="_blank"
                  rel="noreferrer"
                  className="jan-career-source"
                >
                  SOURCE ↗
                </a>
              </div>
            </article>

            {/* =========================================
        CHAPTER 03
    ========================================= */}
            <article className="jan-career-chapter jan-career-left">
              <span className="jan-career-big-year">2020</span>

              <span className="jan-career-number">03</span>

              <div className="jan-career-copy">
                <p className="jan-career-label">EARNING RECOGNITION</p>

                <h3>
                  A darker role,
                  <br />a defining moment
                </h3>

                <p className="jan-career-description">
                  Playing Tida in <em>Who Are You</em> gave Jan an opportunity
                  to explore a demanding antagonist role. Her performance earned
                  the Zoom Dara award for Best Actress in a Villain Role,
                  marking an important moment of recognition in her acting
                  career.
                </p>

                <a
                  href="https://en.wikipedia.org/wiki/Who_Are_You_(Thai_TV_series)"
                  target="_blank"
                  rel="noreferrer"
                  className="jan-career-source"
                >
                  SOURCE ↗
                </a>
              </div>
            </article>

            {/* =========================================
        CHAPTER 04
    ========================================= */}
            <article className="jan-career-chapter jan-career-right">
              <span className="jan-career-big-year">2021–24</span>

              <span className="jan-career-number">04</span>

              <div className="jan-career-copy">
                <p className="jan-career-label">EXPANDING HER RANGE</p>

                <h3>Actress • Singer • Model</h3>

                <p className="jan-career-description">
                  Jan continued exploring romance, comedy, and emotionally
                  demanding drama while performing with SIZZY. Her career also
                  expanded into fashion, including an H&amp;M Thailand
                  ambassadorship in 2024. Across screen, stage, and campaigns,
                  she developed a broader identity as an entertainer.
                </p>

                <a
                  href="https://en.wikipedia.org/wiki/Ployshompoo_Supasap"
                  target="_blank"
                  rel="noreferrer"
                  className="jan-career-source"
                >
                  SOURCE ↗
                </a>
              </div>
            </article>

            {/* =========================================
        CHAPTER 05
    ========================================= */}
            <article className="jan-career-chapter jan-career-left">
              <span className="jan-career-big-year">2025</span>

              <span className="jan-career-number">05</span>

              <div className="jan-career-copy">
                <p className="jan-career-label">A NEW CHAPTER</p>

                <h3>
                  The beginning of
                  <br />
                  JanJingJing
                </h3>

                <p className="jan-career-description">
                  After sharing the screen in <em>Hide &amp; Sis</em>, Jan and
                  JingJing explored a romantic storyline together in{" "}
                  <em>MuTeLuv: Hello, Is This Luck?</em>. Their collaboration
                  introduced a new direction for Jan’s career and laid the
                  groundwork for their growing on-screen partnership.
                </p>

                <a
                  href="https://www.broadwayworld.com/bwwtv/article/Interview-Jan-Ployshompoo-Supasap-JingJing-Yu-Reflect-on-ENEMIES-WITH-BENEFITS-20260627"
                  target="_blank"
                  rel="noreferrer"
                  className="jan-career-source"
                >
                  SOURCE ↗
                </a>
              </div>
            </article>

            {/* =========================================
        CHAPTER 06
    ========================================= */}
            <article className="jan-career-chapter jan-career-right jan-career-featured">
              <span className="jan-career-big-year">2026</span>

              <span className="jan-career-number">06</span>

              <div className="jan-career-copy">
                <p className="jan-career-label">LEADING A NEW STORY</p>

                <h3>Enemies With Benefits</h3>

                <p className="jan-career-subtitle">JanJingJing</p>

                <p className="jan-career-description">
                  As Lal in <em>Enemies With Benefits</em>, Jan took a central
                  role in a full-length GL series opposite JingJing. Their
                  partnership extended into soundtrack recordings and live
                  performances, bringing together the acting, singing, and stage
                  experience she had developed throughout her career.
                </p>

                <a
                  href="https://www.broadwayworld.com/bwwtv/article/Interview-Jan-Ployshompoo-Supasap-JingJing-Yu-Reflect-on-ENEMIES-WITH-BENEFITS-20260627"
                  target="_blank"
                  rel="noreferrer"
                  className="jan-career-source"
                >
                  SOURCE ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* ==================================================
            WORKS
        ================================================== */}
        <section
          id="works"
          className="
            jan-section
            jan-works-section
          "
        >
          <div className="jan-section-heading">
            <p>02 / FILMOGRAPHY</p>

            <h2>
              Characters,
              <br />
              <em>stories & screens.</em>
            </h2>

            <span>the worlds she has stepped into</span>
          </div>

          {/* =========================================
              TWO-ROW NETFLIX STYLE CAROUSEL
          ========================================= */}
          <div className="jan-works-carousels">
            {/* =====================================
                ROW ONE

                Initially:
                EWB
                MuTeLuv
                HIDE & SIS
            ===================================== */}
            {janWorksRowOne.length > 0 && (
              <MediaCarousel items={janWorksRowOne} cardsPerPage={3} />
            )}

            {/* =====================================
                ROW TWO

                Initially:
                Works 4
                Works 5
                Works 6
            ===================================== */}
            {janWorksRowTwo.length > 0 && (
              <MediaCarousel items={janWorksRowTwo} cardsPerPage={3} />
            )}
          </div>
        </section>

        {/* ==================================================
            MUSIC
        ================================================== */}
        <section
          id="music"
          className="
            jan-section
            jan-music-section
          "
        >
          <div className="jan-section-heading">
            <p>03 / MUSIC & OST</p>

            <h2>
              Songs from
              <br />
              <em>her world.</em>
            </h2>

            <span>soundtracks, songs, and voices worth keeping ♡</span>
          </div>

          <div className="jan-music-grid">
            {janMusic.map((song) => (
              <MediaCard
                key={song.id}
                title={song.title}
                year={song.year}
                type={song.type}
                role={`${song.artist} • ${song.project}`}
                image={song.image}
                youtubeId={song.youtubeId}
                description={song.description}
              />
            ))}
          </div>
        </section>

        {/* ==================================================
            04 / ACHIEVEMENTS
        ================================================== */}
        <section
          id="achievements"
          className="jan-section jan-achievements-section"
        >
          {/* HEADING */}
          <div className="jan-section-heading">
            <p>04 / ACHIEVEMENTS</p>

            <h2>
              Awards &
              <br />
              <em>Recognition.</em>
            </h2>

            <span>moments that matter ♡</span>
          </div>

          {/* INTRO */}
          <div className="jan-achievements-intro">
            <p>
              From acting recognition to milestones throughout her career, each
              achievement marks another chapter in Jan's journey.
            </p>
          </div>

          {/* AWARD CARDS */}
          <div className="jan-achievements-grid">
            {janAchievements.map((achievement) => (
              <article key={achievement.id} className="jan-award-card">
                {/* PHOTO */}
                <div className="jan-award-image">
                  <img
                    src={achievement.image}
                    alt={`${achievement.title} — ${achievement.event}`}
                  />

                  <span className="jan-award-image-year">
                    {achievement.year}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="jan-award-content">
                  {/* YEAR */}
                  <p className="jan-award-year">{achievement.year}</p>

                  {/* AWARD TITLE */}
                  <h3>{achievement.title}</h3>

                  {/* EVENT */}
                  <p className="jan-award-event">{achievement.event}</p>

                  {/* WORK */}
                  {achievement.work && (
                    <p className="jan-award-work">{achievement.work}</p>
                  )}

                  {/* DESCRIPTION */}
                  {achievement.description && (
                    <p className="jan-award-description">
                      {achievement.description}
                    </p>
                  )}

                  {/* BOTTOM */}
                  <div className="jan-award-bottom">
                    <span className="jan-award-category">
                      {achievement.category}
                    </span>

                    <span
                      className={`
                jan-award-result
                jan-award-result-${achievement.result
                  .toLowerCase()
                  .replace(/\s+/g, "-")}
              `}
                    >
                      {achievement.result}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* FOOTER */}
          <div className="jan-achievements-footer">
            <span />

            <p>proud of you, Jan ♡</p>

            <span />
          </div>
        </section>

        {/* ==================================================
            GALLERY
        ================================================== */}
        <section
          id="gallery"
          className="
            jan-section
            jan-gallery-section
          "
        >
          <div className="jan-section-heading">
            <p>05 / PHOTO ARCHIVE</p>

            <h2>
              Through
              <br />
              <em>the lens.</em>
            </h2>

            <span>just Jan being Jan 💜</span>
          </div>

          <div className="jan-gallery-preview">
            {/* PHOTO 1 */}
            <div
              className="
                jan-gallery-photo
                jan-gallery-photo-one
              "
            >
              <img src="/images/jan/editorial/model-07.jpg" alt="Jan" />
            </div>

            {/* PHOTO 2 */}
            <div
              className="
                jan-gallery-photo
                jan-gallery-photo-two
              "
            >
              <img src="/images/jan/editorial/model-06.jpg" alt="Jan" />
            </div>

            {/* PHOTO 3 */}
            <div
              className="
                jan-gallery-photo
                jan-gallery-photo-three
              "
            >
              <img src="/images/jan/editorial/model-03.jpg" alt="Jan" />
            </div>
          </div>

          <Link to="/gallery?filter=jan" className="jan-main-button">
            Open Jan's Gallery
            <span>→</span>
          </Link>
        </section>

        {/* ==================================================
            SCHEDULE
        ================================================== */}
        <section id="schedule" className="jan-section jan-schedule-section">
          <div className="jan-section-heading">
            <p>06 / SCHEDULE</p>

            <h2>
              Where to see
              <br />
              <em>Jan next.</em>
            </h2>

            <span>upcoming appearances & events ♡</span>
          </div>

          <div className="jan-dashboard-schedule">
            {nextJanEvent ? (
              <ScheduleCard event={nextJanEvent} />
            ) : (
              <p className="schedule-empty">No upcoming Jan schedule yet ♡</p>
            )}
          </div>

          <Link to="/schedule" className="jan-main-button">
            View Full Schedule
            <span>→</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Jan;
