import {
  useState,
} from "react"


function TogetherMediaCard({
  item,
  onOpen,
}) {

  const [isHovered, setIsHovered] =
    useState(false)


  const thumbnail =
    `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`


  /* ==================================================
     KEYBOARD OPEN
  ================================================== */

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault()

      onOpen(item)

    }

  }


  return (

    <article
      className="together-media-card"

      role="button"

      tabIndex={0}

      onMouseEnter={() =>
        setIsHovered(true)
      }

      onMouseLeave={() =>
        setIsHovered(false)
      }

      onClick={() =>
        onOpen(item)
      }

      onKeyDown={
        handleKeyDown
      }
    >

      {/* ==================================================
          VIDEO / THUMBNAIL
      ================================================== */}

      <div className="together-media-card-preview">

        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
        />


        {/* ONLY LOAD YOUTUBE WHEN HOVERED */}

        {isHovered && item.youtubeId && (

          <iframe
            className="together-media-card-video"
            src={
              `https://www.youtube.com/embed/${item.youtubeId}` +
              "?autoplay=1" +
              "&mute=1" +
              "&controls=0" +
              "&rel=0" +
              "&playsinline=1" +
              "&modestbranding=1" +
              "&loop=1" +
              `&playlist=${item.youtubeId}`
            }
            title={`${item.title} preview`}
            allow="autoplay; encrypted-media"
            tabIndex="-1"
          />

        )}


        {/* CATEGORY */}

        <span
          className={`
            together-media-card-type
            together-media-card-type-${item.category}
          `}
        >
          {item.category === "bts"
            ? "BTS"
            : item.category.toUpperCase()}
        </span>


        {/* PLAY ICON */}

        {!isHovered && (

          <span className="together-media-card-play">
            ▶
          </span>

        )}

      </div>


      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="together-media-card-content">

        <h3>
          {item.title}
        </h3>


        <div className="together-media-card-meta">

          <span>
            {item.date}
          </span>

          <span>
            {item.source}
          </span>

        </div>

      </div>

    </article>

  )

}


export default TogetherMediaCard