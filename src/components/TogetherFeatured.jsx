import {
  useEffect,
  useState,
} from "react"

import YouTubeModal from "./YouTubeModal"

import {
  togetherFeatured,
} from "../data/togetherData"


const SLIDE_DURATION = 10000


function TogetherFeatured() {

  const [activeIndex, setActiveIndex] =
    useState(0)

  const [isPaused, setIsPaused] =
    useState(false)

  const [progressKey, setProgressKey] =
    useState(0)

  const [modalVideo, setModalVideo] =
    useState(null)


  /* ==================================================
     AUTO ADVANCE — 10 SECONDS
  ================================================== */

  useEffect(() => {

    if (
      isPaused ||
      modalVideo ||
      togetherFeatured.length <= 1
    ) {
      return
    }


    const timer =
      window.setTimeout(() => {

        setActiveIndex((current) =>
          (current + 1) %
          togetherFeatured.length
        )

        setProgressKey((key) =>
          key + 1
        )

      }, SLIDE_DURATION)


    return () =>
      window.clearTimeout(timer)

  }, [
    activeIndex,
    isPaused,
    modalVideo,
  ])


  /* ==================================================
     CHANGE SLIDE
  ================================================== */

  const goToSlide = (index) => {

    const total =
      togetherFeatured.length

    const nextIndex =
      (index + total) % total

    setActiveIndex(nextIndex)

    setProgressKey((key) =>
      key + 1
    )

  }


  const previousSlide = () => {

    goToSlide(
      activeIndex - 1
    )

  }


  const nextSlide = () => {

    goToSlide(
      activeIndex + 1
    )

  }


  /* ==================================================
     HOVER PAUSE
  ================================================== */

  const handleMouseEnter = () => {

    setIsPaused(true)

  }


  const handleMouseLeave = () => {

    setIsPaused(false)

    /*
      Timer restarts at a full 10 seconds
      after the visitor finishes interacting.
    */

    setProgressKey((key) =>
      key + 1
    )

  }


  const activeSlide =
    togetherFeatured[activeIndex]


  return (
    <>
      <section
        className="together-featured"
        aria-label="Featured JanJingJing highlights"
      >

        <div className="together-featured-shell">


          {/* =========================================
              SMALL HEADER
          ========================================= */}

          <div className="together-featured-header">

            <div>

              <span className="together-featured-dot" />

              <p>
                JAN × JINGJING / FEATURED
              </p>

            </div>


            <span className="together-featured-count">

              {String(
                activeIndex + 1
              ).padStart(2, "0")}

              <small>/</small>

              {String(
                togetherFeatured.length
              ).padStart(2, "0")}

            </span>

          </div>


          {/* =========================================
              FEATURE FRAME
          ========================================= */}

          <div
            className="together-featured-frame"
            onMouseEnter={
              handleMouseEnter
            }
            onMouseLeave={
              handleMouseLeave
            }
          >


            {/* =========================================
                HORIZONTAL TRACK
            ========================================= */}

            <div
              className="together-featured-track"
              style={{
                transform:
                  `translateX(-${activeIndex * 100}%)`,
              }}
            >

              {togetherFeatured.map(
                (slide, index) => {

                  const isActive =
                    index === activeIndex


                  return (

                    <article
                      key={slide.id}
                      className={`
                        together-featured-slide
                        together-featured-slide-${slide.accent}
                        ${isActive ? "is-active" : ""}
                      `}
                    >


                      {/* =================================
                          BACKGROUND
                      ================================= */}

                      <div className="together-featured-media">

                        <img
                          src={slide.image}
                          alt=""
                          className="together-featured-image"
                        />


                        {/* ACTIVE SLIDE VIDEO PREVIEW */}

                        {(
                          isActive &&
                          slide.previewYoutubeId &&
                          !modalVideo
                        ) && (

                          <iframe
                            key={
                              `${slide.id}-${activeIndex}`
                            }
                            className="together-featured-video"
                            src={
                              `https://www.youtube.com/embed/${slide.previewYoutubeId}` +
                              "?autoplay=1" +
                              "&mute=1" +
                              "&controls=0" +
                              "&rel=0" +
                              "&playsinline=1" +
                              "&modestbranding=1" +
                              "&loop=1" +
                              `&playlist=${slide.previewYoutubeId}`
                            }
                            title={
                              `${slide.title} preview`
                            }
                            allow="autoplay; encrypted-media"
                            tabIndex="-1"
                          />

                        )}


                        {/* DARK CINEMATIC OVERLAYS */}

                        <div className="together-featured-shade" />

                        <div className="together-featured-bottom-shade" />

                      </div>


                      {/* =================================
                          CONTENT
                      ================================= */}

                      <div className="together-featured-content">

                        <p className="together-featured-category">

                          <span />

                          {slide.category}

                        </p>


                        <p className="together-featured-eyebrow">
                          {slide.eyebrow}
                        </p>


                        <h1>

                          {slide.title}

                          <em>
                            {slide.subtitle}
                          </em>

                        </h1>


                        <p className="together-featured-meta">
                          {slide.meta}
                        </p>


                        <p className="together-featured-description">
                          {slide.description}
                        </p>


                        {/* =================================
                            ACTIONS
                        ================================= */}

                        <div className="together-featured-actions">

                          <a
                            href={slide.primaryLink}
                            target="_blank"
                            rel="noreferrer"
                            className="together-featured-primary"
                          >
                            {slide.primaryLabel}

                            <span>
                              ↗
                            </span>
                          </a>


                          {slide.youtubeId && (

                            <button
                              type="button"
                              className="together-featured-watch"
                              onClick={() =>
                                setModalVideo(slide)
                              }
                            >

                              <span className="together-featured-play">
                                ▶
                              </span>

                              WATCH

                            </button>

                          )}

                        </div>

                      </div>

                    </article>

                  )

                }
              )}

            </div>


            {/* =========================================
                ARROWS
            ========================================= */}

            <button
              type="button"
              className="
                together-featured-arrow
                together-featured-arrow-left
              "
              onClick={
                previousSlide
              }
              aria-label="Previous featured item"
            >
              ←
            </button>


            <button
              type="button"
              className="
                together-featured-arrow
                together-featured-arrow-right
              "
              onClick={
                nextSlide
              }
              aria-label="Next featured item"
            >
              →
            </button>


            {/* =========================================
                BOTTOM CONTROLS
            ========================================= */}

            <div className="together-featured-controls">

              <div className="together-featured-dots">

                {togetherFeatured.map(
                  (slide, index) => (

                    <button
                      key={slide.id}
                      type="button"
                      className={`
                        together-featured-nav-dot
                        ${
                          index === activeIndex
                            ? "active"
                            : ""
                        }
                      `}
                      onClick={() =>
                        goToSlide(index)
                      }
                      aria-label={
                        `Show ${slide.title} ${slide.subtitle}`
                      }
                    />

                  )
                )}

              </div>


              <p>
                AUTO / 10 SEC
              </p>

            </div>


            {/* =========================================
                10 SECOND PROGRESS BAR
            ========================================= */}

            <div className="together-featured-progress">

              <span
                key={
                  `${activeIndex}-${progressKey}`
                }
                className={
                  isPaused
                    ? "is-paused"
                    : ""
                }
              />

            </div>

          </div>


          {/* =========================================
              NEXT SECTION INDICATOR
          ========================================= */}

          <a
            href="#story"
            className="together-featured-explore"
          >
            <span>
              EXPLORE JANJINGJING
            </span>

            <b>
              ↓
            </b>
          </a>

        </div>

      </section>


      {/* =============================================
          VIDEO MODAL
      ============================================= */}

      {modalVideo && (

        <YouTubeModal
          videoId={
            modalVideo.youtubeId
          }
          title={
            `${modalVideo.title} ${modalVideo.subtitle}`
          }
          onClose={() =>
            setModalVideo(null)
          }
        />

      )}

    </>
  )
}


export default TogetherFeatured