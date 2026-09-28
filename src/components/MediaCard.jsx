import {
  useState,
} from "react"

import YouTubeModal from "./YouTubeModal"


function MediaCard({
  title,
  year,
  type,
  role,
  image,
  youtubeId,
  description,
}) {

  const [
    isHovered,
    setIsHovered,
  ] =
    useState(false)


  const [
    isModalOpen,
    setIsModalOpen,
  ] =
    useState(false)


  const hasVideo =
    Boolean(
      youtubeId
    )


  /* ==================================================
     OPEN VIDEO
  ================================================== */

  const openVideo =
    () => {

      if (
        !hasVideo
      ) {
        return
      }


      setIsModalOpen(
        true
      )

    }


  return (

    <>

      <article
        className={[
          "media-card",

          hasVideo
            ? "media-card-clickable"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}

        onMouseEnter={() => {

          if (
            hasVideo
          ) {

            setIsHovered(
              true
            )

          }

        }}

        onMouseLeave={() => {

          setIsHovered(
            false
          )

        }}
      >

        {/* ==================================================
            IMAGE / VIDEO PREVIEW
        ================================================== */}

        <div
          className="media-card-preview"

          onClick={
            openVideo
          }
        >

          <img
            src={image}
            alt={title}
            className="media-card-image"

            loading="lazy"
            decoding="async"
          />


          {/* ==================================================
              YOUTUBE HOVER PREVIEW

              Only created while hovered,
              so YouTube does not load for every card.
          ================================================== */}

          {hasVideo &&
            isHovered && (

              <iframe
                className="media-card-youtube-preview"

                src={
                  `https://www.youtube.com/embed/${youtubeId}` +
                  `?autoplay=1` +
                  `&mute=1` +
                  `&controls=0` +
                  `&rel=0` +
                  `&playsinline=1` +
                  `&loop=1` +
                  `&playlist=${youtubeId}`
                }

                title={`${title} preview`}

                loading="lazy"

                allow="autoplay; encrypted-media; picture-in-picture"

                referrerPolicy="strict-origin-when-cross-origin"

                allowFullScreen={false}
              />

            )}


          {/* ==================================================
              OVERLAY
          ================================================== */}

          <div className="media-card-overlay">

            {type && (

              <span className="media-card-type">
                {type}
              </span>

            )}


            {hasVideo &&
              !isHovered && (

                <span
                  className="media-play-button"
                  aria-hidden="true"
                >
                  ▶
                </span>

              )}

          </div>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="media-card-content">

          {year && (

            <div className="media-card-meta">

              <span>
                {year}
              </span>

            </div>

          )}


          <h3>
            {title}
          </h3>


          {role && (

            <p className="media-card-role">
              {role}
            </p>

          )}


          {description && (

            <p className="media-card-description">
              {description}
            </p>

          )}


          {hasVideo && (

            <button
              type="button"
              className="media-watch-button"
              onClick={
                openVideo
              }
            >

              WATCH VIDEO

              <span>
                ↗
              </span>

            </button>

          )}

        </div>

      </article>


      {/* ==================================================
          YOUTUBE MODAL

          Not mounted until visitor actually opens it.
      ================================================== */}

      {isModalOpen &&
        hasVideo && (

          <YouTubeModal
            videoId={
              youtubeId
            }

            title={
              title
            }

            onClose={() =>
              setIsModalOpen(
                false
              )
            }
          />

        )}

    </>

  )

}


export default MediaCard